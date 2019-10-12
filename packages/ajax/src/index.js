import axios from 'axios';
import { parseTextPlaceholder } from '@totebox/util';

// TODO: 增加 cancel 处理
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

        url = parseTextPlaceholder(url, data, true);

        if (methodsWithBody.includes(method)) {
          xhr = inst[method](url, data, config);
        } else {
          xhr = inst[method](url, {
            params: data,
            ...config
          });
        }

        return xhr;
      };

      return req;
    }, { inst });
}
