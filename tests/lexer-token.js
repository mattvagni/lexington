'use strict';

const LexerToken = require('../src/lexer-token');
const expect = require('expect.js');

describe('LexerToken', () => {

    describe('.constructor()', () => {

        it('should set the text', () => {
            const token = new LexerToken('AB', ['foo'], 20);
            expect(token.text).to.equal('AB');
        });

        it('should set the types', () => {
            const token = new LexerToken('AB', ['foo'], 20);
            expect(token.types).to.eql(['foo']);
        });

        it('should set the start & end index', () => {
            const token = new LexerToken('AB', ['foo'], 20);
            expect(token.startIndex).to.equal(20);
            expect(token.endIndex).to.equal(21);
        });
    });

});
