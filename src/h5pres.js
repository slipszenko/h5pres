// Create a namespace for the program, if not already created
var szko = szko ? szko : {};

szko.h5pres = (function () {
    "use strict";

    // Private vars
    var presenting = false,
        current = 1,
        keys = {
            left : 37,
            up : 38,
            right : 39,
            down : 40,
            fullStop : 190
        },


    setCurrentSlide = function (slide) {
        current = slide;
        // Hide everything at the first level (except the article tag), and all slides
        var toHide = document.querySelectorAll("body>*:not(article), article section");
        for(var i = 0; i < toHide.length; i++) {
            toHide[i].classList.add("szko-h5pres-hide");
        }
        // Show the slide
        document.querySelector("article section:nth-child(" + current + ")").classList.remove("szko-h5pres-hide");
    },


    startPresenting = function () {
        console.log("Starting slideshow.")
        setCurrentSlide(current);
        presenting = true;

        // Go fullscreen        
        var docElm = document.documentElement;
        if (docElm.requestFullscreen) {
            docElm.requestFullscreen();
        } else if (docElm.mozRequestFullScreen) {
            docElm.mozRequestFullScreen();
        } else if (docElm.webkitRequestFullScreen) {
            docElm.webkitRequestFullScreen();
        }
    },


    stopPresenting = function () {
        console.log("Stopping slideshow.")
        // Return to the normal view
        presenting = false;

        // Show all the content as it was before
        var hiddenContent = document.querySelectorAll(".szko-h5pres-hide");
        for(var i = 0; i < hiddenContent.length; i++) {
            hiddenContent[i].classList.remove("szko-h5pres-hide");
        }

        // Exit fullscreen      
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
            document.webkitCancelFullScreen();
        }
    },

    
    togglePresentation = function () {
        if (!presenting) {
            startPresenting();
        } else {
            stopPresenting();
        }
    },


    keypress = function (e) {
        switch (e.keyCode) {
            case (keys.right):
            case (keys.down):
                setCurrentSlide(current + 1);
                break;
            case (keys.left):
            case (keys.up):
                setCurrentSlide(current - 1);
                break;
            case (keys.fullStop):
                togglePresentation();
                break;
        }
        return false;
    },


    init = function () {
        console.log("h5pres initiated");
        window.addEventListener('keydown', keypress.bind(szko.h5pres), false);
    };


    // Return exposes some private functions as public
    return {
        init : init.bind(szko.h5pres),
        stopPresenting: stopPresenting.bind(szko.h5pres),
        startPresenting: startPresenting.bind(szko.h5pres)
    };

}());

szko.h5pres.init();