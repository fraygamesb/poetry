import './styles/style.css'
import gsap from 'gsap';

function init() {
    const pages = document.querySelectorAll('.page')
    let current = 0;
    let scrollSlide = 0;

    function nextSlide(pageNumber) {
        const pages = document.querySelectorAll('.page');
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextImg = nextPage.querySelectorAll('.photo__item');
        const nextText = nextPage.querySelectorAll('.author__name');
        const currentImg = currentPage.querySelectorAll('.photo__item');
        const currentText = currentPage.querySelectorAll('.author__name');

        const leftImg = nextImg[0];
        const rightImg = nextImg[2];

        const leftImgCurr = currentImg[0];
        const rightImgCurr = currentImg[2];

        let dir = (pageNumber > current && pageNumber !== 0) ? "-200%" : "200%";
        console.log(dir);

        gsap.timeline()
            .add('start')
            .to(leftImgCurr, .6, {opacity: 0, left: "50%", rotate: 0, translateX: "-50%"}, 'start')
            .to(rightImgCurr, .6, {opacity: 0, right: "50%", rotate: 0, translateX: "50%"}, 'start')
            .fromTo(currentText, .6, {opacity: 1, y: 0}, {y: dir, opacity: 0})
            .fromTo(currentImg, 1, {y: 0}, {y: dir})
            .fromTo(currentPage, .6, {opacity: 1, pointerEvents: "all"}, {opacity: 0, pointerEvents: "none"})
            .fromTo(nextPage, .6, {opacity: 0, pointerEvents: "none"}, {opacity: 1, pointerEvents: "all"}, "-=0.6")
            .fromTo(nextImg, .6, {y: "200%"}, {y: 0}, "-=0.6")
            .fromTo(nextText, .6, {opacity: 0, y: 30}, {y: 0, opacity: 1}).then(
            (line) => {
                line.add('start')
                    .to(leftImg, .6, {opacity: 1, rotate: "-30deg", translateX: "-70%"}, 'start')
                    .to(rightImg, .6, {opacity: 1, rotate: "30deg", translateX: "100%"}, 'start')
            })
        current = pageNumber
    }

    document.addEventListener('wheel', throttle(scrollChange, 2000)); 
    
    
    function scrollChange(e) {
        let cl = e.deltaY??e;
        if (cl > 0) {
            scrollSlide += 1;
        } else {
            scrollSlide -= 1;
        }

        if (scrollSlide > 5) {
            scrollSlide = 5;
            return;
        }
        if (scrollSlide < 0) {
            scrollSlide = 0;
            return;
        }
        console.log(scrollSlide);
        nextSlide(scrollSlide);
    }

    

    /**/
    document.addEventListener('touchstart', handleTouchStart, false);        
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;                                                        
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
            /* right swipe */ 
        } else {
            /* left swipe */
        }                       
    } else {
        if ( yDiff > 0 ) {
            if(!document.querySelector('.content').classList.contains('auto') && !document.querySelectorAll('.page')[document.querySelectorAll('.page').length - 1].classList.contains('auto'))
                scrollChange(yDiff)
        } else {
            if(!document.querySelector('.content').classList.contains('auto') && !document.querySelectorAll('.page')[document.querySelectorAll('.page').length - 1].classList.contains('auto'))
                scrollChange(yDiff)
        }                                                                 
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

    /**/

    document.querySelector('.btn-reverse').addEventListener('click', function() {
        nextSlide(5);
        document.querySelector('.content').classList.remove('auto');
        !document.querySelectorAll('.page')[document.querySelectorAll('.page').length - 1].classList.remove('auto')
    });
    document.querySelector('.btn-start').addEventListener('click', function() {
        nextSlide(6);
        document.querySelector('.content').classList.add('auto');
        !document.querySelectorAll('.page')[document.querySelectorAll('.page').length - 1].classList.add('auto');
    });

    document.addEventListener('load', nextSlide(0));

    document.querySelector('.poems').addEventListener('click', function(e) {
        let poem = e.target.closest('.poem');
        if(poem) {
            let picture = poem.querySelector('.picture');
            gsap.timeline().to(poem, .6, {width:'100%', height: '100%', position: 'absolute',
                    left: "50%", top: "50%", translateX: "-50%", translateY: "-50%"}).
                    to(picture, .6, {display: "flex", width: "50%", justifyContent: "cener", alignItems: "center"});
        }
    });



   



}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            if(!document.querySelector('.content').classList.contains('auto') && !document.querySelectorAll('.page')[document.querySelectorAll('.page').length - 1].classList.contains('auto')){
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => {
                    inThrottle = false
                }, limit);
            }
        }
    }
}

init();

document.addEventListener('load', init());

