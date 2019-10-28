class History {
  stack = [];

  activeIndex = 0;

  getActive() {
    return this.stack[this.activeIndex];
  }

  getPrev() {
    return this.stack[this.activeIndex - 1];
  }

  getNext() {
    return this.stack[this.activeIndex + 1];
  }

  size() {
    return this.stack.length;
  }

  add(url) {
    if (this.getNext()) {
      this.stack = this.stack.slice(0, this.activeIndex + 1);
    }

    this.stack.push(url);
    this.activeIndex = this.stack.length - 1;

    return this.stack.length;
  }

  find(url) {
    return this.stack.findIndex((stack) => stack === url);
  }

  direct(url) {
    const newActiveIndex = this.find(url);
    const a = this.activeIndex;

    if (newActiveIndex === -1) {
      return this.add(url);
    }

    this.activeIndex = newActiveIndex;

    if (newActiveIndex < a) {
      return -1;
    }

    if (newActiveIndex > a) {
      return 1;
    }

    return this.add(url);
  }
}

export default History;
