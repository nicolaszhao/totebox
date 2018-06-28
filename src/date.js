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
