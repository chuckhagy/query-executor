const fs = require("fs");

module.exports = class FileScan {
  constructor(dataPath) {
    this.nextIndex = 0;
    this.scannedCount = 0;
    this.data = fs.readFileSync(dataPath);
    this.data = this.data.toString();

    this.inMemParsedData = this.data.split("\r\n");

    this.indexedColumns = this.inMemParsedData.splice(0, 1)[0].split(",");
    this.dataInMemory = this.inMemParsedData.map((row) => {
      const fields = row.split(",");
      const inMemRepresentation = fields.reduce(
        (accum, field, i) => ({ ...accum, [this.indexedColumns[i]]: field }),
        {}
      );

      return inMemRepresentation;
    });
  }

  next() {
    if (this.nextIndex === 0) {
    }
    let output;
    const found = this.dataInMemory[this.nextIndex];

    if (found !== undefined) {
      output = { value: this.dataInMemory[this.nextIndex], done: false };
      this.scannedCount = this.scannedCount + 1;
      this.nextIndex = this.nextIndex + 1;
    } else {
      output = { value: this.scannedCount, done: true };
    }
    return output;
  }
};
