module.exports = class Sort {
  constructor(results, predicate) {
    this.predicate = predicate;
    this.results = results;
  }

  getValues = () => {
    return this.results.sort(this.predicate);
  };
};
