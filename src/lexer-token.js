'use strict';

class LexerToken {

    constructor(text, types, startIndex) {
        this.text = text || '';
        this.types = types || [];
        this.startIndex = startIndex;
        this.endIndex = startIndex + text.length - 1;
    }
}

module.exports = LexerToken;
