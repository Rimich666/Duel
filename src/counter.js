let count = [0, 0];
let subscribers = new Set();

const counter = {
  read() {
    return count.join(';');
  },
  subscribe(callback) {
    subscribers.add(callback);
    return () => subscribers.delete(callback);
  },
  add(index, number) {
    count[index] = count[index] + number;
    subscribers.forEach((callback) => callback());
  },
};

export default counter;