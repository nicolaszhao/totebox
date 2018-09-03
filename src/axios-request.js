import axios from 'axios';

export default function request(config = {}, { filterResponse, beautifyError } = {}) {
  const inst = axios.create(config);

  return 'get delete head options post put patch'
    .split(' ')
    .reduce((req, method) => {
      req[method] = (url, data, config) => {
        const methodsWithBody = ['post put patch'];
        let xhr = null;

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
              Promise.reject(beautifyError(url, err));
            }

            Promise.reject(err);
          });
      };

      return req;
    }, {});
}