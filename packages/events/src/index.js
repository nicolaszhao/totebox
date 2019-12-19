/* eslint-disable import/no-extraneous-dependencies */
import { type } from '@totebox/util';

class Events {
  callbacks = {};

  callbacksWithNamespace = {};

  // event 可以支持多种格式:
  // 1. 'event', 'event:attr', 'event.namespace', 'event:attr.namespace'
  // 2. 在 1 的基础上，用空格分割组合
  // 3. 在 1 和 2 的基础上，用对象映射: { event1, event2, event3, ... }，或者: { 'event1 event2', 'event3', ... }
  on(event, callback, options) {
    if (type(event) !== 'string' && type(event) !== 'object') {
      return;
    }

    if (type(event) === 'object') {
      return Object.keys(event).forEach((name) => {
        this.on(name, event[name], options);
      });
    }

    this.splitEventName(event).forEach((name) => {
      this.addEvent(name, callback, options);
    });

    return this;
  }

  once(event, callback) {
    this.on(event, callback, { once: true });
    return this;
  }

  // event:
  // 可以是: 缺省, '.namespace', 'event', 'event:attr', 'event.namespace', 'event:attr.namespace'
  off(event) {
    if (!event) {
      this.callbacks = {};
      this.callbacksWithNamespace = {};
      return this;
    }

    if (/^\.([a-zA-Z0-9_]+)$/.test(event)) {
      delete this.callbacksWithNamespace[RegExp.$1];
      return this;
    }

    const { name, attr, namespace } = this.parseEventName(event);

    if (namespace) {
      if (this.callbacksWithNamespace[namespace]) {
        this.removeEvents(this.callbacksWithNamespace[namespace], name, attr);
      }
    } else {
      this.removeEvents(this.callbacks, name, attr);
      Object.keys(this.callbacksWithNamespace).forEach((ns) => {
        this.removeEvents(this.callbacksWithNamespace[ns], name, attr);
      });
    }

    return this;
  }

  // event:
  // 可以是: 'event', 'event:attr', 'event.namespace', 'event:attr.namespace'
  trigger(event, ...data) {
    const { name, attr, namespace } = this.parseEventName(event);

    if (namespace) {
      if (this.callbacksWithNamespace[namespace]) {
        this.triggerEvents(this.callbacksWithNamespace[namespace], name, attr, data);
      }
    } else {
      this.triggerEvents(this.callbacks, name, attr, data);
      Object.keys(this.callbacksWithNamespace).forEach((ns) => {
        this.triggerEvents(this.callbacksWithNamespace[ns], name, attr, data);
      });
    }
  }

  splitEventName(event) {
    return event.split(/\s+/).filter(Boolean);
  }

  parseEventName(event) {
    const regEventName = /^([a-zA-Z0-9_]+)(?::([a-zA-Z0-9_]+))?(?:\.([a-zA-Z0-9_]+))?$/;
    const [, name = event, attr, namespace] = regEventName.exec(event) || [];
    return { name, attr, namespace };
  }

  filterEventNames(callbacks, event, attr) {
    return Object.keys(callbacks)
      .filter((eventName) => {
        if (attr) {
          return eventName === `${event}:${attr}`;
        }
        return eventName === event || eventName.startsWith(`${event}:`);
      });
  }

  addEvent(event, callback, options = {}) {
    const { name, attr, namespace } = this.parseEventName(event);
    const eventName = attr ? `${name}:${attr}` : name;
    let callbacks;

    if (namespace) {
      if (!this.callbacksWithNamespace[namespace]) {
        this.callbacksWithNamespace[namespace] = {};
      }
      callbacks = this.callbacksWithNamespace[namespace];
    } else {
      callbacks = this.callbacks;
    }

    if (type(callback) === 'function') {
      if (!callbacks[eventName]) {
        callbacks[eventName] = [];
      }

      callbacks[eventName].push([callback, options]);
    }
  }

  triggerEvents(callbacks, event, attr, data) {
    this.filterEventNames(callbacks, event, attr)
      .forEach((eventName) => {
        const events = callbacks[eventName];
        let onceIndex = -1;
        events.forEach(([cb, options], i) => {
          if (options.once) {
            onceIndex = i;
          }
          cb(...data);
        });
        if (onceIndex !== -1) {
          events.splice(onceIndex, 1);
        }
      });
  }

  removeEvents(callbacks, event, attr) {
    const eventNames = this.filterEventNames(callbacks, event, attr);
    let len = eventNames.length;

    while (len--) {
      delete callbacks[eventNames[len]];
    }
  }
}

export default Events;
