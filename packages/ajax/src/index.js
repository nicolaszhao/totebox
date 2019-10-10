import axios from 'axios';
import { parseTextPlaceholder } from '@totebox/util';

export default function ajax(settings = {}) {
  const { interceptors = {}, ...configs } = settings;
  const inst = axios.create(configs);

  inst.interceptors.response.use(
    function(res) {
      return Promise.resolve(
        interceptors.response ? interceptors.response(res) : res.data
      );
    },
    function(err) {
      return Promise.reject(
        interceptors.error ? interceptors.error(err) : err
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

        return xhr
          // .then(({ data }) => {
          //   if ((config.responseType && config.responseType !== 'json') ||
          //   typeof filterResponse !== 'function') {

          //     return data;
          //   }

          //   return filterResponse(data);
          // })
          // .catch(err => {
          //   if (typeof beautifyError === 'function') {
          //     return Promise.reject(beautifyError(url, err));
          //   }

          //   return Promise.reject(err);
          // });
      };

      return req;
    }, { inst });
}
