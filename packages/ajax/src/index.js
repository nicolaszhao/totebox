import axios from 'axios';
import { parseTextPlaceholder } from '@totebox/util';

const Cancel = axios.CancelToken;

// # ajax setting
// const ajax = Ajax({
//   ...axios.configs,
//   interceptors: { response(data, config) {}, error(err) {}, }
// });
//
// ## request method
// ajax.get(url, data[, config])
// ajax.delete(url, data[, config])
// ajax.head(url, data[, config])
// ajax.options(url, data[, config])
// ajax.post(url, data[, config])
// ajax.put(url, data[, config])
// ajax.patch(url, data[, config])
//
// ## request cancel
// ajax.abort()
//
// url 支持 rest api 的 "{}" 占位替换, 比如:
// ajax.get('/user/{id}', { id: '123' }) => url: '/user/123'
export default function ajax(settings = {}) {
  const { interceptors = {}, ...config } = settings;
  const inst = axios.create(config);

  inst.interceptors.response.use(
    function(res) {
      return Promise.resolve(
        interceptors.response ? interceptors.response(res.data, res.config) : res.data
      );
    },
    function(err) {
      if (axios.isCancel(err)) {
        err.message = 'request canceled';
      }

      return Promise.reject(
        interceptors.error ? interceptors.error(err) : new Error(err.message)
      );
    }
  );

  return 'get delete head options post put patch'
    .split(' ')
    .reduce((req, method) => {
      req[method] = (url, data, config = {}) => {
        const methodsWithBody = ['post', 'put', 'patch'];
        let xhr = null;
        let cancel;

        url = parseTextPlaceholder(url, data, true);
        config.cancelToken = new Cancel((c) => {
          cancel = c;
        });

        if (methodsWithBody.includes(method)) {
          xhr = inst[method](url, data, config);
        } else {
          xhr = inst[method](url, {
            params: data,
            ...config
          });
        }

        xhr.abort = cancel;

        return xhr;
      };

      return req;
    }, { inst });
}
