/* eslint-disable import/no-extraneous-dependencies */
import { type, parseTextPlaceholder } from '@totebox/util';
import Query from '@totebox/query';

function hasData(obj) {
  return type(obj) === 'object' && Object.keys(obj).length > 0;
}

// interceptors.response: (json) => Object|Promise
// interceptors.error: (Error, statusText, url) => Error
function http(url, options, interceptors = {}) {
  const tasks = [];
  const { timeout } = options;

  if (timeout) {
    const timeoutTask = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Request timeout'));
      }, timeout);
    });

    delete options.timeout;
    tasks.push(timeoutTask);
  }

  let abort;
  let abortController;

  // 一个可以中止 Web 请求的试验性接口
  // https://developer.mozilla.org/zh-CN/docs/Web/API/FetchController
  if (AbortController) {
    abortController = new AbortController();
    options.signal = abortController.signal;
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

  const abortTask = new Promise((resolve, reject) => {
    abort = () => {
      reject(new Error('Request aborted'));
    };
  });

  tasks.push(requestTask, abortTask);

  const ret = Promise.race(tasks).catch((err) => {
    let statusText;

    if (/timeout/i.test(err.message)) {
      statusText = 'timeout';
    }
    if (/abort/i.test(err.message)) {
      statusText = 'abort';
    }

    if (type(interceptors.error) === 'function') {
      return Promise.reject(interceptors.error(err, statusText, url));
    }

    throw new Error(`Request url: "${url}" failed, message: "${err.message}"${statusText
      ? `, status: "${statusText}"` : ''}`);
  });

  ret.abort = abortController ? () => abortController.abort() : abort;

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
//     error(err, statusText, url) {
//       return new Error(`Request url: "${url}" failed, message: "${err.message}"${statusText
//         ? `,status: "${statusText}"` : ''}`);
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
      // 比如: request.post('/user/{id}', { id: '123', avatar: 'xx.png' })
      // => url: '/user/123', data: { avatar: 'xx.png' }
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
