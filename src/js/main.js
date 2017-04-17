"use strict";
require('../css/reset.css');
require('../css/main.css');

import scrollTo from './modules/scrollTo';
import getCoords from './modules/getCoords';
import $ from './modules/querySelector';
import mouseWheelHandler from './modules/mouseWheelHandler';

const fpSection = $('.fp_section');

if (fpSection !== null) {
    let settings = {
        down: {
            element: (navigator.userAgent.search(/Firefox/) > 0 ? document.documentElement : document.body), 
            to: getCoords(fpSection).bottom, 
            duration: 1250, 
            activeAnimation: true
        },
        up: {
            element: (navigator.userAgent.search(/Firefox/) > 0 ? document.documentElement : document.body), 
            to: 0, 
            duration: 1250, 
            activeAnimation: false
        }
    };

    //run mouseWheelHandler
    mouseWheelHandler(fpSection, scrollTo, settings);
}