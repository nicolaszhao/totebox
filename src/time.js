import { type } from './util';

/**
 * 时间解析器方法
 * @param time {Number(millisecond)}
 * @param units {Array(['年', '月', '周', '天', '小时', '分钟', '秒'])}
 * @returns {Array} 比如：[ { value: 1, unit: '周' }, ... ]
 */
export function timeParser(time, units = '天 小时 分钟 秒'.split(' ')) {
  const timeValues = [24, 60, 60, 1000];

  let ret = [];

  timeValues.reduce((prev, timeValue, i) => {
    const ms = timeValues.slice(i)
      .reduce((a, b) => a * b);

    const value = Math.floor(time / ms) - prev;

    ret.push({ value, unit: units[i] });
    
    prev = ret.map((n, retIndex) => {
      return n.value * timeValues.slice(retIndex, i + 1).reduce((a, b) => a * b);
    }).reduce((a, b) => a + b);

    return prev;
  }, 0);

  return ret;
}

// TODO: 需要实现超过 24 小时后的时间计算：都加到 hours 中，或者增加 format 字符串来格式化
export function formatTime(duration) {
  const placeholder = { value: 0 };
  let times = timeParser(duration);

  if (times.length <= 1) {
    times.unshift(Object.create(placeholder), Object.create(placeholder));
    times = times.slice(-2);
  }

  return times.map(time => `${time.value}`.padStart(2, '0'))
    .join(':');
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
