import axios from 'axios';
import { type, parseTextPlaceholder } from '@totebox/util';

const Cancel = axios.CancelToken;

function createInterceptors(inst, interceptors = {}) {
  inst.interceptors.response.use(
    (res) => {
      if (type(interceptors.response) === 'function') {
        // return: Object|Promise(reject),
        return interceptors.response(res.data, res.config);
      }
      return res.data;
    },
    (err) => {
      if (axios.isCancel(err)) {
        err.response = err.response || {};
        err.response.statusText = 'abort';
        err.message = 'Request abort';
      }

      // 可处理统一日志输出等等, 应该返回 err 本身
      return Promise.reject(
        type(interceptors.error) === 'function' ? interceptors.error(err) : err,
      );
    },
  );
}

// Example:
// const xhr = Ajax({
//   ...axios.configs,
//   interceptors: { response(data, config) {}, error(err) {}, }
// });
//
// 返回 xhr.[get|delete|head|options|post|put|patch](url, data[, config])
//
// 取消请求:
// const req = xhr.get(...);
// req.abort();
export default function Ajax(settings = {}) {
  // GET request
  if (type(settings) === 'string') {
    const url = settings;
    return axios(url);
  }

  const { interceptors, ...config } = settings;
  const inst = axios.create(config);

  createInterceptors(inst, interceptors);

  return 'get delete head options post put patch'
    .split(' ')
    .reduce((req, method) => {
      // url 支持 RUSTful API 的 "{}" 占位替换
      // 比如: ajax.get('/user/{id}', { id: '123' }) => url: '/user/123'
      req[method] = (url, data, options = {}) => {
        const methodsWithBody = ['post', 'put', 'patch'];
        let xhr = null;
        let abort;

        url = parseTextPlaceholder(url, data, true);
        options.cancelToken = new Cancel((cancel) => {
          abort = cancel;
        });

        if (methodsWithBody.includes(method)) {
          xhr = inst[method](url, data, options);
        } else {
          xhr = inst[method](url, {
            params: data,
            ...options,
          });
        }

        xhr.abort = abort;

        return xhr;
      };

      return req;
    }, { inst });
}
