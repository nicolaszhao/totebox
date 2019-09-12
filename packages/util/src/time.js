import { type, noop } from './util';

/**
 * 将提供的毫秒值解析成格式化的时间数值列表
 * @param {Object} options { startUnit, labels }
 *  startUnit: 'years | months | weeks | days | hours | minutes | seconds'
 *  labels: { years: '年', months: '月', ... }
 *
 * @returns (time) => [{ unit: 'Years', value }, ...]
 */
export function timeParser(options = {}) {
  const { startUnit = 'years', units = {} } = options;
  let unitsSource = [
    { unit: 'Years', value: 12 },
    { unit: 'Months', value: 4 },
    { unit: 'Weeks', value: 7 },
    { unit: 'Days', value: 24 },
    { unit: 'Hours', value: 60 },
    { unit: 'Minutes', value: 60 },
    { unit: 'Seconds', value: 1000 }
  ];

  const inAll = (arr, option) => {
    return arr.reduce((prev, cur) => {
      if (option === 'add') {
        return prev + cur;
      }

      return prev * cur;
    });
  };

  const getSourceValues = (units) => {
    return units.map(unit => unit.value);
  };

  unitsSource = unitsSource.map((source, i) => {
    const key = source.unit.toLowerCase(),
      ms = inAll(getSourceValues(unitsSource.slice(i)));

    return {
      ...source,
      unit: units[key] || source.unit,
      key,
      ms
    };
  });

  let startIndex = unitsSource.findIndex(source => source.key === startUnit);

  if (startIndex > 0) {
    unitsSource = unitsSource.slice(startIndex);
  }

  const cache = {};

  return (time) => {
    if (type(time) !== 'number' || time < 0) {
      return unitsSource.map(({ unit }) => ({ value: 0, unit }));
    }

    let values = [];

    unitsSource.reduce((prev, source, i) => {
      const value = Math.floor(time / unitsSource[i].ms) - prev;

      values.push({ value, unit: source.unit });

      prev = values.map((n, j) => {
        let unitValues = cache[`${j}-${i + 1}`];

        if (!unitValues) {
          unitValues = inAll(getSourceValues(unitsSource.slice(j, i + 1)));
          cache[`${j}-${i + 1}`] = unitValues;
        }

        return n.value * unitValues;
      });

      prev = inAll(prev, 'add');

      return prev;
    }, 0);

    return values;
  };
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
  const times = timeParser({ startUnit: 'hours' });
  let timerId;

  const tick = () => {
    timerId = setTimeout(() => {
      if (cdType === 'date') {
        const dif = last - Date.now();

        // 缓存 value 变量，方便在执行停止时可以传入 stop
        value = times(dif);

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
        value = times(last - Date.now());
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

/**
 *
 * TODO: 该模块下方法还未做过任何测试
 */

export function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

export function parseDate(format, value) {
  if (value === '') {
    return null;
  }

  let year = -1,
    month = -1,
    day = -1,
    iValue = 0,
    date = new Date(),
    iFormat, extra;

  const lookAhead = function (match) {
      const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);

      if (matches) {
        iFormat++;
      }

      return matches;
    },

    getNumber = function (match) {
      const isDoubled = lookAhead(match),
        size = (match === 'y' && isDoubled ? 4 : 2),
        digits = new RegExp('^\\d{1,' + size + '}'),
        num = value.substring(iValue).match(digits);

      if (!num) {
        throw 'Missing number at position ' + iValue;
      }

      iValue += num[0].length;

      return parseInt(num[0], 10);
    },

    checkLiteral = function () {
      if (value.charAt(iValue) !== format.charAt(iFormat)) {
        throw 'Unexpected literal at position ' + iValue;
      }

      iValue++;
    };

  for (iFormat = 0; iFormat < format.length; iFormat++) {
    switch (format.charAt(iFormat)) {
      case 'd':
        day = getNumber('d');
        break;
      case 'm':
        month = getNumber('m');
        break;
      case 'y':
        year = getNumber('y');
        break;
      default:
        checkLiteral();
    }
  }

  if (iValue < value.length) {
    extra = value.substr(iValue);

    if (!/^\s+/.test(extra)) {
      throw 'Extra/unparsed characters found in date: ' + extra;
    }
  }

  if (year === -1) {
    year = date.getFullYear();
  } else if (year < 100) {
    year += date.getFullYear() - date.getFullYear() % 100;
  }

  date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    throw 'Invalid date';
  }

  return date;
}

export function formatDate(format, date) {
  if (!date) {
    return '';
  }

  let output = '',
    iFormat,

    lookAhead = function (match) {
      const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);

      if (matches) {
        iFormat++;
      }

      return matches;
    },

    formatNumber = function (match, value, len) {
      var num = '' + value;

      if (lookAhead(match)) {
        while (num.length < len) {
          num = '0' + num;
        }
      }

      return num;
    };

  for (iFormat = 0; iFormat < format.length; iFormat++) {
    switch (format.charAt(iFormat)) {
      case 'd':
        output += formatNumber('d', date.getDate(), 2);
        break;
      case 'm':
        output += formatNumber('m', date.getMonth() + 1, 2);
        break;
      case 'y':
        output += (lookAhead('y') ? date.getFullYear() :
          (date.getYear() % 100 < 10 ? '0' : '') + date.getYear() % 100);
        break;
      default:
        output += format.charAt(iFormat);
    }
  }

  return output;
}
