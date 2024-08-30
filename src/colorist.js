let ref = null;
let subscribers = new Set();
const colorist = {
  getRef() {
    // console.log('get ref', ref);
    return ref;
  },
  subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },
  onClick(wizard) {
    // console.log('on click');
    ref = wizard;
    subscribers.forEach((callback) => callback());
  },
  reset() {
    // console.log('reset');
    ref = null;
    subscribers.forEach((callback) => callback());
  }
};

export default colorist;