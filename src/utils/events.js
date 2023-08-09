export const event = {
  list: new Map(),
  on(eventType, eventAction) {
    this.list.has(eventType) || this.list.set(eventType, []);
    this.list.get(eventType).push(eventAction);
    return this;
  },

  emit(eventType, ...args) {
    this.list.get(eventType) &&
      this.list.get(eventType).forEach((cb) => {
        cb(...args);
      });
  },

  off(eventType, eventAction) {
    if(!this.list.get(eventType)) return;
    this.list.set(eventType, this.list.get(eventType).filter(e => e !== eventAction))
  }
};
