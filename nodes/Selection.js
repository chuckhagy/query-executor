module.exports = class Selection {
  constructor(predicate, childIterator) {
    (this.predicate = predicate),
      (this.childIterator = childIterator),
      (this.scanFinished = false);
  }

  next() {
    while (!this.scanFinished) {
      const { value, done } = this.childIterator.next();

      if (done) {
        this.scanFinished = true;
        return { value, done: true };
      }

      if (this.predicate(value)) {
        return { value, done: false };
      }
    }
  }
};
