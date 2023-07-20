(function($) {

    $(document).ready(function(){
        mk_process_get_values();
        mk_save_values();
        window.timerruns = 0;
        window.freshstart = 1;

        scrollToElement($('.entry-title'));

        mk_update_url();
        
        function scrollToElement(ele) {
            $(window).scrollTop(ele.offset().top).scrollLeft(ele.offset().left);
        }



        $("#mk-gym-timer-start").click(function() {
            if (mk_check_phase_valid()) {
                if (window.freshstart === 1) {
                    mk_load_beeps();
                    mk_save_values();
                    mk_readonly(true);
                    mk_calculate_warmup();
                    window.warmup++;
                    mk_update_warmup();
                    window.timerruns = 1;
                    window.freshstart = 0;
                    mk_set_end_time();
                    mk_phase1_active();
                    mk_reset_phase_counts(1);
                    mk_reset_phase_counts(2);
                    ticker.start();
                    $("#mk-gym-timer-start").html('Pause');
                    if (window.warmup > 0) {
                        $("#mk-gym-timer-phase1-name").val('Warmup');    
                    }
                    
                } else {
                    if (window.timerruns === 1) {
                        ticker.stop();
                        window.timerruns = 0;
                        $("#mk-gym-timer-start").html('Resume');
                    } else {
                        ticker.start();
                        window.timerruns = 1;
                        $("#mk-gym-timer-start").html('Pause');
                    }
                }
            }
        });

        $("#mk-gym-timer-stop").click(function() {
            mk_process_get_values();
        });

        $("#mk-gym-timer-nightmode").click(function() {
            mk_switch_to_nightmode();
        });
        
        $("#mk-gym-timer-embed-toggle").click(function() {
            
            $("#mk-gym-timer-embed-code").toggle(500);
        });
        
        $("#mk-gym-timer-sound").click(function() {
            mk_switch_sound();
        });
        
        $("#mk-gym-timer-reset").dblclick(function() {
            mk_reset();
        });


        /*$( "#mk-gym-timer-reset" ).on({
            mousedown: function() {
                $(this).data('timer', setTimeout(function() {
                    mk_reset();
                    }, 1000)); 
                $(this).addClass('mk-reset-animation');
            },
            mouseup: function() {
                clearTimeout( $(this).data('timer') ); 
                $(this).removeClass('mk-reset-animation');

            }
        });*/


    })


})( jQuery );

/**
*   Checks if data inputted into phase durations is valid (i.e., higher than 0)
*/

function mk_check_phase_valid(notify) {
    if (typeof notify === 'undefined') { notify = true; }
    var valid = false;
    if (window.freshstart === 1) {
        if ((jQuery('#mk-gym-timer-phase1-minutes').val()*60 + jQuery('#mk-gym-timer-phase1-seconds').val() > 0)) {
            if ((jQuery('#mk-gym-timer-phase2-minutes').val()*60 + jQuery('#mk-gym-timer-phase2-seconds').val() > 0)) {
                valid = true;
            } else {
                if (notify) {
                    jQuery('#mk-gym-timer-phase2-seconds').focus();
                    alert('Phase 2 cannot be 00:00.');
                }
            }
        } else {
            if (notify) {
                jQuery('#mk-gym-timer-phase1-seconds').focus();
                alert('Phase 1 cannot be 00:00.');
            }
        }
    } else {
        valid = true;
    }
    return valid;
}


/**
*    Resets timer counts for both phases
* 
*/

function mk_reset_phase_counts(phase) {
    if (phase == 1) {
        window.phase1_minutes = window.minutes1;
        window.phase1_seconds = window.seconds1;
    } else {
        window.phase2_minutes = window.minutes2;
        window.phase2_seconds = window.seconds2;
    }
}

/**
*   If duration type is set to minutes, this functions sets and a time at which the timer ends
*   If duration type is rounds, this f stores round numer in global var
* 
*/
function mk_set_end_time() {
    window.duration_type = jQuery('#mk-gym-timer-duration-type').val();
    if (window.duration_type === 'minutes') {
        window.duration_total =  jQuery('#mk-gym-timer-duration').val() * 60;
        window.duration_total_starting_value =  window.duration_total;
    } else {
        window.roundsleft = jQuery('#mk-gym-timer-duration').val();
    }
}

/**
*    Turns sound on or off
*/

function mk_switch_sound() {
    if (window.volume <= 0.2) {  
        window.volume = Math.round(10*(window.volume - 0.1))/10;    
    }   else {
        window.volume = Math.round(10*(window.volume - 0.2))/10;
    }
    if (window.volume < 0) {
        window.volume = 1;
    }
    
    jQuery("#mk-gym-timer-sound").html('Volume '+window.volume * 100+'%');
        
    mk_update_url();
    
    mk_beep(1,false);
}

/**
*   Calculates duration of the warmup
*/

function mk_calculate_warmup() {
    var warmup = jQuery('#mk-gym-timer-warmup').val();
    var warmup_type = jQuery('#mk-gym-timer-warmup-type').val();
    
    var warmup_total = 0;
    

    
    if (warmup_type == 'seconds') {
        warmup_total = warmup;
    } else {
        warmup_total = warmup * 60;
    }
    window.warmup = warmup_total;
    window.warmup_saved_value = warmup;
}

function mk_update_iframe() {
    var minutes1 = jQuery('#mk-gym-timer-phase1-minutes').val();
    var seconds1 = jQuery('#mk-gym-timer-phase1-seconds').val();

    var minutes2 = jQuery('#mk-gym-timer-phase2-minutes').val();
    var seconds2 = jQuery('#mk-gym-timer-phase2-seconds').val();

    var duration = jQuery('#mk-gym-timer-duration').val();
    var duration_type = jQuery('#mk-gym-timer-duration-type').val(); 
    
    
    var warmup = jQuery('#mk-gym-timer-warmup').val();
    var warmup_type = jQuery('#mk-gym-timer-warmup-type').val();    
    
    var phase1 = jQuery('#mk-gym-timer-phase1-name').val(); 
    var phase2 = jQuery('#mk-gym-timer-phase2-name').val(); 

    var params = "?m1="+minutes1+"&amp;amp;s1="+seconds1+"&amp;amp;m2="+minutes2+"&amp;amp;s2="+seconds2+"&amp;d="+duration+"&amp;amp;dt="+duration_type+"&amp;amp;wu="+warmup+"&amp;amp;wut="+warmup_type+"&amp;amp;nm="+window.nightmode+"&amp;amp;iframe=1&amp;amp;p1n="+phase1+"&amp;amp;p2n="+phase2+"&amp;amp;volume="+window.volume;      
}

function mk_switch_to_nightmode() {
    if (window.nightmode === 1) {
        jQuery('body').removeClass('mk_nightmode');       
            
        jQuery('#mk-gym-timer-nightmode').html('Bright mode ');
        
        window.nightmode = 0;
        mk_update_url();
    } else {
        jQuery('body').addClass('mk_nightmode');    
        jQuery('#mk-gym-timer-nightmode').html('Dark mode ');
        window.nightmode = 1;
        mk_update_url();
      }
    
}


function mk_process_get_values() {
    var m1 = mk_findGetParameter('m1');
    var s1 = mk_findGetParameter('s1');
    var m2 = mk_findGetParameter('m2');
    var s2 = mk_findGetParameter('s2');
    var d = mk_findGetParameter('d');       // duration
    var dt = mk_findGetParameter('dt');     // duration type
    var wu = mk_findGetParameter('wu');     // warmup (wordpress doesn't like using w-get variable)
    var wut = mk_findGetParameter('wut');   // warmup type
    var nm = mk_findGetParameter('nm');    // nightmode
    var iframe = mk_findGetParameter('iframe');    // nightmode
    var volume = mk_findGetParameter('volume');    // sound on or off
    
    var p1n = mk_findGetParameter('p1n');    // phase 1 name
    var p2n = mk_findGetParameter('p2n');    // phase 1 name
    
    
    if (((m1 !== null) && (s1 !== null) && (m2 !== null) && (s2 !== null) && (d !== null) && (dt !== null)&& (wu !== null)&& (wut !== null))) {
        if ((m1*60+s1 > 0) && (m2*60+s2 > 0) && (d > 0)) {
            jQuery('#mk-gym-timer-phase1-minutes').val(m1);
            jQuery('#mk-gym-timer-phase1-seconds').val(s1);

            jQuery('#mk-gym-timer-phase2-minutes').val(m2);
            jQuery('#mk-gym-timer-phase2-seconds').val(s2);   
            
            jQuery('#mk-gym-timer-duration').val(d);
            jQuery('#mk-gym-timer-duration-type').val(dt);
        
            jQuery('#mk-gym-timer-warmup').val(wu);
            jQuery('#mk-gym-timer-warmup-type').val(wut);     
            mk_update_url();
        }
    } 
    
    window.nightmode = 0;
    
    if (nm !== null) {
        if (nm == 1) {
            mk_switch_to_nightmode();
        }
    }
    
    window.volume = 1;
    if (volume !== null) {
        if ((volume >= 0) && (volume <= 1)) {
            window.volume = volume;
            jQuery("#mk-gym-timer-sound").html('Volume '+window.volume * 100+'%');
        }
    }
    
    if (p1n !== null) {
        jQuery("#mk-gym-timer-phase1-name").val(p1n);
    }
    
    if (p2n !== null) {
        jQuery("#mk-gym-timer-phase2-name").val(p2n);
    }
        
        
    if (iframe !== null) {
        if (iframe == 1) {
            jQuery('body').addClass('mk_iframe');    
            
        }
    }
    
}

function mk_findGetParameter(parameterName) {
    var result = null,
    tmp = [];
    location.search
    .substr(1)
    .split("&")
    .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    });
    return result;
}

/**
*   Updates the bookmark URL
*/

function mk_update_url() {
    if (mk_check_phase_valid(false)) {
        if (window.timerruns == 0) {
            var minutes1 = jQuery('#mk-gym-timer-phase1-minutes').val();
            var seconds1 = jQuery('#mk-gym-timer-phase1-seconds').val();

            var minutes2 = jQuery('#mk-gym-timer-phase2-minutes').val();
            var seconds2 = jQuery('#mk-gym-timer-phase2-seconds').val();

            var duration = jQuery('#mk-gym-timer-duration').val();
            var duration_type = jQuery('#mk-gym-timer-duration-type').val();  
            
            
            var warmup = jQuery('#mk-gym-timer-warmup').val();
            var warmup_type = jQuery('#mk-gym-timer-warmup-type').val();   
        } else {
            var minutes1 = window.minutes1;
            var seconds1 = window.seconds1;
            var minutes2 = window.minutes2;
            var seconds2 = window.seconds2;
            var duration = window.duration;
            var duration_type = window.duration_type;
            var warmup = window.warmup;
            var warmup_type = window.warmup_type;
        }
        var phase1 = jQuery('#mk-gym-timer-phase1-name').val(); 
        var phase2 = jQuery('#mk-gym-timer-phase2-name').val(); 
        
        if (window.nightmode === undefined) {
            var nm = mk_findGetParameter('nm');
            if (nm !== null) {
                window.nightmode = nm;    
            }
            
        }
                
        var params_url = "?m1="+minutes1+"&s1="+seconds1+"&m2="+minutes2+"&s2="+seconds2+"&d="+duration+"&dt="+duration_type+"&wu="+warmup+"&wut="+warmup_type+"&nm="+window.nightmode+"&p1n="+phase1+"&p2n="+phase2+"&volume="+window.volume;
        
        var url_target = new URL(params_url, document.location.href);
        
        if (warmup_type == 'seconds') {
            var warmup_type_label = 's';
        } else {
            var warmup_type_label = 'min';
        }
        
        //var link_label = "Interval Timer ("+duration+" "+duration_type+": "+minutes1+":"+seconds1+" &amp; "+minutes2+":"+seconds2+", "+warmup+" "+warmup_type_label+" warmup)";
        
        var link_label = "Interval Timer ("+duration+" "+duration_type+": "+minutes1+":"+seconds1+" &amp; "+minutes2+":"+seconds2+")";
        
        jQuery("#mk-gym-timer-save-url").html(link_label);
        jQuery("#mk-gym-timer-save-url").attr("href",url_target);
        
        mk_update_iframe();
    }
}

function mk_beep(times,blink) {
    if (typeof blink === 'undefined') { blink = true; }
    if (times === 1) {
        //var url = new URL("../wp-content/uploads/2019/10/bell.mp3", document.location.href );    
        if (blink) {
            if (window.nightmode == 1) {
                jQuery('body').addClass('mk_nightmode_blink1');
            } else {
                jQuery('body').addClass('mk_blink1');
            }
        }
        if (window.volume > 0) {
            if (typeof window.beep1 === 'undefined') { 
                var url1 = new URL("../wp-content/uploads/2019/10/bell.mp3", document.location.href );   
                window.beep1 = new Audio(url1);    
            }
            window.beep1.volume = window.volume;
            window.beep1.pause();
            window.beep1.currentTime = 0;
            window.beep1.play();
        } else {
            window.beep1.pause();
            window.beep1.currentTime = 0;
        }
    } else {
        //var url = new URL("../wp-content/uploads/2019/10/bell2.mp3", document.location.href );
        if (blink) {
            if (window.nightmode == 1) {
                jQuery('body').addClass('mk_nightmode_blink2');
            } else {
                jQuery('body').addClass('mk_blink2');
            }
        }
        if (window.volume > 0) {
            window.beep2.volume = window.volume;
            window.beep2.play();
        }
    }
    
    
    setTimeout(function() {
        jQuery('body').removeClass('mk_nightmode_blink1');    
        jQuery('body').removeClass('mk_nightmode_blink2');    
        jQuery('body').removeClass('mk_blink1');    
        jQuery('body').removeClass('mk_blink2');    
    }, 2000);
}

function mk_load_beeps() {
    var url1 = new URL("../wp-content/uploads/2019/10/bell.mp3", document.location.href );    
    var url2 = new URL("../wp-content/uploads/2019/10/bell2.mp3", document.location.href );    
    window.beep1 = new Audio(url1);
    window.beep2 = new Audio(url2);
    var silent_volume = 0.001;
    window.beep1.volume = silent_volume;
    window.beep1.play();
    window.beep2.volume = silent_volume;
    window.beep2.play();
}

function mk_reset() {
    ticker.stop();
    window.timerruns = 0;
    window.active_phase = 1;
    window.freshstart = 1;
    window.substract_second = 0;

    jQuery("#mk-gym-timer-start").html('Start');
    jQuery("#mk-gym-timer-phase1").removeClass('mk-gym-timer-active-phase');
    jQuery("#mk-gym-timer-phase1").removeClass('mk-gym-timer-inactive-phase');
    jQuery("#mk-gym-timer-phase2").removeClass('mk-gym-timer-active-phase');
    jQuery("#mk-gym-timer-phase2").removeClass('mk-gym-timer-inactive-phase');

    jQuery('#mk-gym-timer-phase1-minutes').val(window.minutes1);
    jQuery('#mk-gym-timer-phase1-seconds').val(window.seconds1);

    jQuery('#mk-gym-timer-phase2-minutes').val(window.minutes2);
    jQuery('#mk-gym-timer-phase2-seconds').val(window.seconds2);

    jQuery('#mk-gym-timer-duration').val(window.duration);
    jQuery('#mk-gym-timer-warmup').val(window.warmup_saved_value);
    jQuery('#mk-gym-timer-phase1-name').val(window.phase1);
    
    jQuery('#mk-gym-timer-reset').removeClass('mk-reset-animation');

    mk_readonly(false);

}

function mk_readonly(ronly) {
    jQuery("#mk-gym-timer-phase1-minutes").prop("readonly", ronly);
    jQuery("#mk-gym-timer-phase1-seconds").prop("readonly", ronly);
    jQuery("#mk-gym-timer-phase2-minutes").prop("readonly", ronly);
    jQuery("#mk-gym-timer-phase2-seconds").prop("readonly", ronly);
    jQuery("#mk-gt-rounds-start").prop("readonly", ronly);
    jQuery("#mk-gym-timer-duration-type").prop("readonly", ronly);
}

function mk_save_values() {
    (function($) {
        var minutes1 = $('#mk-gym-timer-phase1-minutes').val();
        var seconds1 = $('#mk-gym-timer-phase1-seconds').val();

        var minutes2 = $('#mk-gym-timer-phase2-minutes').val();
        var seconds2 = $('#mk-gym-timer-phase2-seconds').val();

        var duration = $('#mk-gym-timer-duration').val();
        var duration_type = $('#mk-gym-timer-duration-type').val();
        
        var warmup = $('#mk-gym-timer-warmup').val();
        var warmup_type = $('#mk-gym-timer-warmup-type').val();
        
        var phase1 = $('#mk-gym-timer-phase1-name').val();
        var phase2 = $('#mk-gym-timer-phase2-name').val();

        window.minutes1 = minutes1;
        window.seconds1 = seconds1;
        window.minutes2 = minutes2;
        window.seconds2 = seconds2;
        window.duration = duration;
        window.duration_type = duration_type;
        window.warmup = warmup;
        window.warmup_type = warmup_type;
        window.phase1 = phase1;
        window.phase2 = phase2;
        
        window.active_phase = 1;
        window.update_rounds = 1;
    })( jQuery ); 
}

function mk_load_values() {
    (function($) {
        $('#mk-gym-timer-phase1-minutes').val(window.minutes1);
        $('#mk-gym-timer-phase1-seconds').val(window.seconds1);

        $('#mk-gym-timer-phase2-minutes').val(window.minutes2);
        $('#mk-gym-timer-phase2-seconds').val(window.seconds2);

        $('#mk-gym-timer-duration').val(window.duration);


    })( jQuery ); 
}





function mk_phase1_active() {
    jQuery("#mk-gym-timer-phase1").addClass("mk-gym-timer-active-phase");
    jQuery("#mk-gym-timer-phase1").removeClass("mk-gym-timer-inactive-phase");

    jQuery("#mk-gym-timer-phase2").removeClass("mk-gym-timer-active-phase");
    jQuery("#mk-gym-timer-phase2").addClass("mk-gym-timer-inactive-phase");
}

function mk_phase2_active() {
    jQuery("#mk-gym-timer-phase2").addClass("mk-gym-timer-active-phase");
    jQuery("#mk-gym-timer-phase2").removeClass("mk-gym-timer-inactive-phase");

    jQuery("#mk-gym-timer-phase1").removeClass("mk-gym-timer-active-phase");
    jQuery("#mk-gym-timer-phase1").addClass("mk-gym-timer-inactive-phase");
}

/**
*   Updates warmup count in phase 1 
* 
*/

function mk_update_warmup() {
    window.warmup--;
    if (window.warmup > 0) {
        var wu_minutes = Math.floor(window.warmup/60);
        var wu_seconds = window.warmup - (wu_minutes*60);
        jQuery("#mk-gym-timer-phase1-minutes").val(wu_minutes.toString().padStart(2,0));
        jQuery("#mk-gym-timer-phase1-seconds").val(wu_seconds.toString().padStart(2,0));
    } else {
        //window.warmup_beep = 1;
        //window.first_round = 1;
        //mk_beep(1);
        jQuery("#mk-gym-timer-phase1-name").val(window.phase1);
        jQuery('#mk-gym-timer-phase1-minutes').val(window.minutes1);
        jQuery('#mk-gym-timer-phase1-seconds').val(window.seconds1);
        mk_runtimer();
    }
    /*mk_update_duration();*/
}

/**
*   Updates remaining duration in duration field
*/

function mk_update_duration() {
    var dur_min = Math.floor(window.duration_total / 60);
    var dur_sec = window.duration_total - dur_min*60;
    var dur_string = dur_min+':'+dur_sec;
    if ((dur_min > 0) || (dur_sec > 0)) {
        window.roundsleft = 5;
        var dur_string = dur_min.toString().padStart(2,0)+':'+dur_sec.toString().padStart(2,0);
        jQuery('#mk-gym-timer-duration').val(dur_string);
    } else {
        window.roundsleft = 0;
        mk_beep(2);
        mk_reset();
    }
}

function mk_runtimer() {
    if (window.timerruns === 1) {
        (function($) {
            if (window.warmup > 0) {
                mk_update_warmup();
            } else {
                if (window.duration_type == 'minutes') {
                    mk_update_duration();
                    window.duration_total--;
                }
                $("#mk-gym-timer-phase1-minutes").val(window.phase1_minutes.toString().padStart(2,0));
                $("#mk-gym-timer-phase1-seconds").val(window.phase1_seconds.toString().padStart(2,0));    
                $("#mk-gym-timer-phase2-minutes").val(window.phase2_minutes.toString().padStart(2,0));
                $("#mk-gym-timer-phase2-seconds").val(window.phase2_seconds.toString().padStart(2,0));    
                mk_update_time();
                
            }
        })( jQuery ); 
    } else {
        ticker.stop();
    }
}


function mk_update_time() {
    if (window.active_phase == 1) {
        if ((window.phase1_minutes == window.minutes1) && (window.phase1_seconds == window.seconds1)) {
            mk_beep(1);    
            if (window.duration_type == 'rounds') {
                window.roundsleft--;
                jQuery('#mk-gym-timer-duration').val(window.roundsleft);
            }
            mk_phase1_active();
        }
        window.phase1_seconds--;
        if (window.phase1_seconds < 0) {
            window.phase1_minutes--;
            if (window.phase1_minutes >= 0) {
                window.phase1_seconds = 59;
            }
        }
        if ((window.phase1_minutes == 0) && (window.phase1_seconds == 0)) {
            window.active_phase = 2;
        }
    }   else {
        if ((window.phase2_minutes == window.minutes2) && (window.phase2_seconds == window.seconds2)) {
            mk_beep(2);    
            mk_phase2_active();
        }
        window.phase2_seconds--;
        if (window.phase2_seconds < 0) {
            window.phase2_minutes--;
            if (window.phase2_minutes >= 0) {
                window.phase2_seconds = 59;
            }
        }
        if ((window.phase2_minutes == 0) && (window.phase2_seconds == 0)) {
            window.active_phase = 1;
            if (window.roundsleft > 0) {
                mk_reset_phase_counts(1);
                mk_reset_phase_counts(2);
            } else {
                mk_beep(2);
                ticker.stop();
                mk_reset();
            }
        }            
    } 
}

/**
*   add leading zero to text boxes if necessary
*/

function mk_zero_to_one(target) {
    (function($) {
        var num =  $('#'+target).val();
        if (num == 0) {
            $('#'+target).val(1);    
        }

    })( jQuery );    
}

/**
*   add leading zero to text boxes if necessary
*/

function mk_leading_zero(target,amount) {
    if (typeof amount === 'undefined') { amount = 2; }
    (function($) {
        var num =  $('#'+target).val();
        $('#'+target).val(num.toString().padStart(amount,0));

    })( jQuery );    
}


/**
* Self-adjusting interval to account for drifting
* 
* @param {function} workFunc  Callback containing the work to be done
*                             for each interval
* @param {int}      interval  Interval speed (in milliseconds) - This 
* @param {function} errorFunc (Optional) Callback to run if the drift
*                             exceeds interval
*/
function AdjustingInterval(workFunc, interval, errorFunc) {
    var that = this;
    var expected, timeout;
    this.interval = interval;

    this.start = function() {
        expected = Date.now() + this.interval;
        timeout = setTimeout(step, this.interval);
    }

    this.stop = function() {

        clearTimeout(timeout);
    }

    function step() {
        if (window.timerruns === 1) {
            var drift = Date.now() - expected;
            if (drift > that.interval) {
                // You could have some default stuff here too...
                if (errorFunc) errorFunc();
            }
            workFunc();
            expected += that.interval;
            timeout = setTimeout(step, Math.max(0, that.interval-drift));
        } else {

        }
    }
}

// Define what to do if something goes wrong
var doError = function() {
    console.warn('The drift exceeded the interval.');
};

// (The third argument is optional)
var ticker = new AdjustingInterval(mk_runtimer, 1000, doError);   




// source: https://stackoverflow.com/a/11331200/4298200
function mk_sound(source, volume, loop)
{
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    var son;
    this.son = son;
    this.finish = false;
    this.stop = function()
    {
        document.body.removeChild(this.son);
    }
    this.start = function()
    {
        if (this.finish) return false;
        this.son = document.createElement("embed");
        this.son.setAttribute("src", this.source);
        this.son.setAttribute("hidden", "true");
        this.son.setAttribute("volume", this.volume);
        this.son.setAttribute("autostart", "true");
        this.son.setAttribute("loop", this.loop);
        document.body.appendChild(this.son);
    }
    this.remove=function()
    {
        document.body.removeChild(this.son);
        this.finish = true;
    }
    this.init = function(volume, loop)
    {
        this.finish = false;
        this.volume = volume;
        this.loop = loop;
    }
}

// Restricts input for the given textbox to the given inputFilter.
function mk_setInputFilter(textbox, inputFilter) {
    ["input", "keydown", "keyup", "mousedown", "mouseup", "select", "contextmenu", "drop"].forEach(function(event) {
        textbox.addEventListener(event, function() {
            if (inputFilter(this.value)) {
                this.oldValue = this.value;
                this.oldSelectionStart = this.selectionStart;
                this.oldSelectionEnd = this.selectionEnd;
            } else if (this.hasOwnProperty("oldValue")) {
                this.value = this.oldValue;
                this.setSelectionRange(this.oldSelectionStart, this.oldSelectionEnd);
            }
        });
    });
}

mk_setInputFilter(document.getElementById("mk-gym-timer-phase1-minutes"), function(value) {  return /^\d*$/.test(value);});

mk_setInputFilter(document.getElementById("mk-gym-timer-phase1-seconds"), function(value) {  return /^\d*$/.test(value);});

mk_setInputFilter(document.getElementById("mk-gym-timer-phase2-minutes"), function(value) {  return /^\d*$/.test(value);});

mk_setInputFilter(document.getElementById("mk-gym-timer-phase2-seconds"), function(value) {  return /^\d*$/.test(value);});

mk_setInputFilter(document.getElementById("mk-gym-timer-duration"), function(value) {  return /^\d*$/.test(value);});

mk_setInputFilter(document.getElementById("mk-gym-timer-warmup"), function(value) {  return /^\d*$/.test(value);});