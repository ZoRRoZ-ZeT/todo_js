import { decorate, injectable } from 'inversify';

export default class EventEmitter {
  constructor() {
    this.events = {};
  }

  subscribe(event, handler) {
    if (!this.events[event]) {
      this.events[event] = [];
    }

    this.events[event].push(handler);
  }

  emit(event, value) {
    const handlers = this.events[event];
    if (handlers) {
      handlers.forEach((handler) => handler(value));
    }
  }
}

decorate(injectable(), EventEmitter);
