const readline = require('readline');

const writeWaiting = (text) => {
  readline.cursorTo(process.stdout, 0);
  process.stdout.write(text);
};

const waitIndicator = (text = 'waiting', duration = 120) => {
  const waiting = ['\\', '|', '/', '-'];
  let timer = null,
    i = 0;;

  return {
    start() {
      timer = setInterval(() => {
        writeWaiting(`${waiting[i++]} ${text}...`);

        if (i >= waiting.length) {
          i = 0;
        }
      }, duration);
    },
    stop() {
      writeWaiting('');
      clearInterval(timer);
    }
  };
};

module.exports = waitIndicator;
