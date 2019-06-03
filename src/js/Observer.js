class Observer {
  constructor() {
    this.subscribers = { any: [] }
  }

  subscribe(type, fn) {
    type = type || 'any';

    if (typeof this.subscribers[type] === 'undefined') {
      this.subscribers[type] = [];
    }

    this.subscribers[type].push(fn);
  }

  publish(type, ...args) {
    let pubtype = type || 'any',
        subscribers = this.subscribers[pubtype],
        i,
        max = subscribers.length;

    for (i = 0; i < max; i++) {
      subscribers[i](...args);
    }
  }
}

export default Observer;