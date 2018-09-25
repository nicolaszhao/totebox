import axios from 'axios';
import { parseTextPlaceholder } from './string';

function request(config = {}, { filterResponse, beautifyError } = {}) {
  const inst = axios.create(config);

  return 'get delete head options post put patch'
    .split(' ')
    .reduce((req, method) => {
      req[method] = (url, data, config) => {
        const methodsWithBody = ['post put patch'];
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
          .then(({ data }) => {
            if (typeof filterResponse === 'function') {
              return filterResponse(data);
            }

            return data;
          })
          .catch(err => {
            if (typeof beautifyError === 'function') {
              return Promise.reject(beautifyError(url, err));
            }

            return Promise.reject(err);
          });
      };

      return req;
    }, {});
}

export default request;
