[![Build Status](https://travis-ci.org/mattvagni/lexington.svg?branch=master)](https://travis-ci.org/mattvagni/lexington) 
# lexington
Lexington is a simple library to transform some text into a flat list of tokens.

## Installation
`npm install lexington`

## Example Usage
```js

var Lexington = require('Lexington');

var lexer = new Lexington('Synergy lol wut hahahaa', (stream, state) => {

    if (stream.eat('synergy|cloud|greenshoots', 'i')){
        return ['buzzword'];
    }

    if (stream.eat('[ha]{2,}([^\w]|$)', 'i')){
        return ['laughter'];
    }

    if (stream.eat('[a-zA-Z0-9]+')){
        return ['word'];
    }

    if (stream.eat('[\\s]+')){
        return ['whitespace'];
    }

    return ['other']
});

console.log(lexer.getTokens());

```

Will output:

```js
[
    { text: 'Synergy', types: [ 'buzzword' ],   startIndex: 0,  endIndex: 6  },
    { text: ' ',       types: [ 'whitespace' ], startIndex: 7,  endIndex: 7  },
    { text: 'lol',     types: [ 'word' ],       startIndex: 8,  endIndex: 10 },
    { text: ' ',       types: [ 'whitespace' ], startIndex: 11, endIndex: 11 },
    { text: 'wut',     types: [ 'word' ],       startIndex: 12, endIndex: 14 },
    { text: ' ',       types: [ 'whitespace' ], startIndex: 15, endIndex: 15 },
    { text: 'hahahaa', types: [ 'laughter' ],   startIndex: 16, endIndex: 22 }
]
```

## Docs:

To lex some text use you have to create a new instance of Lexington:
```js
var lexer = new Lexington('string to lex', function(stream, state){
    // Your code here.
});
```
The first argument is the text that you would like to lex.

The second argument is the function that defines how you would like to lex some text. 
:loudspeaker: Every call of you lexer function you _have_ to return an array which represents that token. This will move the stream to the next unlexed character and call your lexing function again.

Your lexer function will always called with `stream` and `state`.

#### `state`

The `state` argument is a simple object who's state is kept across function calls. For example if in a call of your lexer function you were to do: `state.foo = true` then the next call you would be able to access `state.foo`. This is very much inspired by the codemirror.

#### `stream`

The so called 'stream' has the following methods:

`stream.current()`:
Returns the text which is the current lexer functions 'scope' if you like.

`stream.match(regex, flags)`:
Given a regex _string_ i.e '[a-z]+' and any regex flags (like the [RegExp](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp) constructor) returns true or false if the next characters in the stream match.

`stream.eat(regex, flags)`:
The same as `stream.match()` but instead 'consumes' anything that matched meaning that if you  returns true or false if the next characters in the stream match.



