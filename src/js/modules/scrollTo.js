/**
 * Scroll to element
 * @param {down: {element, to, duration, activeAnimation}, up: {element, to, duration, activeAnimation}} settings 
 */

function scrollTo(settings) {
    var start = settings.element.scrollTop,
        change = settings.to - start,
        increment = 20;

        if (settings.activeAnimation) {
            let p = new Promise((res, rej) => {
            var animateScroll = function(elapsedTime) {
                elapsedTime += increment;

                var position = easeInOut(elapsedTime, start, change, settings.duration);

                settings.element.scrollTop = position; 
                if (elapsedTime < settings.duration) {
                    setTimeout(function() {
                    animateScroll(elapsedTime);
                    }, increment);
                } else {
                    res('done');
                }
            };

            animateScroll(0);
            });
            settings.activeAnimation = false;

            return p;
        }  
}

function easeInOut(currentTime, start, change, duration) {
    currentTime /= duration / 2;
    if (currentTime < 1) {
        return change / 2 * currentTime * currentTime + start;
    }
    currentTime -= 1;
    return -change / 2 * (currentTime * (currentTime - 2) - 1) + start;
}

export default scrollTo;