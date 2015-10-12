
# lexington [![Build Status](https://travis-ci.org/mattvagni/lexington.svg?branch=master)](https://travis-ci.org/mattvagni/lexington) 
Lexington is a simple library to transform some text into a flat list of tokens. 
Works in node and in the browser.

## Installation
```
npm install lexington
```

## Example Usage
```js

var Lexington = require('Lexington');

var lexer = new Lexington('Synergy lol wut hahahaa', (stream, state) => {

    if (stream.eat('synergy|cloud|greenshoots', 'i')){
        return ['buzzword'];
    }

    if (stream.eat('[ha]{2,}([^\\w]|$)', 'i')){
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

## Documentation

To lex some text use you have to create a new instance of Lexington and then get the tokens back out.
```js
var lexer = new Lexington('string to lex', function(stream, state){
    // Your code here.
});

// This will spit out your tokens:
console.log(lexer.getTokens()); 
```
The first argument is the text that you would like to lex.

The second argument is the function that defines how you would like to lex some text. 
:loudspeaker: Every call of you lexer function you _have_ to return an array which represents that token. This will move the stream to the next unlexed character and call your lexing function again.

Your lexer function will always called with `stream` and `state`.

The `state` argument is a simple object who's state is kept across function calls. For example if in a call of your lexer function you were to do: `state.foo = true` then the next call you would be able to access `state.foo`. This is very much inspired by the [codemirror](https://github.com/codemirror/codemirror) syntax for defining custom modes.

The so called 'stream' has the following methods:
`stream.current()`:
Returns the text which is the current lexer functions 'scope' if you like.

`stream.match(regex, flags)`:
Given a regex _string_ i.e '[a-z]+' and any regex flags (like the [RegExp](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/RegExp) constructor) returns true or false if the next characters in the stream match.

`stream.eat(regex, flags)`:
The same as `stream.match()` but instead 'consumes' anything that matched. See the example above... kind of hard to explain.


## In the browser
If you would like to use this in the browser just use `/build/lexington.js`. You can use the module loader of your choice or can access it globally as `Lexington`.

## TODO
- If the user defined lexer function doesn't return anything Lexington currently recurses endlessly. Might be nice to add a check in here and throw an error instead.
- If you want to use regex character sets such as `/[\w]+/` in `stream.match()` or `stream.eat()` you have to escape the backslash by doing, for example, `stream.match('[\\w]+')`; This is due to how `RegExp()` works :poop:.



