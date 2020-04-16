module.exports = class Projection {
  constructor(columns, childIterator) {
    (this.columns = columns),
      (this.childIterator = childIterator),
      (this.scanFinished = false);
  }

  next() {
    while (!this.scanFinished) {
      let { value, done } = this.childIterator.next();

      value = this.columns.reduce(
        (output, columnHeader) => ({
          ...output,
          [columnHeader]: value[columnHeader],
        }),
        {}
      );

      if (done) {
        this.scanFinished = true;
        return { value, done: true };
      }

      return { value, done: false };
    }
  }
};
