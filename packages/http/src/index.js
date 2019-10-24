import { type, parseTextPlaceholder } from '@totebox/util';
import Query from '@totebox/query';

function hasData(obj) {
  return type(obj) === 'object' && Object.keys(obj).length > 0;
}

// interceptors.response: (json) => Object|Promise
// interceptors.error: (Error, url, statusText) => Error
function http(url, options, interceptors = {}) {
  const tasks = [];
  const { timeout } = options;

  if (timeout) {
    const timeoutTask = new Promise((resolve, reject) => {
      setTimeout(() => {
        const error = new Error('Request timeout');
        error.statusText = 'timeout';
        reject(error);
      }, timeout);
    });

    delete options.timeout;
    tasks.push(timeoutTask);
  }

  const requestTask = fetch(url, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(res.statusText);
      }

      return res.json();
    })
    .then((json) => {
      if (type(interceptors.response) === 'function') {
        return interceptors.response(json);
      }
      return json;
    });

  let abort;

  const abortTask = new Promise((resolve, reject) => {
    abort = () => {
      const error = new Error('Request abort');
      error.statusText = 'abort';
      reject(error);
    };
  });

  tasks.push(requestTask, abortTask);

  const ret = Promise.race(tasks).catch((err) => {
    err.url = url;

    if (type(interceptors.error) === 'function') {
      return Promise.reject(interceptors.error(err));
    }

    err.message = `Request url "${url}" failed, error: ${err.message}${err.statusText ? `, error status: ${err.statusText}` : ''}`;
    throw err;
  });

  ret.abort = abort;

  return ret;
}

// Example:
// const request = http.create({
//   timeout: 5000,
//   interceptors: {
//     response(data) {
//       if (data.status === 0) {
//         return data.data;
//       }
//       return Promise.reject(json.message);
//     },
//     error(err) {
//       const { url, message, statusText } = err;
//       return `Request url "${url}" failed, error: ${message}${statusText ? `, error status: ${statusText}` : ''}`;
//     },
//   }
// });
//
// 返回 request.[get|post|put|patch|delete](url, data, options)
//
// 取消请求:
// const req = request.get(...);
// req.abort();
http.create = (settings) => {
  const { interceptors, ...config } = settings;

  return 'get post put patch delete'
    .split(' ')
    .reduce((req, method) => {

      // url 支持 RUSTful API 的 "{}" 占位替换, 并会移除 data 中匹配的数据
      // 比如: request.post('/user/{id}', { id: '123', avatar: 'xx.png' }) => url: '/user/123', data: { avatar: 'xx.png' }
      req[method] = (url, data, options) => {
        url = parseTextPlaceholder(url, data, true);

        options = {
          ...config,
          ...options,
          method: method.toUpperCase(),
        };

        const methodsWithBody = ['post', 'put', 'patch'];

        if (hasData(data)) {
          if (methodsWithBody.includes(method)) {
            options.body = JSON.stringify(data);
          } else {
            url = Query(url).add(data).href();
          }
        }

        return http(url, options, interceptors);
      };

      return req;
    }, {});
};

export default http;
