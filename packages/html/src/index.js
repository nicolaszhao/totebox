export default {
  entityify(text) {
    const character = {
      '<': '&lt;',
      '>': '&gt;',
      '&': '&amp;',
      '"': '&quot;'
    };

    return text.replace(/[<>"&]/g, function (match) {
      return character[match];
    });
  },

  deentityify(text) {
    const entity = {
      quot: '"',
      lt: '<',
      gt: '>'
    };

    return text.replace(/&([^&;]+);/g, function (match, key) {
      const ret = entity[key];

      return typeof ret === 'string' ? ret : match;
    });
  },

  strip: function (text) {
    return text.replace(/<(?:.|\s)*?>/g, '');
  },

  escape(text) {
    if (typeof text !== 'string') {
      return '';
    }

    const rscript = /<script[^>]*>(?:(?:(?!<\/script>).)*<\/script>)?/gi,
      rstyle = /<style[^>]*>(?:(?!@import|<\/style>).)*@import(?:(?!<\/style>).)+<\/style>/gi,
      rlink = /<link(?:(?!\.css).)+\.css[^>]*>/gi,
      rinnerevent = /on[a-zA-Z]+\s*=\s*(?:'[^']*'|"[^"]*"|[^\s\/>]+)/gi,
      rinnerexpress = /javascript:/gi;

    return text.replace(rscript, '')
      .replace(rstyle, '')
      .replace(rlink, '')
      .replace(rinnerevent, '')
      .replace(rinnerexpress, '');
  },

  filter: function (text, maxlength) {
    if (text === '')
      return '';

    text = text

      // 将2个以上的空字符转换为一个
      .replace(/\s{2,}/g, ' ')

      // 将所有HTML的换行标记转换为换行符
      .replace(/<br\s*\/?>/g, '\n')

      // 将所有HTML的空格标记转换为一个空字符
      .replace(/(\s*&(n|N)(b|B)(s|S)(p|P);\s*)+/g, ' ')

      // 将单个单引号转换为成对的单引号
      .replace(/'/g, "''");

    // 过滤掉两端空格及HTML标记
    text = trim(text);
    text = this.strip(text);

    if (typeof maxlength === 'number') {
      text = text.substring(0, maxlength);
    }

    return text;
  }
};
