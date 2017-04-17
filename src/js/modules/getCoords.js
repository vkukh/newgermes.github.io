/**
 * Return position of elem in window
 * @param {*} elem 
 */

export default function (elem) { // кроме IE8-
    var box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset,
        bottom: box.bottom
    };
}