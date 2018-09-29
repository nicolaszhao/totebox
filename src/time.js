import { type } from './util';

/**
 * 将提供的毫秒值解析成格式化的时间数值列表
 * @param {Number} time 
 * @param {Object} options { startUnit, labels }
 *  startUnit: 'years | months | weeks | days | hours | minutes | seconds'
 *  labels: { years: '年', months: '月', ... }
 */
export function timeParser(time, options = {}) {
  if (type(time) !== 'number') {
    time = 0;
  }

  const { startUnit = 'years', labels = {} } = options;
  let units = [
    { label: 'Years', value: 12 },
    { label: 'Months', value: 4 },
    { label: 'Weeks', value: 7 },
    { label: 'Days', value: 24 },
    { label: 'Hours', value: 60 },
    { label: 'Minutes', value: 60 },
    { label: 'Seconds', value: 1000 }
  ];

  units = units.map(unit => {
    const key = unit.label.toLowerCase();

    return {
      ...unit,
      label: labels[key] || unit.label,
      key,
    };
  });
  
  let startIndex = units.findIndex(unit => unit.key === startUnit);
  
  if (startIndex > 0) {
    units = units.slice(startIndex);
  }

  const inAll = (arr, option) => {
    return arr.reduce((prev, cur) => {
      if (option === 'add') {
        return prev + cur;
      }

      return prev * cur;
    });
  };

  const getUnitsValues = (units) => {
    return units.map(unit => unit.value);
  };

  let ret = [];

  units.reduce((prev, unit, i) => {
    const ms = inAll(getUnitsValues(units.slice(i)));
    const value = Math.floor(time / ms) - prev;

    ret.push({ value, unit: unit.label });

    prev = ret.map((n, j) => {
      return n.value * inAll(getUnitsValues(units.slice(j, i + 1)));
    });
    prev = inAll(prev, 'add');

    return prev;
  }, 0);

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

  const tick = () => {
    timerId = setTimeout(() => {
      if (cdType === 'date') {
        const dif = last - Date.now();

        // 缓存 value 变量，方便在执行停止时可以传入 stop
        value = timeParser(dif < 0 ? 0 : dif, { startUnit: 'hours' });

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
        const dif = last - Date.now();

        value = timeParser(dif < 0 ? 0 : dif, { startUnit: 'hours' });
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
