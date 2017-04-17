/**
 * Mouse wheel handler
 * @param {*} wrapper 
 * @param {Promise} callback 
 * @param {down: {element, to, duration, activeAnimation}, up: {element, to, duration, activeAnimation}} settings 
 */

export default function(wrapper, callback, settings) {
    // left: 37, up: 38, right: 39, down: 40,
    // spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
    const keys = {37: 1, 38: 1, 39: 1, 40: 1};
    let isMobile = {
			Android: function() {
				return navigator.userAgent.match(/Android/i);
			},
			BlackBerry: function() {
				return navigator.userAgent.match(/BlackBerry/i);
			},
			iOS: function() {
				return navigator.userAgent.match(/iPhone|iPad|iPod/i);
			},
			Opera: function() {
				return navigator.userAgent.match(/Opera Mini/i);
			},
			Windows: function() {
				return navigator.userAgent.match(/IEMobile/i);
			},
			any: function() {
				return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
			}
		};

    function preventDefault(e) {
        e = e || window.event;
        let value = e.wheelDelta || -e.deltaY || -e.detail;
        let delta = Math.max(-1, Math.min(1, value));
        
        if (delta < 0 && settings.down.activeAnimation) {
            callback(settings.down).then((val) => {
                document.body.style.overflowY = 'visible';
                settings.up.activeAnimation = true;
                
                enableScroll();
            });
        }

        if (delta > 0 && settings.up.activeAnimation) {
            document.body.style.overflowY = 'hidden';
            
            callback(settings.up).then((val) => {
                settings.up.activeAnimation = false;
                settings.down.activeAnimation = true;

                enableScroll();
            });
        }
        
        if (e.preventDefault)
            e.preventDefault();
        e.returnValue = false;  
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
        if (window.addEventListener) // older FF
            window.addEventListener('DOMMouseScroll', preventDefault, false);
            window.onwheel = preventDefault; // modern standard
            window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
            window.ontouchmove  = preventDefault; // mobile
            document.onkeydown  = preventDefaultForScrollKeys;
        }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null; 
        window.onwheel = null; 
        window.ontouchmove = null;  
        document.onkeydown = null;  
    }
    
    if (isMobile.any()) {
        let touchstartX = 0,
            touchstartY = 0,
            touchendX = 0,
            touchendY = 0;

        wrapper.addEventListener('touchstart', function(event) {
            touchstartX = event.changedTouches[0].screenX;
            touchstartY = event.changedTouches[0].screenY;
        });

        wrapper.addEventListener('touchend', function(event) {
            touchendX = event.changedTouches[0].screenX;
            touchendY = event.changedTouches[0].screenY;
            handleGesure();
        });


        function handleGesure() {
            if (touchendY < touchstartY && settings.down.activeAnimation) {
                //down
                callback(settings.down).then((val) => {
                    document.body.style.overflowY = 'visible';
                    settings.up.activeAnimation = true;
                });
            }
            if (touchendY > touchstartY && settings.up.activeAnimation) {
                //up
                callback(settings.up).then((val) => {
                    document.body.style.overflowY = 'hidden';
                    settings.up.activeAnimation = false;
                    settings.down.activeAnimation = true;
                });
            }
        }
    } else {
        wrapper.addEventListener('wheel', disableScroll);
    }
}