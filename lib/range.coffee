Reference = require('./reference')

# Represents a range or selection of verses
class Range

  constructor: (start, end) ->

    # Ensure they are reference objects
    if not (start instanceof Reference)
      start = new Reference(start)
    if not (end instanceof Reference)
      end = new Reference(end)

    # Ensure we got the ordering right
    if start > end
      [end, start] = [start, end]

    @start = start
    @end = end

  distance: ->
    return {
      verses: @end.toVerseId() - @start.toVerseId()
      chapters: @end.toChapterId() - @start.toChapterId()
      books: @end.toBookId() - @start.toBookId()
    }

  @isRange: (value) ->
    (value instanceof Range) or ('-' in value)


module.exports = Range