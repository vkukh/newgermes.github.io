'use strict';
(function() {
<<<<<<< HEAD
	const vocabulary = {
	    first: 'Hello',
	    second: 'world!',
	    third: 'Hi!'
	};
	
	if (vocabulary.first.length > 3) {
	    console.log(`${vocabulary.first} ${vocabulary.second}`);
	}
=======
    const vocabulary = {
        first: 'Hello',
        second: 'world!'
    };

    const vocabularyEnglish = Object.create(vocabulary);
    let idT = null;

    // add some new english word
    vocabularyEnglish.happy = 'love';
    vocabularyEnglish.sad = 'fail';

    if (vocabulary.first.length > 3) {
        console.log(`${vocabulary.first} ${vocabulary.second}`);
    } else {
	console.log(`${vocabularyEnglish.first} ${vocabularyEnglish.happy}`);
    }
<<<<<<< HEAD

>>>>>>> 39aa69c... add inheritance
=======
    
    idT = setInterval(() => console.log(vocabulary.first), 1000);
    setTimeout(() => clearInterval(idT), 10000);
>>>>>>> 23867f2... add timers
} ());