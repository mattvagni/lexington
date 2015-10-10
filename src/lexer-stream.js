'use strict';

class LexerStream {

    constructor(string) {
        this.string = string;

        this.currentIndex = 0;
        this.currentString = string[0];
    }

    current() {
        return this.currentString;
    }

    next() {
        this.string = this.string.slice(this.currentString.length);
        this.currentIndex += this.currentString.length;

        if (!this.string.length){
            return null;
        }

        this.currentString = this.string[0];
        return true;
    }

    /**
     * Check whether the next bit of the stream matches some regex.
     *
     * Unlike `eat()` this doesn't consume the stream, it just checks whether the stream matches.
     * @param regex
     * @param flags
     * @returns {boolean}
     */
    match(regex, flags) {
        return !!this.string.match(new RegExp('^' + regex, flags))
    }

    /**
     * Eat
     * @param regex
     * @param flags
     * @returns {boolean}
     */
    eat(regex, flags) {
        const match = this.string.match(new RegExp('^' + regex, flags));

        if (!match){
            return false;
        }

        this.currentString = this.string.substr(0, match[0].length);
        return true;
    }
}

module.exports = LexerStream;
