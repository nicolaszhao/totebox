import { isPlainObject, isEmpty, isUndefined } from 'lodash';

/**
 * 转换 text 中在 data 中出现的占位为最终字符串
 * 例如：text = 'Hello, {name}!', data = { name: 'Nicolas' } 会转换为 'Hello, Nicolas!'
 * 如果 dataReplaceable 设置为 true，会删除 data 中被 text 匹配到的值
 * @param {String} text 
 * @param {Object} data 
 * @param {Boolean} dataReplaceable 
 */
export function parseTextPlaceholder(text, data, dataReplaceable = false) {
  let rPlaceholder = /\{([^}]+)\}/g;
  
  if (rPlaceholder.test(text) && isPlainObject(data) && !isEmpty(data)) {
    return text.replace(rPlaceholder, function(match, placeholder) {
      let val = data[placeholder];
      
      if (!isUndefined(val)) {
        if (dataReplaceable) {
          delete data[placeholder];
        }
        
        return val;
      }
      
      return match;
    });
  }
  
  return text;
}
