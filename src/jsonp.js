/*
 * url: string
 * settings: object
 *   jsonpCallback: string
 *   timeout: number
 *   done: function
 *   fail: function
 */
export default function jsonp(url, settings) {
  const script = document.createElement('script');
  let obj, 
    props, 
    jsonpCallback, 
    response, 
    i, 
    timer;

  script.type = 'text/javascript';

  jsonpCallback = settings.jsonpCallback;

  if (jsonpCallback.indexOf('.') !== -1) {
    props = jsonpCallback.split('.');
    window[props[0]] = obj = {};

    for (i = 1; i < props.length; i++) {
      if (i < props.length - 1) {
        obj = obj[props[i]] = {};
      } else {
        obj[props[i]] = function () {
          response = arguments[0];
        };
      }
    }
  } else {
    window[jsonpCallback] = function () {
      response = arguments[0];
    };
  }

  if (settings.timeout) {
    timer = setTimeout(function () {
      delete settings.done;
      if (typeof settings.fail === 'function') {
        settings.fail();
      }
    }, settings.timeout);
  }

  if (script.readyState) {
    script.onreadystatechange = function () {
      if (script.readyState === 'loaded' || script.readyState === 'complete') {
        script.onreadystatechange = null;
        clearTimeout(timer);

        if (typeof settings.done === 'function') {
          settings.done(response);
        }
      }
    };
  } else {
    script.onload = function () {
      clearTimeout(timer);

      if (typeof settings.done === 'function') {
        settings.done(response);
      }
    };
  }

  script.src = url;
  (document.head || document.getElementsByTagName('head')[0]).appendChild(script);
}
