# bible.js

bible.js is a JavaScript package for both Node and the browser (via Bower) for handling Bible references. It can:

  * parse textual references into a standard, index based format
  * convert a textual reference to an absolute verse number
  * convert an absolute verse number to it's textual reference
  * handle chapter references
  * handle ranges (e.g. John 3:1-16) (WIP)

# Installation

**node**
    
    npm install --save biblejs

**bower**

    bower install --save biblejs

*NOTE* the bower version is distributed with minified and unminified versions, and bundled via UMD to allow use via globals, AMD modules, etc.

# Usage

## Creating a Reference

### new Reference(referenceString)
Parse a textual reference

    var Reference = require('bible').Reference;
    var refString = "John 3:16";
    
    var ref = new Reference(refString);
    // returns a Reference instance for "John 3:16"


### Reference.fromVerseId(id)
Parse a verse id into a reference

    var Reference = require('bible').Reference;
    var verseId = 1;
    
    var ref = Reference.fromVerseId(verseId);
    // returns a Reference instance for "Genesis 1:1"


### Reference.fromVerseId(id)
Parse a chapter id into a reference.

    var Reference = require('bible').Reference;
    var chapterId = 1;
    
    var ref = Reference.fromChapterId(chapterId);
    // returns a Reference instance for "Genesis 1"


## Instance Methods

### #isChapter()
Returns true if the reference is to an entire chapter rather than a specific verse

    var chapter = new Reference("John 1");
    var verse = new Reference("John 1:1");
    
    chapter.isChapter() // true
    verse.isChapter() // false


### #startOf('book|chapter')
Modifies the reference in place (doesn't create a new one!), moving the reference to the start of the book or chapter.

    var ref = new Reference("John 3:16");
    
    ref.startOf('chapter').toString() // "John 3:1"
    ref.startOf('book').toString() // "John 1:1"


### #clone()
Create a new Reference object of the same verse


### #toString()
Returns the textual representation of the reference. Right now, this only supports full book names. Future versions will likely include a format argument to determine the format of the returned string (PR's welcome!).
    
    Reference.fromVerseId(1).toString() // "Genesis 1:1"


### #toVerseId()
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


# Lookups

### Reference.bookIdFromName(name)
Returns the book id given a book name. Handles most common book abbreviations.

    Reference.bookIdFromName("Genesis") // 1
    Reference.bookIdFromName("Gen") // 1
    Reference.bookIdFromName("Exo") // 2

### Reference.bookNameFromId(id)
Returns the full book name given a book id.

    Reference.bookNameFromId(1) // "Genesis"
    Reference.bookNameFromId(2) // "Exodus"


### Reference.versesInBookId(id)
Returns the number of verses in the given book id.
    
    // Genesis has 1,213 verses
    Reference.versesInBookId(1) // 1213


### Reference.chaptersInBookId(id)
Returns the number of chapters in the given book id.

    // Genesis has 40 chapters
    Reference.chaptersInBookId(1) // 40


### Reference.versesUpToBookId(id)
Returns the number of verses in all the books prior to the given book id.

    // All the books before Leveticus (Genesis and Exodus) have 2,072 verses
    Reference.versesUpToBookId(3) // 2072


### Reference.versesUpToChapterId(id)
Returns the number of verses in all the chapters prior to the given chapter id.

    // Genesis 1 has 31 verses
    Reference.versesUpToChapterId(2) // 31


### Reference.chaptersUpToBookId(id)
Returns the number of chapters in all the books prior to the given book id.

    // All the books before Leveticus (Genesis and Exodus) have 67 chapters
    Reference.chaptersUpToBookId(3) // 67


