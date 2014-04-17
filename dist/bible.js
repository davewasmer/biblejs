!function(e){if("object"==typeof exports)module.exports=e();else if("function"==typeof define&&define.amd)define(e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.bible=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
_dereq_('coffee-script/register')
module.exports = {
  Reference: _dereq_('./lib/reference'),
  Range: _dereq_('./lib/range'),
  Books: _dereq_('./lib/books')
};
},{"./lib/books":2,"./lib/range":3,"./lib/reference":4,"coffee-script/register":5}],2:[function(_dereq_,module,exports){
var ordinals;

ordinals = function(number, names) {
  var name, numeral, numerals, ordinalized, _i, _j, _len, _len1;
  ordinalized = [];
  switch (number) {
    case 1:
      numerals = ['1', 'I', 'First'];
      break;
    case 2:
      numerals = ['2', 'II', 'Second'];
      break;
    case 3:
      numerals = ['3', 'III', 'Third'];
  }
  for (_i = 0, _len = names.length; _i < _len; _i++) {
    name = names[_i];
    for (_j = 0, _len1 = numerals.length; _j < _len1; _j++) {
      numeral = numerals[_j];
      ordinalized.push("" + numeral + name);
      ordinalized.push("" + numeral + " " + name);
    }
  }
  return ordinalized;
};

module.exports = [
  {
    names: 'Genesis Ge Gen'.split(' '),
    verses: [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26]
  }, {
    names: 'Exodus Ex Exo'.split(' '),
    verses: [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38]
  }, {
    names: 'Leviticus Le Lev'.split(' '),
    verses: [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34]
  }, {
    names: 'Numbers Nu Num'.split(' '),
    verses: [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13]
  }, {
    names: 'Deuteronomy Dt Deut Deu De'.split(' '),
    verses: [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12]
  }, {
    names: 'Joshua Js Jos Jos Josh'.split(' '),
    verses: [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33]
  }, {
    names: 'Judges Jg Jud Jdg Ju Jdgs Judg'.split(' '),
    verses: [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25]
  }, {
    names: 'Ruth Ru Rut'.split(' '),
    verses: [22, 23, 18, 22]
  }, {
    names: ordinals(1, 'Samuel Sa Sam'.split(' ')),
    verses: [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13]
  }, {
    names: ordinals(2, 'Samuel Sa Sam'.split(' ')),
    verses: [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25]
  }, {
    names: ordinals(1, 'Kings Ki King Kin Kngs'.split(' ')),
    verses: [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53]
  }, {
    names: ordinals(2, 'Kings Ki King Kin Kngs'.split(' ')),
    verses: [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30]
  }, {
    names: ordinals(1, 'Chronicles Ch Chr'.split(' ')),
    verses: [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30]
  }, {
    names: ordinals(2, 'Chronicles Ch Chr'.split(' ')),
    verses: [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23]
  }, {
    names: 'Ezra Ez Ezr'.split(' '),
    verses: [11, 70, 13, 24, 17, 22, 28, 36, 15, 44]
  }, {
    names: 'Nehemiah Ne Neh Neh Ne'.split(' '),
    verses: [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31]
  }, {
    names: 'Esther Es Est Esth Ester'.split(' '),
    verses: [22, 23, 15, 17, 14, 14, 10, 17, 32, 3]
  }, {
    names: 'Job Jb Job'.split(' '),
    verses: [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17]
  }, {
    names: 'Psalm Ps Psa Pss'.split(' '),
    verses: [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6]
  }, {
    names: 'Proverbs Pr Prov Pro'.split(' '),
    verses: [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31]
  }, {
    names: 'Ecclesiastes Ec Ecc'.split(' '),
    verses: [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14]
  }, {
    names: ['Song of Solomon', 'SOS', 'Song of Songs', 'SongOfSongs'],
    verses: [17, 17, 11, 16, 16, 13, 13, 14]
  }, {
    names: 'Isaiah Isa'.split(' '),
    verses: [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24]
  }, {
    names: 'Jeremiah Je Jer'.split(' '),
    verses: [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34]
  }, {
    names: 'Lamentations La Lam Lament'.split(' '),
    verses: [22, 22, 66, 22, 22]
  }, {
    names: 'Ezekiel Ek Ezek Eze'.split(' '),
    verses: [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35]
  }, {
    names: 'Daniel Da Dan Dl Dnl'.split(' '),
    verses: [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13]
  }, {
    names: 'Hosea Ho Hos'.split(' '),
    verses: [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9]
  }, {
    names: 'Joel Jl Joel Joe'.split(' '),
    verses: [20, 32, 21]
  }, {
    names: 'Amos Am Amos Amo'.split(' '),
    verses: [15, 16, 15, 13, 27, 14, 17, 14, 15]
  }, {
    names: 'Obadiah Ob Oba Obd Odbh'.split(' '),
    verses: [21]
  }, {
    names: 'Jonah Jh Jon Jnh'.split(' '),
    verses: [17, 10, 10, 11]
  }, {
    names: 'Micah Mi Mic'.split(' '),
    verses: [16, 13, 12, 13, 15, 16, 20]
  }, {
    names: 'Nahum Na Nah Na'.split(' '),
    verses: [15, 13, 19]
  }, {
    names: 'Habakkuk Hb Hab Hk Habk'.split(' '),
    verses: [17, 20, 19]
  }, {
    names: 'Zephaniah Zp Zep Zeph Ze'.split(' '),
    verses: [18, 15, 20]
  }, {
    names: 'Haggai Ha Hag Hagg'.split(' '),
    verses: [15, 23]
  }, {
    names: 'Zechariah Zc Zech Zec'.split(' '),
    verses: [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21]
  }, {
    names: 'Malachi Ml Mal Mlc'.split(' '),
    verses: [14, 17, 18, 6]
  }, {
    names: 'Matthew Mt Matt Mat'.split(' '),
    verses: [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20]
  }, {
    names: 'Mark Mk Mrk'.split(' '),
    verses: [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20]
  }, {
    names: 'Luke Lk Luk Lu'.split(' '),
    verses: [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53]
  }, {
    names: 'John Jn Joh Jo'.split(' '),
    verses: [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25]
  }, {
    names: 'Acts Ac Act'.split(' '),
    verses: [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31]
  }, {
    names: 'Romans Ro Rom Rmn Rmns'.split(' '),
    verses: [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27]
  }, {
    names: ordinals(1, 'Corinthians Co Cor'.split(' ')),
    verses: [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24]
  }, {
    names: ordinals(2, 'Corinthians Co Cor'.split(' ')),
    verses: [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14]
  }, {
    names: 'Galatians Ga Gal Gltns'.split(' '),
    verses: [24, 21, 29, 31, 26, 18]
  }, {
    names: 'Ephesians Ep Eph Ephn'.split(' '),
    verses: [23, 22, 21, 32, 33, 24]
  }, {
    names: 'Philippians Phi Phil Phi'.split(' '),
    verses: [30, 30, 21, 23]
  }, {
    names: 'Colossians Co Col Colo Cln Clns'.split(' '),
    verses: [29, 23, 25, 18]
  }, {
    names: ordinals(1, 'Thessalonians Th Thess Thes'.split(' ')),
    verses: [10, 20, 13, 18, 28]
  }, {
    names: ordinals(2, 'Thessalonians Th Thess Thes'.split(' ')),
    verses: [12, 17, 18]
  }, {
    names: ordinals(1, 'Timothy Ti Tim'.split(' ')),
    verses: [20, 15, 16, 16, 25, 21]
  }, {
    names: ordinals(2, 'Timothy Ti Tim'.split(' ')),
    verses: [18, 26, 17, 22]
  }, {
    names: 'Titus Ti Tit Tt Ts'.split(' '),
    verses: [16, 15, 15]
  }, {
    names: 'Philemon Pm Phile Philm Pm'.split(' '),
    verses: [25]
  }, {
    names: 'Hebrews He Heb Hw'.split(' '),
    verses: [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25]
  }, {
    names: 'James Jm Jam Jas Ja'.split(' '),
    verses: [27, 26, 18, 17, 20]
  }, {
    names: ordinals(1, 'Peter Pe Pet P'.split(' ')),
    verses: [25, 25, 22, 19, 14]
  }, {
    names: ordinals(2, 'Peter Pe Pet P'.split(' ')),
    verses: [21, 22, 18]
  }, {
    names: ordinals(1, 'John Joh Jo Jn J'.split(' ')),
    verses: [10, 29, 24, 21, 21]
  }, {
    names: ordinals(2, 'John Joh Jo Jn J'.split(' ')),
    verses: [13]
  }, {
    names: ordinals(3, 'John Joh Jo Jn J'.split(' ')),
    verses: [14]
  }, {
    names: 'Jude Jude'.split(' '),
    verses: [25]
  }, {
    names: 'Revelation Re Rev Rvltn'.split(' '),
    verses: [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 20]
  }
];


},{}],3:[function(_dereq_,module,exports){
var Range, Reference,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Reference = _dereq_('./reference');

Range = (function() {
  function Range(start, end) {
    var _ref;
    if (!(start instanceof Reference)) {
      start = new Reference(start);
    }
    if (!(end instanceof Reference)) {
      end = new Reference(end);
    }
    if (start > end) {
      _ref = [start, end], end = _ref[0], start = _ref[1];
    }
    this.start = start;
    this.end = end;
  }

  Range.prototype.distance = function() {
    return {
      verses: this.end.toVerseId() - this.start.toVerseId(),
      chapters: this.end.toChapterId() - this.start.toChapterId(),
      books: this.end.toBookId() - this.start.toBookId()
    };
  };

  Range.isRange = function(value) {
    return (value instanceof Range) || (__indexOf.call(value, '-') >= 0);
  };

  return Range;

})();

module.exports = Range;


},{"./reference":4}],4:[function(_dereq_,module,exports){
var Range, Reference, books,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

books = _dereq_('./books');

Range = _dereq_('./range');

Reference = (function() {
  function Reference(referenceString) {
    var bookName, chapterAndVerse, hasBook, hasChapter, validVerseIfPresent, _ref, _ref1;
    hasBook = typeof (referenceString != null ? referenceString.book : void 0) === 'number';
    hasChapter = typeof (referenceString != null ? referenceString.chapter : void 0) === 'number';
    validVerseIfPresent = ((referenceString != null ? referenceString.verse : void 0) == null) || (typeof (referenceString != null ? referenceString.verse : void 0) === 'number');
    if (hasBook && hasChapter && validVerseIfPresent) {
      this.book = referenceString.book;
      this.chapter = referenceString.chapter;
      this.verse = referenceString.verse;
      return;
    }
    if (typeof referenceString !== 'string') {
      throw new Error("Unable to parse " + referenceString + ": must be a string");
    }
    if (Range.isRange(referenceString)) {
      throw new Error("Unable to parse " + referenceString + ": it appears to be a range, not a single reference. Use new Range(start, end) instead.");
    }
    _ref = referenceString.match(/(.+[A-Za-z])\s+(.+)/), this.src = _ref[0], bookName = _ref[1], chapterAndVerse = _ref[2];
    this.book = Reference.bookIdFromName(bookName);
    if (this.book === -1) {
      throw new Error("Unable to parse " + referenceString + ": book name (" + bookName + ") not recognized");
    }
    _ref1 = chapterAndVerse.split(':'), this.chapter = _ref1[0], this.verse = _ref1[1];
  }

  Reference.prototype.isChapter = function() {
    return this.verse == null;
  };

  Reference.prototype.startOf = function(unit) {
    switch (unit) {
      case "chapter":
        return this.verse = 1;
      case "book":
        this.verse = 1;
        return this.chapter = 1;
    }
  };

  Reference.prototype.clone = function() {
    return new Reference(this);
  };

  Reference.prototype.toString = function() {
    var bookName, chapterNumber, verseNumber;
    bookName = books[this.book].names[0];
    chapterNumber = this.chapter;
    verseNumber = this.verse;
    return "" + bookName + " " + chapterNumber + ":" + verseNumber;
  };

  Reference.prototype.toVerseId = function() {
    var count, i, _i, _j, _ref, _ref1;
    count = Reference.versesUpToBookId(this.book);
    count += Reference.versesUpToChapterId();
    for (i = _i = 1, _ref = this.book; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
      count += Reference.versesInBookId(i);
    }
    for (i = _j = 1, _ref1 = this.chapter; 1 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 1 <= _ref1 ? ++_j : --_j) {
      count += books[this.book].verses[i - 1];
    }
    if (this.verse != null) {
      count += this.verse;
    }
    return count;
  };

  Reference.prototype.toChapterId = function() {
    var count, i, _i, _ref;
    count = 0;
    for (i = _i = 1, _ref = this.book; 1 <= _ref ? _i < _ref : _i > _ref; i = 1 <= _ref ? ++_i : --_i) {
      count += books[i - 1].verses.length;
    }
    count += this.chapter;
    return count;
  };

  Reference.prototype.toBookId = function() {
    return this.book;
  };

  Reference.prototype.valueOf = function() {
    return this.toVerseId();
  };

  Reference.bookIdFromName = function(name) {
    var book, i, _i, _len;
    for (i = _i = 0, _len = books.length; _i < _len; i = ++_i) {
      book = books[i];
      if (__indexOf.call(book.names, name) >= 0) {
        return i + 1;
      }
    }
    return -1;
  };

  Reference.bookNameFromId = function(id) {
    return books[i].names[0];
  };

  Reference.fromChapterId = function(chapterId) {
    var book, chaptersInNextBook, chaptersRemaining, i, _i, _len, _results;
    chaptersRemaining = chapterId;
    _results = [];
    for (i = _i = 0, _len = books.length; _i < _len; i = ++_i) {
      book = books[i];
      chaptersInNextBook = books[i + 1].verses.length;
      if (chaptersRemaining - chaptersInNextBook > 0) {
        _results.push(chaptersRemaining -= chaptersInNextBook);
      } else {
        _results.push(new Reference({
          book: i,
          chapter: chaptersRemaining
        }));
      }
    }
    return _results;
  };

  Reference.fromVerseId = function(verseId) {
    var book, i, j, versesInNextBook, versesInNextChapter, versesRemaining, _i, _len, _results;
    versesRemaining = verseId;
    _results = [];
    for (i = _i = 0, _len = books.length; _i < _len; i = ++_i) {
      book = books[i];
      versesInNextBook = Reference.versesInBookId(i + 2);
      if (versesRemaining - versesInNextBook > 0) {
        _results.push(versesRemaining -= versesInNextBook);
      } else {
        _results.push((function() {
          var _j, _ref, _results1;
          _results1 = [];
          for (j = _j = 0, _ref = Reference.chaptersInBookId(i) - 1; 0 <= _ref ? _j < _ref : _j > _ref; j = 0 <= _ref ? ++_j : --_j) {
            versesInNextChapter = book.verses[j];
            if (versesRemaining - versesInNextChapter > 0) {
              _results1.push(versesRemaining -= versesInNextChapter);
            } else {
              _results1.push(new Reference({
                book: i,
                chapter: j,
                verse: versesRemaining
              }));
            }
          }
          return _results1;
        })());
      }
    }
    return _results;
  };

  Reference.versesInBookId = function(bookId) {
    return books[bookId].verses.reduce(function(a, b) {
      return a + b;
    });
  };

  Reference.chaptersInBookId = function(bookId) {
    return books[bookId].verses.length;
  };

  Reference.versesUpToBookId = function(bookId) {
    var count, i, _i;
    count = 0;
    for (i = _i = 1; 1 <= bookId ? _i < bookId : _i > bookId; i = 1 <= bookId ? ++_i : --_i) {
      count += Reference.versesInBookId(i);
    }
    return count;
  };

  Reference.versesUpToChapterId = function(chapterId) {
    var book, chapter, count, verse, _i, _j, _len, _len1, _ref;
    count = 0;
    chapter = 1;
    for (_i = 0, _len = books.length; _i < _len; _i++) {
      book = books[_i];
      _ref = book.verses;
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        verse = _ref[_j];
        count += verse;
        chapter += 1;
        if (chapter === chapterId) {
          return count;
        }
      }
    }
  };

  Reference.chaptersUpToBookId = function(bookId) {
    var count, i, _i;
    count = 0;
    for (i = _i = 1; 1 <= bookId ? _i < bookId : _i > bookId; i = 1 <= bookId ? ++_i : --_i) {
      count += Reference.chaptersInBookId(i);
    }
    return count;
  };

  return Reference;

})();

module.exports = Reference;


},{"./books":2,"./range":3}],5:[function(_dereq_,module,exports){

},{}]},{},[1])
(1)
});;