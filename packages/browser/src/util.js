const listenFileLoad = (el, callbacks = {}) => {
  const { done, fail } = callbacks;
  const unbind = () => {
    el.onload = null;
    el.onerror = null;
  };

  el.onload = () => {
    unbind();
    done && done();
  };

  el.onerror = () => {
    unbind();
    fail && fail();
  };
};

export function loadScript(url, callbacks) {
  const el = document.createElement('script');

  listenFileLoad(el, callbacks);

  el.type = 'text/javascript';
  el.src = url;
  document.getElementsByTagName('head')[0].appendChild(el);
}

export function loadStyle(url, callbacks) {
  const el = document.createElement('link');

  listenFileLoad(el, callbacks);

  el.type = 'text/css';
  el.rel = 'stylesheet';
  el.href = url;
  document.getElementsByTagName('head')[0].appendChild(el);
}

export function noop() {}
