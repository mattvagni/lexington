'use strict';

const Lexer = require('../src/lexer');
const expect = require('expect.js');

describe('Lexer', ()=>{

    it ('should keep state', ()=> {

        const l = new Lexer('1234', (stream, state)=>{

            if (stream.match('1')){
                expect(state.test).to.not.be.ok();
            }

            if (stream.match('2')){
                state.test = true;
            }

            if (stream.match('3') || stream.match('4')){
                expect(state.test).to.equal(true);
            }

            return [];
        });

    });

    it ('should save each token', ()=>{

        const l = new Lexer('aaa skip B d', (stream, state)=>{

            if (stream.eat('a+')){
                return ['A'];
            }

            if (stream.eat('b', 'i')){
                return ['B'];
            }

            return [];
        });

        const tokens = l.getTokens();

        expect(tokens[0].text).to.equal('aaa');
        expect(tokens[0].types).to.eql(['A']);
        expect(tokens[0].startIndex).to.equal(0);
        expect(tokens[0].endIndex).to.equal(2);

        expect(tokens[2].text).to.equal('s');
        expect(tokens[2].types).to.eql([]);
        expect(tokens[2].startIndex).to.equal(4);
        expect(tokens[2].endIndex).to.equal(4);

        expect(tokens[7].text).to.equal('B');
        expect(tokens[7].types).to.eql(['B']);
        expect(tokens[7].startIndex).to.equal(9);
        expect(tokens[7].endIndex).to.equal(9);

        expect(tokens[9].text).to.equal('d');
        expect(tokens[9].types.length).to.equal(0);
        expect(tokens[9].startIndex).to.equal(11);
        expect(tokens[9].endIndex).to.equal(11);
    });


});
