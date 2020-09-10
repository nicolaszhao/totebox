import { type, noop } from './util';

// 解析给到的毫秒值时间为 { day, hour, minute, second } 对象
// Example: parseTime(61000) returns { day: 0, hour: 0, minute: 1, second: 1 }
// maxUnit: 最大解析到的时间单位，比如：maxUnit = 'hour'，则不输出 day 的值
export function parseTime(time, maxUnit = 'day') {
  const values = {};
  let source = [
    { unit: 'day', value: 24 },
    { unit: 'hour', value: 60 },
    { unit: 'minute', value: 60 },
    { unit: 'second', value: 1 },
  ];
  const index = source.findIndex((s) => s.unit === maxUnit || s.unit.charAt(0) === maxUnit);

  if (index > 0) {
    source = source.slice(index);
  }

  time = Math.round(time / 1000);

  source.forEach((s, i) => {
    const seconds = source
      .slice(i)
      .map((next) => next.value)
      .reduce((a, b) => a * b);

    const val = Math.floor(time / seconds);

    time -= seconds * val;
    values[s.unit] = val;
  });

  return values;
}

// for video|audio duration: hh:mm:ss
export function formatTime(duration) {
  const pad = (n, len) => `${n}`.padStart(len, '0');
  const times = parseTime(duration, 'h');
  const ret = [];

  if (times.hour) {
    ret.push(times.hour);
  }
  ret.push(times.minute);
  ret.push(times.second);

  return ret.map((r) => pad(r, 2)).join(':');
}

/**
 * 秒钟倒计时工具，返回 stop 方法，用来停止 tick 的执行
 * @param {Number} second
 * @param {Object} events: { onStart, onProgress, onEnd }
 * @param {Object} context
 */
export function countdown(
  value,
  { onStart = noop, onProgress = noop, onEnd = noop } = {},
  context,
) {
  if (type(value) !== 'date' && type(value) !== 'number') {
    throw new Error('The value of params must be a Date or Number.');
  }

  const cdType = type(value) === 'date' ? 'date' : 'second';
  const last = value;
  let timerId = null;

  const tick = () => {
    timerId = setTimeout(() => {
      if (cdType === 'date') {
        const dif = last - Date.now();
        value = parseTime(dif);

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
        value = parseTime(last - Date.now());
      }

      onStart.bind(context)(value);
      tick();
    },

    stop(callback) {
      clearTimeout(timerId);
      timerId = null;

      // value 为 tick 中分步计算的值
      callback && callback.bind(context)(value);
    },
  };
}

export function isLeapYear(year) {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

// Example: parseDate('2019-09-25', 'yy-mm-dd')
// returns (Date Object) Wed Sep 25 2019 00:00:00 GMT+0800 (中国标准时间)
export function parseDate(value, format) {
  if (value === '') {
    return null;
  }

  let year = -1;
  let month = -1;
  let day = -1;
  let iValue = 0;
  let date = new Date();
  let iFormat;
  let extra;

  function lookAhead(match) {
    const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);

    if (matches) {
      iFormat++;
    }

    return matches;
  }

  function getNumber(match) {
    const isDoubled = lookAhead(match);
    const size = (match === 'y' && isDoubled ? 4 : 2);
    const digits = new RegExp(`^\\d{1,${size}}`);
    const num = value.substring(iValue).match(digits);

    if (!num) {
      throw new Error(`Missing number at position ${iValue}`);
    }

    iValue += num[0].length;

    return parseInt(num[0], 10);
  }

  function checkLiteral() {
    if (value.charAt(iValue) !== format.charAt(iFormat)) {
      throw new Error(`Unexpected literal at position ${iValue}`);
    }

    iValue++;
  }

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
      throw new Error(`Extra/unparsed characters found in date: ${extra}`);
    }
  }

  if (year === -1) {
    year = date.getFullYear();
  } else if (year < 100) {
    year += date.getFullYear() - (date.getFullYear() % 100);
  }

  date = new Date(year, month - 1, day);
  if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
    throw new Error('Invalid date');
  }

  return date;
}

export function formatDate(date, format) {
  if (!date) {
    return '';
  }

  let output = '';
  let iFormat;

  function lookAhead(match) {
    const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);

    if (matches) {
      iFormat++;
    }

    return matches;
  }

  function formatNumber(match, value, len) {
    let num = `${value}`;

    if (lookAhead(match)) {
      while (num.length < len) {
        num = `0${num}`;
      }
    }

    return num;
  }

  for (iFormat = 0; iFormat < format.length; iFormat++) {
    switch (format.charAt(iFormat)) {
      case 'd':
        output += formatNumber('d', date.getDate(), 2);
        break;
      case 'm':
        output += formatNumber('m', date.getMonth() + 1, 2);
        break;
      case 'y':
        output += (lookAhead('y')
          ? date.getFullYear()
          : (date.getYear() % 100 < 10 ? '0' : '') + (date.getYear() % 100));
        break;
      default:
        output += format.charAt(iFormat);
    }
  }

  return output;
}
