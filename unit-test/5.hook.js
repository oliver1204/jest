class Counter {
  constructor() {
    this.count = 0;
  }
  add(count) {
    this.count += count;
  }
  minus(count) {
    this.count -= count;
  }
}
module.exports = Counter;