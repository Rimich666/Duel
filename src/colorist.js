let ref = null;
let subscribers = new Set();
const colorist = {
  getRef() {
    return ref;
  },
  subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },
  onClick(wizard) {
    ref = wizard;
    subscribers.forEach((callback) => callback());
  },
  reset() {
    ref = null;
  }
};

export default colorist;