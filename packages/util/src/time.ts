import { type, noop } from './util';

interface TimeValues {
  day: number;
  hour?: number;
  minute?: number;
  second?: number;
  [key: string]: number | undefined;
}

/**
 * 解析给到的毫秒值时间为 { day, hour, minute, second } 对象
 * Example: parseTime(61000) returns { day: 0, hour: 0, minute: 1, second: 1 }
 * maxUnit: 最大解析到的时间单位，比如：maxUnit = 'hour'，则不输出 day 的值
*/
export function parseTime(time: number, maxUnit = 'day'): TimeValues {
  const values: TimeValues = { day: 0 };
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

/**
 * for video|audio duration: hh:mm:ss
 */
export function formatTime(duration: number): string {
  const pad = (n: number, len: number) => `${n}`.padStart(len, '0');
  const times = parseTime(duration, 'h');
  const ret = [];

  if (times.hour) {
    ret.push(times.hour);
  }
  ret.push(times.minute as number);
  ret.push(times.second as number);

  return ret.map((r) => pad(r, 2)).join(':');
}

interface Countdown {
  start(): void;
  stop(callback: (...args: any[]) => void): void;
}

/**
 * 秒钟倒计时工具，返回 stop 方法，用来停止 tick 的执行
 */
export function countdown(
  value: number | Date,
  { onStart = noop, onProgress = noop, onEnd = noop } = {},
  context = null,
): Countdown {
  if (type(value) !== 'date' && type(value) !== 'number') {
    throw new Error('The value of params must be a Date or Number.');
  }

  const cdType = type(value) === 'date' ? 'date' : 'second';
  const last = value;
  let cur: number | Date | TimeValues = value;
  let timerId: ReturnType<typeof setTimeout>;

  const tick = () => {
    timerId = setTimeout(() => {
      if (cdType === 'date') {
        const dif = +last - Date.now();
        cur = parseTime(dif);

        if (dif <= 0) {
          return onEnd.bind(context)(cur);
        }
        onProgress.bind(context)(cur);
      } else {
        if (!cur) {
          return onEnd.bind(context)(cur);
        }
        onProgress.bind(context)(--(cur as number));
      }

      tick();
    }, 1000);
  };

  return {
    start() {
      if (cdType === 'date') {
        cur = parseTime(+last - Date.now());
      }

      onStart.bind(context)(cur);
      tick();
    },

    stop(callback) {
      clearTimeout(timerId);

      // cur 为 tick 中分步计算的值
      callback && callback.bind(context)(cur);
    },
  };
}

export function isLeapYear(year: number): boolean {
  return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
}

/**
 * Example: parseDate('2019-09-25', 'yy-mm-dd')
 * returns (Date Object) Wed Sep 25 2019 00:00:00 GMT+0800 (中国标准时间)
 */
export function parseDate(value: string, format: string): Date | null {
  if (value === '') {
    return null;
  }

  let year = -1;
  let month = -1;
  let day = -1;
  let iValue = 0;
  let date = new Date();
  let iFormat: number;
  let extra;

  function lookAhead(match: string) {
    const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);

    if (matches) {
      iFormat++;
    }

    return matches;
  }

  function getNumber(match: string) {
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

export function formatDate(date: Date, format: string): string {
  if (!date) {
    return '';
  }

  let output = '';
  let iFormat: number;

  function lookAhead(match: string) {
    const matches = (iFormat + 1 < format.length && format.charAt(iFormat + 1) === match);

    if (matches) {
      iFormat++;
    }

    return matches;
  }

  function formatNumber(match: string, value: number, len: number) {
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
          : (date.getFullYear() % 100 < 10 ? '0' : '') + (date.getFullYear() % 100));
        break;
      default:
        output += format.charAt(iFormat);
    }
  }

  return output;
}
