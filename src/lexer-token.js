'use strict';

class LexerToken {

    /**
     * Constructor to create a LexerToken
     * @param text The text for the token
     * @param types An array of types (strings) for the token.
     * @param startIndex The start index for the token
     */
    constructor (text, types, startIndex) {
        this.text = text || '';
        this.types = types || [];
        this.startIndex = startIndex;
        this.endIndex = startIndex + text.length - 1;
    }
}

module.exports = LexerToken;
