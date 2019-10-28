export default {
  get(name) {
    const regCookie = new RegExp(`(?:;\\s)?${encodeURIComponent(name)}=([^;]*);?`);
    return regCookie.test(document.cookie)
      ? decodeURIComponent(RegExp.$1)
      : null;
  },

  set(name, value, {
    expires, path, domain, secure,
  } = {}) {
    let cookies = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (expires instanceof Date) {
      cookies += `; expires=${expires.toGMTString()}`;
    }

    if (path) {
      cookies += `; path=${path}`;
    }

    if (domain) {
      cookies += `; domain=${domain}`;
    }

    if (secure) {
      cookies += '; secure';
    }

    document.cookie = cookies;
  },

  remove(name, { path, domain, secure } = {}) {
    const options = {

      // 设置失效时间，初始化为 0ms 的 Date 对象的值时，为1970年1月1日
      expires: new Date(0),

      path,
      domain,
      secure,
    };

    this.set(name, '', options);
  },
};
