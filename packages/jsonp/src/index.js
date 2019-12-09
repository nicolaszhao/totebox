/*
 * url: string
 * options: object
 *   jsonpCallback: string
 *   timeout: number
 * cb: callback function
 */

let count = 0;

function noop() {}

export default function jsonp(url, options, cb) {
  if (typeof options === 'function') {
    cb = options;
    options = {};
  } else if (!options) {
    options = {};
  }

  const regCallback = /callback=([^&#]*)/;
  const [, callback] = regCallback.exec(url) || [];
  let { jsonpCallback } = options;
  let timer;

  // 优先使用 url 中定义的 callback name
  if (callback) {
    jsonpCallback = callback === '?' ? `_${Date.now()}` : `${callback}${++count}`;
  } else {
    jsonpCallback = !jsonpCallback ? `_${Date.now()}` : `${jsonpCallback}${++count}`;
  }

  const script = document.createElement('script');
  script.type = 'text/javascript';

  const clearup = () => {
    script.parentNode.removeChild(script);
    window[jsonpCallback] = noop;
    if (timer) {
      clearTimeout(timer);
    }
  };

  if (options.timeout) {
    timer = setTimeout(() => {
      clearup();
      cb && cb(new Error('timeout'));
    }, options.timeout);
  }

  window[jsonpCallback] = function jsonpCallbackWrapper(data) {
    clearup();
    cb && cb(null, data);
  };

  url = url.replace(regCallback, '').replace('?&', '?');
  url += `${(url.indexOf('?') !== -1 ? '&' : '?')}callback=${encodeURIComponent(jsonpCallback)}`;
  script.src = url;
  (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
}
