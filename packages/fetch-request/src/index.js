import { isPlainObject, isEmpty } from 'lodash';
import { parseTextPlaceholder } from './string';
import { querys } from './query';

let message = '请求接口"{url}"时出错，错误信息：{message}';

let request = function (url, options) {
  const requestPromise = fetch(url, options)
    .then((res) => {
      return res.json()
        .then((json) => {
          if (json.status === 0) {
            return json.data;
          } else {
            return Promise.reject(json);
          }
        }, err => {
          throw new Error(parseTextPlaceholder(message, { url, message: err.message }));
        });
    }, err => {
      throw new Error(parseTextPlaceholder(message, { url, message: err.message }));
    });

  let abort;

  const abortPromise = new Promise((resolve, reject) => {
    abort = () => {
      reject(new Error(parseTextPlaceholder(message, { url, message: 'abort' })));
    };
  });

  const tasks = [requestPromise, abortPromise],
    { timeout } = options;

  let timeoutPromise;

  if (timeout) {
    delete options.timeout;
    timeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => reject(new Error(parseTextPlaceholder(message, { url, message: '请求超时' }))), timeout);
    });

    tasks.push(timeoutPromise);
  }

  const p = Promise.race(tasks);

  p.abort = abort;

  return p;
};

let types = 'get post put patch delete'.split(' ');

types.forEach((type) => {

  /**
   * 异步数据请求 window.fetch 的高级封装
   * @param url: (String) url字符串中可以包含占位符(RUSTful API)，用传入的data参数，解析这些占位符
   *   例如：
   *   url = '//xx.xxx.com/api/user/{userId}', data = {userId: 123, userName: 'Nicolas'}
   *   --> url: '//xx.xxx.com/api/user/123'
   *   --> data: {userName: 'Nicolas'}
   *
   * @param data: (Object) 如果是get和delete请求，该对象会被追加到url的query部分。否则，该对象会JSON.stringify，
   * 然后配置到请求设置项的body中。注意：data中如果匹配到url中的占位字符，相应的数据在解析完成后会从data中移除
   *
   * @param options (Object) fetch API 的设置选项，另外增加了额外的timeout(Number)参数
   */
  request[type] = (url, data, options) => {
    url = parseTextPlaceholder(url, data, true);

    options = Object.assign({
      method: type.toUpperCase()
    }, request.defaults, options);

    if (type === 'get' || type === 'delete') {
      if (isPlainObject(data) && !isEmpty(data)) {
        url = querys(url, data);
      }
    } else {
      options = Object.assign(options, {
        body: isPlainObject(data) && !isEmpty(data) ? JSON.stringify(data) : ''
      });
    }

    return request(url, options);
  };
});

// 可以设置通用的默认配置项来统一处理请求设置项
request.defaults = {};

export default request;
