# bible.js

bible.js is a JavaScript package for both Node and the browser (via Bower) for handling Bible references. It can:

  * parse textual references into a standard, index based format
  * convert a textual reference to an absolute verse number
  * convert an absolute verse number to its textual reference
  * handle chapter references
  * handle ranges (e.g. John 3:1-16) (WIP)

# Installation

**node**

    npm install --save biblejs

# Usage

The `biblejs` module exposes three top level exports:

  const Bible = require('biblejs');
  let Reference = Bible.Reference // A class representing a single verse or chapter
  let Range = Bible.Range // A class representing a range of verses
  let Books = Bible.Books // A reference array containing data on the names and number of chapters/verses for each book in the Bible


## Reference

A `Reference` instance represents a reference to a specific Bible verse, or an entire chapter.

    var ref = new Reference("John 3:16");
    // returns a Reference instance for "John 3:16"

### Instance Methods

### isChapter()
Returns true if the reference is to an entire chapter rather than a specific verse

    var chapter = new Reference("John 1");
    var verse = new Reference("John 1:1");

    chapter.isChapter() // true
    verse.isChapter() // false


### startOf('book|chapter')
Modifies the reference in place (doesn't create a new one!), moving the reference to the start of the book or chapter.

    var ref = new Reference("John 3:16");

    ref.startOf('chapter').toString() // "John 3:1"
    ref.startOf('book').toString() // "John 1:1"


### clone()
Create a new Reference object of the same verse. Useful if you want to perform in-place mutations to the Reference (i.e. `.startOf()`) but want to retain the original reference as well.

### toString()
Returns the textual representation of the reference. Right now, this only supports full book names. Future versions will likely include a format argument to determine the format of the returned string (PR's welcome!).

    Reference.fromVerseId(1).toString() // "Genesis 1:1"

### toVerseId()
Returns the verse id (i.e. the number of the verse if you started from Genesis 1:1 and counted up to it).

    var ref = new Reference("Genesis 1:1");
    ref.toVerseId() // 1

### #toChapterId()
Returns the chapter id (i.e. the number of the chapter if you started from Genesis 1 and counted up to it).

    var ref = new Reference("Genesis 7");
    ref.toChapterId() // 7


### #toBookId()
Returns the book id (i.e. the number of the book if you started from Genesis and counted up to it).

    var ref = new Reference("Exodus");
    ref.toBookId() // 2

### Static Methods
The static methods found on the Reference class are useful for creating References from something other than a string (i.e. a verse or chapter id), as well as some utility methods for performing reference math.

### Reference.bookIdFromName(name)
Returns the book id given a book name. Handles most common book abbreviations.

    Reference.bookIdFromName("Genesis") // 1
    Reference.bookIdFromName("Gen") // 1
    Reference.bookIdFromName("Exo") // 2

#### `Reference.bookNameFromId(id)`
Get the name of the book of the Bible that matches the given id:

    Reference.bookNameFromId(1) // "Genesis"

#### Reference.fromChapterId(chapterId) {
Parse a chapter id into a reference. A chapter id is the 1-indexed absolute number of the chapter.

    Reference.fromChapterId(1) // Genesis 1

#### Reference.fromVerseId(verseId) {
Parse a verse id into a reference. A verse id is 1-indexed absolute number of the verse (i.e. Genesis 2:1's verse id is 32, because Genesis 1 has 31 verses).

    Reference.fromVerseId(1) // Genesis 1:1

#### Reference.versesInBookId(bookId) {
Get the number of verses in the given book id

    // How many verses are in all of Genesis?
    Reference.versesInBookId(1) // 1533

#### Reference.versesInChapterId(chapterId) {
Get the number of verses in the given chapter id

    // How many verses are in Genesis 1?
    Reference.versesInChapterId(1) // 31

#### Reference.chaptersInBookId(bookId) {
Get the number of chapters in the given book id

    // How many chapters are in Genesis?
    Reference.chaptersInBookId(1) // 50

#### Reference.versesUpToBookId(bookId) {
Get the number of verses up to the start of the given book id

    // How many verses are there in all the books before Exodus?
    Reference.versesUpToBookId(2) // 1533

#### Reference.versesUpToChapterId(chapterId) {
Get the number of verses up to the start of the given chapter id

    // How many verses are there in all the books before Exodus 2?
    Reference.versesUpToChapterId(51) // 1555

#### Reference.chaptersUpToBookId(bookId) {
Get the number of chapters up to the start of the given book id

    // How many chapters are there in all the books before Exodus?
    Reference.chaptersUpToBookId(2) // 50

### Reference.bookNameFromId(id)
Returns the full book name given a book id.

    Reference.bookNameFromId(1) // "Genesis"
    Reference.bookNameFromId(2) // "Exodus"


## Range
A `Range` instance represents a reference to a range of Bible verses. Internally, this is represented as to Reference objects that track the start and end of the range of verses.

    var start = new Reference('Genesis 1:1');
    var start = new Reference('Genesis 2:1');
    var range = new Range(start, end);
    // returns a Range instance that represents Genesis 1:1-2:1

### Instance Methods

#### distance()
Calculates the "distance" the Range covers. Returns an object that includes the number of verses, chapters, and books in the Range:

    var start = new Reference('Genesis 1:1');
    var start = new Reference('Exodus 1:1');
    var range = new Range(start, end);
    range.distance(); // { verses: 1533, chapters: 50, books: 1 }

A book or chapter is consided "in" the range if it's entire contents are. So Genesis 1:1 - Exodus 2:1 only has 1 book in the range, but has 51 chapters in the range (since all of Exodus is *not* in the range, but all of Exodus 1 *is* in the range).


## Books
This is a reference data array that includes the common names and their variants and abbreviations of each book of the Bible, along with the number of chapters in each book, and the number of verses in each chapter.
