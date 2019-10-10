import { noop } from './util';

export const view = {
  viewHeight() {
    return window.innerHeight || document.documentElement.clientHeight;
  },
  viewWidth() {
    return window.innerWidth || document.documentElement.clientWidth;
  },
  documentHeight() {
    return Math.max(
      document.documentElement.scrollHeight,
      document.documentElement.clientHeight
    );
  },
  documentWidth() {
    return Math.max(
      document.documentElement.scrollWidth,
      document.documentElement.clientWidth
    );
  },
  scrollTop(top) {
    if (typeof top === 'number') {
      document.documentElement.scrollTop = top;
      document.body.scrollTop = top;
      return;
    }

    return document.documentElement.scrollTop || document.body.scrollTop;
  },
  scrollLeft(left) {
    if (typeof left === 'number') {
      document.documentElement.scrollLeft = left;
      document.body.scrollLeft = left;
      return;
    }

    return document.documentElement.scrollLeft || document.body.scrollLeft;
  },
};

/**
 * 监听页面可见性变化并绑定处理函数
 * HTML 5 Page Visibility API: https://developer.mozilla.org/en-US/docs/Web/API/Page_Visibility_API
 *
 * 基本用法：
 * listenPageVisibility(visible => {
 *   if (visible) {
 *     // 页面从不可见变为可见
 *   } else {
 *     // 页面从可见变为不可见
 *   }
 * });
 *
 * 移动端兼容性：
 * iOS:             √ 自带浏览器    √ Chrome for iOS        × UC 浏览器    √ 微信    × QQ    × 微博
 * Android 4.4+:    √ 自带浏览器    √ Chrome for Android    √ UC 浏览器    √ 微信    √ QQ    √ 微博
 */
export function listenPageVisibility(handler = noop) {
  let hiddenProp;
  let eventType;

  if (typeof document.hidden !== 'undefined') {
    hiddenProp = 'hidden';
    eventType = 'visibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    hiddenProp = 'webkitHidden';
    eventType = 'webkitvisibilitychange';
  }

  hiddenProp && document.addEventListener(eventType, () => handler(!document[hiddenProp]), false);
}

// listenScrollToBottom(callback);
// listenScrollToBottom(null, callback);
// listenScrollToBottom({ distance: [number] }, callback);
export function listenScrollToBottom(options, callback) {
  const defaultOptions = { distance: 0 };

  if (typeof options === 'function') {
    callback = options;
    options = defaultOptions;
  } else if (!options) {
    options = defaultOptions;
  }

  const scrollTop = view.scrollTop();
  const scrollHeight = scrollTop + view.viewHeight();
  let direction = 0;

  if (!listenScrollToBottom.prevScrollTop || scrollTop > listenScrollToBottom.prevScrollTop) {
    direction = 1;
  } else {
    direction = -1;
  }

  listenScrollToBottom.prevScrollTop = scrollTop;

  if (direction > 0 && scrollHeight >= view.documentHeight() - options.distance) {
    callback();
  }
}

// source: http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport/7557433#7557433
export function isElementInViewport(el) {
  const { top, left, bottom, right } = el.getBoundingClientRect();

  return top >= 0 && bottom <= view.viewHeight()
    && left >= 0 && right <= view.viewWidth();
}

export function isElementAppearInViewport(el) {
  const { top, left, bottom, right } = el.getBoundingClientRect();

  return bottom > 0 && top < view.viewHeight()
    && right > 0 && left < view.viewWidth();
}

export function lazyLoadImage(dataSrcAttr = 'data-src', container = document) {
  const eventTypes = 'DOMContentLoaded load resize scroll'.split(' '),
    images = container.querySelectorAll(`img[${dataSrcAttr}]`);

  if (!images.length) {
    return;
  }

  const loadImage = () => {
    for (let image of images) {
      let src;

      if (isElementAppearInViewport(image) && (src = image.getAttribute(dataSrcAttr))) {
        image.setAttribute('src', src);
        image.removeAttribute(dataSrcAttr);
      }
    }
  };

  eventTypes.forEach((type) => {
    window.addEventListener(type, loadImage, false);
  });
}
