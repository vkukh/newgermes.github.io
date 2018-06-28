'use strict';
(function() {
    const vocabulary = {
        first: 'Hello',
        second: 'world!',
        third: 'Hi!'
    };
    const a = 2;
    const vocabularyEnglish = Object.create(vocabulary);
    let idT = null;

    // add some new english word
    vocabularyEnglish.happy = 'love';
    vocabularyEnglish.sad = 'fail';

    if (vocabulary.first.length > 3) {
        console.log(`${vocabulary.first} ${vocabulary.second} ${a}`);
    } else {
        console.log(`${vocabularyEnglish.first} ${vocabularyEnglish.happy}`);
    }

    idT = setInterval(() => console.log(vocabulary.first), 1000);
    setTimeout(() => clearInterval(idT), 10000);
}());