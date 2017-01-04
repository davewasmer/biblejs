var Reference = require('./reference');

function Range(start, end) {
  // Ensure start and end are reference objects
  if (!(start instanceof Reference)) {
    start = new Reference(start);
  }
  if (!(end instanceof Reference)) {
    end = new Reference(end);
  }

  this.start = start;
  this.end = end;

  // Ensure we got the ordering right
  if (start > end) {
    this.start = end;
    this.end = start;
  }
}

Range.prototype.distance = function distance() {
  return {
    verses: this.end.toVerseId() - this.start.toVerseId(),
    chapters: this.end.toChapterId() - this.start.toChapterId(),
    books: this.end.toBookId() - this.start.toBookId()
  };
};

Range.isRange = function isRange(value) {
  return (value instanceof Range) || value.indexOf('-') > -1;
};


module.exports = Range;
