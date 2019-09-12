var History = function() {
  this.stack = [];
  this.activeIndex = 0;
};

History.prototype = {
  constructor: History,

  getActive: function() {
    return this.stack[this.activeIndex];
  },

  getPrev: function() {
    return this.stack[this.activeIndex - 1];
  },

  getNext: function() {
    return this.stack[this.activeIndex + 1];
  },

  size: function() {
    return this.stack.length;
  },

  add: function(url) {
    if (this.getNext()) {
      this.stack = this.stack.slice(0, this.activeIndex + 1);
    }

    this.stack.push(url);
    this.activeIndex = this.stack.length - 1;

    return this.stack.length;
  },

  find: function(url) {
    var length = this.stack.length, index, i;

    for (i = 0; i < length; i++) {
      if (url === this.stack[i]) {
        index = i;
        break;
      }
    }

    return index;
  },

  direct: function(url) {
    var newActiveIndex = this.find(url),
      a = this.activeIndex;

    if (typeof newActiveIndex !== 'undefined') {
      this.activeIndex = newActiveIndex;
    }

    if (newActiveIndex < a) {
      return -1;
    } else if (newActiveIndex > a) {
      return 1;
    } else {
      return this.add(url);
    }
  }
};

export default History;
