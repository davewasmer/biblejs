'use strict';

var expect = require('chai').expect;
var Reference = require('../index').Reference;

var validString = 'John 3:16'

describe('Reference', function() {
	describe('new Reference(referenceString)', function() {
		it('should create a reference object from a valid string construction', function() {
	        var ref = new Reference('John 3:16');
	        expect(ref).to.be.an('object');
	    });

	    it('should throw an error from invalid type passed to constructor', function() {
	        var refFn = function () {return new Reference(123)};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('Reference.fromVerseId(id)', function() {
		it('should create a reference object from a valid verse number', function() {
	        var ref = Reference.fromVerseId(4);
	        expect(ref.toString()).to.equal('Genesis 1:4');
	    });

	    it('should throw an error from invalid number passed to constructor', function() {
	        var refFn = function () {return Reference.fromVerseId(-4);};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('Reference.fromChapterId(id)', function() {
		it('should create a reference object from a valid chapter number', function() {
	        var ref = Reference.fromChapterId(4);
	        expect(ref.toString()).to.equal('Genesis 4');
	    });

	    it('should throw an error from invalid number passed to constructor', function() {
	        var refFn = function () {return Reference.fromChapterId(-4);};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('#.isChapter()', function() {
		it('should return true if the reference does not contain a verse', function() {
	        var ref = new Reference("John 1");
	        expect(ref.isChapter()).to.equal(true);
	    });

	    it('should return false if the reference contains a verse', function() {
	        var ref = new Reference("John 1:6");
	        expect(ref.isChapter()).to.equal(false);
	    });
	});

	describe('#startOf(\'book|chapter\')', function() {
		it('should modify the reference to refer to the start of the chapter if \'chapter\' is passed', function() {
	        var ref = new Reference('John 3:16');
	        expect(ref.startOf('chapter').toString()).to.equal('John 3:1');
	    });

	    it('should modify the reference to refer to the start of the book if \'book\' is passed', function() {
	        var ref = new Reference('John 3:16');
	        expect(ref.startOf('book').toString()).to.equal('John 1:1');
	    });
	});

	describe('#clone()', function() {
		it('should return a new Reference object to the same reference', function() {
	        var ref = new Reference('John 3:16');
	        var newRef = ref.clone();
	        newRef.startOf('book');
	        expect(ref.toString()).to.equal('John 3:16');
	    });
	});
	
	describe('#toString()', function() {
		it('should return the textual representation of the Reference', function() {
	        var ref = new Reference('John 3:16');
	        expect(ref.toString()).to.equal('John 3:16');
	    });
	});

	describe('#toVerseId()', function() {
		it('should return the verse id', function() {
	        var ref = new Reference('Genesis 1:16');
	        expect(ref.toVerseId()).to.equal(16);
	    });
	});

	describe('#toChapterId()', function() {
		it('should return the chapter id', function() {
	        var ref = new Reference('Exodus 6:16');
	        expect(ref.toChapterId()).to.equal(56);
	    });
	});

	describe('#toBookId()', function() {
		it('should return the book id', function() {
	        var ref = new Reference('Exodus 6:16');
	        expect(ref.toBookId()).to.equal(2);
	    });
	});

	describe('Reference.bookIdFromName(name)', function() {
		it('should return the book id given a book name', function() {
	        expect(Reference.bookIdFromName('Genesis')).to.equal(1);
	    });

	    it('should throw an error given an invalid book name', function() {
	    	var refFn = function () {return Reference.bookIdFromName('Hezekiah')};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('Reference.bookNameFromId(id)', function() {
		it('should return the book name given a book id', function() {
	        expect(Reference.bookNameFromId(1)).to.equal('Genesis');
	    });

	    it('should throw an error given an invalid book id', function() {
	        var refFn = function () {return Reference.bookNameFromId(-1)};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('Reference.versesInBookId(id)', function() {
		it('should return the number of verses in the given book id', function() {
	        expect(Reference.versesInBookId(1)).to.equal(1533);
	    });

	    it('should throw an error given an invalid book id', function() {
	        var refFn = function () {return Reference.versesInBookId(-1)};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('Reference.versesInChapterId(id)', function() {
		it('should return the number of verses in the given chapter id', function() {
	        expect(Reference.versesInChapterId(1)).to.equal(31);
	    });

	    it('should throw an error given an invalid chapter id', function() {
	        var refFn = function () {return Reference.versesInChapterId(0)};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('Reference.chaptersInBookId(id)', function() {
		it('should return the number of chapters in the given book id', function() {
	        expect(Reference.chaptersInBookId(1)).to.equal(50);
	    });

	    it('should throw an error given an invalid book id', function() {
	        var refFn = function () {return Reference.chaptersInBookId(67)};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('Reference.versesUpToBookId(id)', function() {
		it('should return the number of verses in all the books prior to the given book id', function() {
	        expect(Reference.versesUpToBookId(3)).to.equal(2746);
	    });

	    it('should throw an error given an invalid book id', function() {
	        var refFn = function () {return Reference.versesUpToBookId(67)};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('Reference.versesUpToChapterId(id)', function() {
		it('should return the number of verses in all the books prior to the given chapter id', function() {
	        expect(Reference.versesUpToChapterId(2)).to.equal(31);
	    });

	    it('should throw an error given an invalid chapter id', function() {
	        var refFn = function () {return Reference.versesUpToChapterId(1190)};
	        expect(refFn).to.throw(Error);
	    });
	});

	describe('Reference.chaptersUpToBookId(id)', function() {
		it('should return the number of chapters in all the books prior to the given book id', function() {
	        expect(Reference.chaptersUpToBookId(3)).to.equal(90);
	    });

	    it('should throw an error given an invalid book id', function() {
	        var refFn = function () {return Reference.chaptersUpToBookId(67)};
	        expect(refFn).to.throw(Error);
	    });
	});

    

/* TODO
    it('should throw an error from invalid range string construction', function() {
        var refFn = function () {console.log(new Reference('John 54:21'))};
        expect(refFn).to.throw(Error);
    });
*/

});