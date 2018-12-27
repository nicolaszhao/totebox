const rUrl = /^([^?#]+)(\?[^#]+)?(#.+)?/;

export function getQuerys(url = '') {
  const rQueryValue = /^([^=]+)(?:=(.*))?$/;

  let [, , search] = rUrl.exec(url) || [];

  if (!search) {
    return null;
  }

  const ret = {},
    args = search.substring(1).split('&'),
    len = args.length;

  for (let i = 0; i < len; i++) {
    const queryMatch = rQueryValue.exec(args[i]);

    if (queryMatch) {
      let [, name, value] = queryMatch;

      name = decodeURIComponent(name);
      value = typeof value !== 'undefined' ? decodeURIComponent(value) : '';

      if (/^(true|false)$/.test(value)) {
        value = JSON.parse(RegExp.$1);
      } else if (/^\d+$/.test(value)) {
        value = +value;
      }

      ret[name] = value;
    }
  }

  return ret;
}

export function addQuerys(url = '', querys = {}) {
  const oriQuerys = getQuerys(url) || {};
  
  for (let name of Object.keys(querys)) {
    oriQuerys[name] = querys[name];
  }

  const queryString = [];

  for (let name of Object.keys(oriQuerys)) {
    const key = encodeURIComponent(name),
      value = typeof oriQuerys[name] !== 'undefined' ? encodeURIComponent(oriQuerys[name]) : '';

    queryString.push(`${key}=${value}`);
  }

  if (!queryString.length) {
    return url;
  }

  const [, baseUrl, , hash = ''] = rUrl.exec(url);

  return `${baseUrl}?${queryString.join('&')}${hash}`;
}

/**
 * 参数可通过多种方式传入
 * querys(); -> { ...querys }
 * querys(url); -> { ...querys }
 * querys(params); -> 'url?params#hash'
 * querys(url, params); -> 'url?params#hash'
 * 
 * @param {String} url
 * @param {Object} params: 需要添加到 URL search 部分的参数，如果传了该参数，会调用 addQuerys 方法
 */
export function querys(...args) {
  let [url, params] = args;

  if (!url) {
    url = window.location.href;
  } else if (typeof url === 'object') {
    [url, params] = [window.location.href, url];
  }

  if (!params) {
    return getQuerys(url);
  }

  return addQuerys(url, params);
}

export function checkQuery(requiredParams = []) {
  const query = querys() || {};

  const ret = requiredParams.every((param) => {
    return query[param] || query[param.toLowerCase()];
  });

  if (!ret) {
    return Promise.reject(new Error(`Missing url params: ${requiredParams.join(', ')}`));
  }

  return Promise.resolve(query);
}
