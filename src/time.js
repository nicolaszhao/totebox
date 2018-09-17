import { type } from './util';

/**
 * 时间解析器方法
 * @param time {Number(millisecond)}
 * @param units {Array(['年', '月', '周', '天', '小时', '分钟', '秒'])}
 * @returns {Array} 比如：[ { value: 1, unit: '周' }, ... ]
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
      ret.push({
        value: values[key],
        unit: units[i]
      });
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
export function countdown(value, { onStart = noop, onProgress = noop, onEnd = noop } = {}, context) {
  if (type(value) !== 'date' && type(value) !== 'number') {
    throw new Error('The value of params must be a Date or Number.');
  }

  const cdType = type(value) === 'date' ? 'date' : 'second';
  const last = value;
  let timerId;

  const getDateValues = (value) => {
    const dif = value - Date.now();
    let hours, minutes, second;

    hours = minutes = second = 0;

    if (dif > 0) {
      hours = Math.floor(dif / (1000 * 60 * 60));
      minutes = Math.floor(dif / (1000 * 60)) - hours * 60;
      second = Math.floor(dif / 1000) - hours * 60 * 60 - minutes * 60;
    }
    
    return { dif, hours, minutes, second };
  };

  const tick = () => {
    timerId = setTimeout(() => {
      if (cdType === 'date') {
        const { dif, ...values } = getDateValues(last);

        // 缓存 value 变量，方便在执行停止时可以传入 stop
        value = values;

        if (dif <= 0) {
          return onEnd.bind(context)(value);
        }

        onProgress.bind(context)(value);
      } else {
        if (!value) {
          return onEnd.bind(context)(value);
        }
  
        onProgress.bind(context)(--value);
      }

      tick();
    }, 1000);
  };

  return {
    start() {
      if (cdType === 'date') {
        const { dif, ...values } = getDateValues(last);
    
        value = values;
      }

      onStart.bind(context)(value);
      tick();
    },

    stop(callback) {
      clearTimeout(timerId);
      callback && callback.bind(context)(value);
    }
  };
}

export function noop() { }
