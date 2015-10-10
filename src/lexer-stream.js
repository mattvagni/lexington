'use strict';

class LexerStream {

    /**
     * @param string
     */
    constructor (string) {
        this.string = string;
        this.currentIndex = 0;
        this.currentString = string[0];
    }

    /**
     * @returns {string} The current string.
     */
    current () {
        return this.currentString;
    }

    /**
     * Discard the current string and go to the next character.
     * @returns {boolean} Returns a boolean indicating whether there
     *                    was a next character.
     */
    next () {
        this.string = this.string.slice(this.currentString.length);
        this.currentIndex += this.currentString.length;

        if (!this.string.length) {
            return false;
        }

        this.currentString = this.string[0];
        return true;
    }

    /**
     * Check whether the next bit of the stream matches some regex.
     *
     * Unlike `eat()` this doesn't consume the stream, it just checks
     * whether the stream matches.
     * @param regex A regex _string_. (e.g '[a-Z]+' )
     * @param flags Any regex flags (e.g 'i', 'g' etc.)
     * @returns {boolean}
     */
    match (regex, flags) {
        return !!this.string.match(new RegExp(`^(${regex})`, flags));

    }

    /**
     * Eat the stream matching the regex.
     *
     * Unlike `match()` this means that the current string is
     * changed to be whatever was eaten.
     * @param regex A regex _string_. (e.g '[a-Z]+' )
     * @param flags Any regex flags (e.g 'i', 'g' etc.)
     * @returns {boolean}
     */
    eat (regex, flags) {
        const match = this.string.match(new RegExp(`^(${regex})`, flags));

        if (!match) {
            return false;
        }

        this.currentString = this.string.substr(0, match[0].length);
        return true;
    }
}

module.exports = LexerStream;
