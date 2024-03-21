module.exports = class MyEventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(eventName, fn) {
    if (!this.listeners[eventName]) this.listeners[eventName] = [];
    this.listeners[eventName].push(fn);
    return this;
  }

  off(eventName, fn) {
    if (!this.listeners[eventName]) return this;

    const eventIndex = this.listeners[eventName].indexOf(fn);
    if (eventIndex !== -1) this.listeners[eventName].splice(eventIndex, 1);

    return this;
  }

  addListener(eventName, fn) {
    return this.on(eventName, fn);
  }

  removeListener(eventName, fn) {
    return this.off(eventName, fn);
  }

  once(eventName, fn) {
    const onceWrapper = (...args) => {
      fn(...args);
      this.off(eventName, onceWrapper);
    };
    return this.on(eventName, onceWrapper);
  }

  emit(eventName, ...args) {
    if (!this.listeners[eventName]) {
      return false;
    }

    for (const listener of this.listeners[eventName]) {
      listener(...args);
    }

    return true;
  }

  listenerCount(eventName) {
    return this.listeners[eventName] ? this.listeners[eventName].length : 0;
  }

  rawListeners(eventName) {
    return this.listeners[eventName] || [];
  }
};
