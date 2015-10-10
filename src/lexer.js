'use strict';

const LexerStream = require('./lexer-stream');
const LexerToken = require('./lexer-token');

class Lexer {

    constructor(string, lexerFunction) {
        this.tokens = [];

        const stream = new LexerStream(string);
        const state = {};

        let hasNext = true;

        while (hasNext) {
            const types = lexerFunction(stream, state) || [];
            const text = stream.current();
            const startIndex = stream.currentIndex;
            this.tokens.push(new LexerToken(text, types, startIndex));
            hasNext = stream.next();
        }
    }

    getTokens(){
        return this.tokens;
    }
}

module.exports = Lexer;
