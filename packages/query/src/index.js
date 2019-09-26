
const regUrl = /^([^?#]+)(\?[^#]+)?(#.+)?/;
const regQuery = /^([^=]+)(?:=(.*))?$/;
const cache = {};

export default function Query(url) {
  if (!url) {
    url = typeof location !== 'undefined' ? location.href : '';
  }

  const [, baseUrl = '', search = '', hash = ''] = regUrl.exec(url) || [];
  let qs = {};

  if (url && cache[url]) {

    // 与 cache 的引用分离，防止 add, remove 操作时，影响之后 Query(url) 的缓存数据
    qs = { ...cache[url] };

  } else if (search) {
    const params = search.substring(1).split('&');

    for (let i = 0; i < params.length; i++) {
      const queryMatch = regQuery.exec(params[i]);

      if (queryMatch) {
        let [, name, value] = queryMatch;

        try {
          name = decodeURIComponent(name);

          // maybe has: URI malformed error
          value = value ? decodeURIComponent(value) : '';
        } catch (err) {
          console.log(`parse url querys error, ${name}=${value}`);
          value = '';
        }

        if (/^(true|false)$/.test(value)) {
          value = JSON.parse(RegExp.$1);
        } else if (/^\d+$/.test(value)) {
          value = +value;
        }

        qs[name] = value;
      }
    }

    // 与 qs 的引用分离，原因同上
    cache[url] = { ...qs };
  }

  return {
    values() {
      return qs;
    },
    add(values = {}) {
      qs = { ...qs, ...values };
      return this;
    },
    remove(querys = []) {
      if (typeof querys === 'string') {
        querys = [querys];
      }

      let i = querys.length;

      while (i--) {
        delete qs[querys[i]];
      }

      return this;
    },

    // 如果参数是数组，必须全部匹配
    has(querys = []) {
      if (typeof querys === 'string') {
        querys = [querys];
      }
      if (!querys.length) {
        return false;
      }
      return querys.every(name => qs[name]);
    },
    href() {
      let queryString = Object.keys(qs)
        .map((name) => {
          const value = typeof qs[name] !== 'undefined' ? encodeURIComponent(qs[name]) : '';
          name = encodeURIComponent(name);
          return `${name}=${value}`;
        })
        .join('&');

      if (queryString) {
        queryString = `?${queryString}`;
      }

      return `${baseUrl}${queryString}${hash}`;
    },
  };
}
