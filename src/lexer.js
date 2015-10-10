'use strict';

const LexerStream = require('./lexer-stream');
const LexerToken = require('./lexer-token');

class Lexer {

    /**
     * @param string The string to 'lex'
     * @param lexerFunction The lexer function that defines how
     *                      you would like the lexer to behave.
     */
    constructor (string, lexerFunction) {
        const stream = new LexerStream(string);
        const state = {};

        let hasNext = true;

        this.tokens = [];

        if (!string.length) {
            return;
        }

        while (hasNext) {
            const types = lexerFunction(stream, state) || [];
            const text = stream.current();
            const startIndex = stream.currentIndex;
            this.tokens.push(new LexerToken(text, types, startIndex));
            hasNext = stream.next();
        }
    }

    /**
     * @returns {Array} An array of LexerTokens
     */
    getTokens () {
        return this.tokens;
    }
}

module.exports = Lexer;
