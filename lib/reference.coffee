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

    # Otherwise, must be a string
    referenceString = referenceString.replace(/\./g,'')
    if typeof referenceString isnt 'string'
      throw new Error("Unable to parse #{referenceString}: must be a string")
    if Range.isRange(referenceString)
      throw new Error("Unable to parse #{referenceString}: it appears to be a range, not a single reference. Use new Range(start, end) instead.")

    # Match up to last letter - thats the book. Everything else is the chapter/verse
    [@src, bookName, chapterAndVerse] = referenceString.match(/(.+[A-Za-z])\s+(.+)/)

    # Lookup the book
    @book = Reference.bookIdFromName(bookName)
    if @book is -1
      throw new Error("Unable to parse #{referenceString}: book name (#{bookName}) not recognized")

    # Split on ":" for chapter and verse. If it's a chapter reference
    # (e.g. John 1) then @verse is undefined
    [@chapter, @verse] = chapterAndVerse.split(':')


  # Is this a reference to a chapter as a whole, or a specific verse?
  isChapter: ->
    not @verse?

  # Like moment.js startOf - ref.startOf('chapter') sets the ref to the first
  # verse in it's chapter
  startOf: (unit) ->
    switch unit
      when "chapter" then @verse = 1
      when "book"
        @verse = 1
        @chapter = 1

  # Clone to avoid operations by reference to your existing refs
  clone: ->
    new Reference(this)

  # String formatting
  toString: ->
    bookName = books[@book].names[0]
    chapterNumber = @chapter
    verseNumber = if @verse? then ":" + @verse else ""
    return "#{bookName} #{chapterNumber}#{verseNumber}"

  # Get the verse id for this reference
  toVerseId: ->
    count = Reference.versesUpToBookId(@book)
    count += Reference.versesUpToChapterId()
    for i in [1...@book]
      count += Reference.versesInBookId(i)
    for i in [1...@chapter]
      count += books[@book].verses[i - 1]
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
        return i
    return -1

  # Given a book id, get the full length book name
  @bookNameFromId: (id) ->
    return books[i].names[0]

  # Create a Reference from a chapter id
  @fromChapterId: (chapterId) ->
    chaptersRemaining = chapterId
    for book, i in books
      chaptersInNextBook = books[i + 1].verses.length
      if chaptersRemaining - chaptersInNextBook > 0
        chaptersRemaining -= chaptersInNextBook
      else
        new Reference({book: i, chapter: chaptersRemaining})

  # Create a Reference from a verse id
  @fromVerseId: (verseId) ->
    versesRemaining = verseId
    # Count off each book
    for book, i in books
      versesInNextBook = Reference.versesInBookId(i + 2)
      if versesRemaining - versesInNextBook > 0
        versesRemaining -= versesInNextBook
      else
        # Count off each chapter in remainder book
        for j in [0...Reference.chaptersInBookId(i) - 1]
          versesInNextChapter = book.verses[j]
          if versesRemaining - versesInNextChapter > 0
            versesRemaining -= versesInNextChapter
          else
            new Reference({book: i, chapter: j, verse: versesRemaining})

  # Get the number of verses in the given book id
  @versesInBookId: (bookId) ->
    return books[bookId].verses.reduce((a, b) -> a + b)

  # Get the number of chapters in the given book id
  @chaptersInBookId: (bookId) ->
    return books[bookId].verses.length

  # Get the number of verses up to the start of the given book id
  @versesUpToBookId: (bookId) ->
    count = 0
    for i in [1...bookId]
      count += Reference.versesInBookId(i)
    return count

  # Get the number of verses up to the start of the given chapter id
  @versesUpToChapterId: (chapterId) ->
    count = 0
    chapter = 1
    for book in books
      for verse in book.verses
        count += verse
        chapter += 1
        return count if chapter is chapterId

  # Get the number of chapters up to the start of the given book id
  @chaptersUpToBookId: (bookId) ->
    count = 0
    for i in [1...bookId]
      count += Reference.chaptersInBookId(i)
    return count


module.exports = Reference