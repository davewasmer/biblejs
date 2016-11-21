books = require('./books')
Range = require('./range')

# Internally, no strings are stored - only numbers. 
# 
# "id"s are UIDs, numbers are relative to parent unit; e.g. 
#   Mark 2 and James 2 have different ids, but the same number.

class Reference

  # Create a reference from another reference, a plain object, or a string
  constructor: (referenceString) ->

    # Direct object creation
    hasBook = typeof referenceString?.book is 'number'
    hasChapter = typeof referenceString?.chapter is 'number'
    validVerseIfPresent = not referenceString?.verse? or (typeof referenceString?.verse is 'number')
    if hasBook and hasChapter and validVerseIfPresent
      @book = referenceString.book
      @chapter = referenceString.chapter
      @verse = referenceString.verse
      return

    if typeof referenceString isnt 'string'
      throw new Error("Unable to parse #{referenceString}: must be a string")
    if Range.isRange(referenceString)
      throw new Error("Unable to parse #{referenceString}: it appears to be a range, not a single reference. Use new Range(start, end) instead.")

    # Otherwise, must be a string
    referenceString = referenceString.replace(/\./g,'')
    

    # Match up to last letter - thats the book. Everything else is the chapter/verse
    [@src, bookName, chapterAndVerse] = referenceString.match(/(.+[A-Za-z])\s+(.+)/)

    # Lookup the book
    @book = Reference.bookIdFromName(bookName)
    if @book is -1
      throw new Error("Unable to parse #{referenceString}: book name (#{bookName}) not recognized")

    # Split on ":" for chapter and verse. If it's a chapter reference
    # (e.g. John 1) then @verse is undefined
    [ @chapter, @verse ] = chapterAndVerse.split(':')
    @chapter = Number(@chapter)
    @verse = if @verse then Number(@verse) else null


  # Is this a reference to a chapter as a whole, or a specific verse?
  isChapter: ->
    not @verse?

  # Like moment.js startOf - ref.startOf('chapter') sets the ref to the first
  # verse in it's chapter
  startOf: (unit) ->
    switch unit
      when "chapter" 
        @verse = 1
      when "book"
        @verse = 1
        @chapter = 1
    return this

  # Clone to avoid operations by reference to your existing refs
  clone: ->
    new Reference(this)

  # String formatting
  toString: ->
    bookName = books[@book - 1].names[0]
    stringified = bookName + " " + @chapter
    stringified += ":" + @verse if @verse
    return stringified
    
  # Get the verse id for this reference
  toVerseId: ->
    if !@verse
      throw new Error("This Reference has no verse")
    count = 0
    for i in [1...@book]
      count += Reference.versesInBookId(i)
    for i in [1...@chapter]
      count += books[@book - 1].verses[i]
    count += @verse if @verse?
    return count

  # Get the chapter id for this reference
  toChapterId: ->
    count = 0
    for i in [1...@book]
      count += books[i - 1].verses.length
    count += @chapter
    return count

  # Get the book id for this reference
  toBookId: ->
    return @book

  # When doing math, use verse id as the value
  valueOf: ->
    return @toVerseId()

  # Given a string of a book name (shortened or full length), get the book id
  @bookIdFromName: (name) ->
    for book, i in books
      if name.toLowerCase() in (book.names.map (s) -> s.toLowerCase())
        return i + 1
    throw new Error("Unable to find book named \'#{name}\'")

  # Given a book id, get the full length book name
  @bookNameFromId: (id) ->
    if id < 1 || id > 66
      throw new Error("Unable to find book id \'#{id}\'")
    return books[id-1].names[0]

  # Create a Reference from a chapter id
  @fromChapterId: (chapterId) ->
    if chapterId < 1 
      throw new Error("Unable to parse chapterId #{chapterId}: must be greater than 0")
    chaptersRemaining = chapterId
    for book, i in books
      chaptersInNextBook = books[i].verses.length
      if chaptersRemaining - chaptersInNextBook > 0
        chaptersRemaining -= chaptersInNextBook
      else
        return new Reference({book: i + 1, chapter: chaptersRemaining})

  # Create a Reference from a verse id
  @fromVerseId: (verseId) ->
    if verseId < 1 
      throw new Error("Unable to parse verseId #{verseId}: must be greater than 0")
    versesRemaining = verseId
    # Count off each book
    for book, i in books
      versesInNextBook = Reference.versesInBookId(i + 2)
      if versesRemaining - versesInNextBook > 0
        versesRemaining -= versesInNextBook
      else
        # Count off each chapter in remainder book
        for j in [0...Reference.chaptersInBookId(i + 1) - 1]
          versesInNextChapter = book.verses[j]
          if versesRemaining - versesInNextChapter > 0
            versesRemaining -= versesInNextChapter
          else
            return new Reference({book: i + 1, chapter: j + 1, verse: versesRemaining})

  # Get the number of verses in the given book id
  @versesInBookId: (bookId) ->
    if bookId < 1 || bookId > 66
      throw new Error("Unable to parse bookId #{bookId}: must be greater than 0")
    return books[bookId-1].verses.reduce (a, b) -> a + b

  # Get the number of verses in the given chapter id
  @versesInChapterId: (chapterId) ->
    if chapterId < 1 || chapterId > 1189 
      throw new Error("Unable to parse chapterId #{chapterId}: must be greater than 0 and less than 1189")
    for book in books
      if chapterId > book.verses.length
        chapterId -= book.verses.length
      else
        return book.verses[chapterId - 1]

  # Get the number of chapters in the given book id
  @chaptersInBookId: (bookId) ->
    if bookId < 1 || bookId > 66
      throw new Error("Unable to parse bookId #{bookId}: must be greater than 0")
    return books[bookId-1].verses.length

  # Get the number of verses up to the start of the given book id
  @versesUpToBookId: (bookId) ->
    if bookId < 1 || bookId > 66
      throw new Error("Unable to parse bookId #{bookId}: must be greater than 0")
    count = 0
    for i in [1...bookId]
      count += Reference.versesInBookId(i)
    return count

  # Get the number of verses up to the start of the given chapter id
  @versesUpToChapterId: (chapterId) ->
    if chapterId < 1 || chapterId > 1189 
      throw new Error("Unable to parse chapterId #{chapterId}: must be greater than 0 and less than 1189")
    count = 0
    chapter = 1
    for book in books
      for verse in book.verses
        count += verse
        chapter += 1
        return count if chapter is chapterId
    return 0

  # Get the number of chapters up to the start of the given book id
  @chaptersUpToBookId: (bookId) ->
    if bookId < 1 || bookId > 66
      throw new Error("Unable to parse bookId #{bookId}: must be greater than 0")
    count = 0
    for i in [1...bookId]
      count += Reference.chaptersInBookId(i)
    return count


module.exports = Reference