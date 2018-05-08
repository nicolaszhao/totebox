
/**
 * 时间解析器方法
 * @param time {Number(millisecond)}
 * @param units {Array(['年', '月', '周', '天', '小时', '分钟', '秒'])}
 * @returns {Array} 比如：[ '1周', '14小时', '29秒' ]
 */
export function timeParser(time, units = '年 月 周 天 小时 分钟 秒'.split(' ')) {
  const timeKeys = 'year month week day hours minutes second'.split(' '),
    timeValues = [1, 12, 4, 7, 24, 60, 60],
    yearMilliseconds = 1000 * 60 * 60 * 24 * 365;
  
  let values = {},
    ret = [];
  
  timeKeys.reduce((prev, cur, i) => {
    let next;
    
    if (i === 0) {
      next = time / yearMilliseconds;
    } else {
      next = (prev - Math.floor(prev)) * timeValues[i];
    }
    
    values[cur] = Math.floor(next);
    
    return next;
  }, time);
  
  timeKeys.forEach((key, i) => {
    if (values[key]) {
      ret.push(`${values[key]}${units[i]}`);
    }
  });
  
  return ret;
}

/**
 * 秒钟倒计时工具，返回 stop 方法，执行可用来停止 tick 执行
 * @param {Number} second 
 * @param {Object} events: { onStart, onProgress, onEnd } 
 * @param {Object} context 
 */
export function timer(second, { onStart, onProgress, onEnd }, context) {
  let timerId;

  const tick = () => {
    timerId = setTimeout(() => {
      if (!second) {
        return onEnd.bind(context)(second);
      }

      onProgress.bind(context)(--second);
      tick();
    }, 1000);
  };

  onStart.bind(context)(second);
  tick();

  return function stop(cb) {
    clearTimeout(timerId);
    cb.bind(context)(second);
  };
}
