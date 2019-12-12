const readline = require('readline');

exports.indicator = function indicator(waitingText = 'waiting', duration = 120) {
  const waiting = ['\\', '|', '/', '-'];
  let timer = null;
  let i = 0;

  function refresh(text = '') {
    readline.cursorTo(process.stdout, 0);
    process.stdout.write(text);
  }

  timer = setInterval(() => {
    refresh(`${waiting[i++]} ${waitingText}...`);

    if (i >= waiting.length) {
      i = 0;
    }
  }, duration);

  return function stop() {
    clearInterval(timer);
    refresh();
  };
};
