'use strict';

const LexerStream = require('../src/lexer-stream');
const expect = require('expect.js');


describe('LexerStream', ()=> {

    describe('.eat(regex, flag)', ()=> {

        it('should return true if the regex matches', ()=> {
            const l = new LexerStream('aaa bbb ccc');
            expect(l.current()).to.equal('a');
            expect(l.eat('b+')).to.not.be.ok();
            expect(l.eat('a+')).to.be.ok();
        });

        it('should respect regex flags', ()=> {
            const l = new LexerStream('aaa bbb ccc');
            expect(l.eat('A+')).to.not.be.ok();
            expect(l.eat('A+', 'i')).to.be.ok();
        });

        it('should eat/consume anything that matches', ()=> {
            const l = new LexerStream('aaabbbcccddd');
            expect(l.current()).to.equal('a');
            l.eat('a+');
            expect(l.current()).to.equal('aaa');
        });

    });

    describe('.next()', ()=> {

        it('should go to the next character', ()=> {
            const l = new LexerStream('123');
            expect(l.current()).to.equal('1');
            l.next();
            expect(l.current()).to.equal('2');
            l.next();
            expect(l.current()).to.equal('3');
        });

        it('should return null if there is no next character', ()=> {
            const l = new LexerStream('12');
            expect(l.current()).to.equal('1');
            l.next();
            expect(l.current()).to.equal('2');
            expect(l.next()).to.equal(null);
        });
    });

});
