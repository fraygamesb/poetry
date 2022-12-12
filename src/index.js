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
    
    document.addEventListener('touchstart', throttle(scrollChange, 2000));
    document.addEventListener('touchmove', throttle(scrollChange, 2000));



    $(document).on('touchstart', function(e) {

        var swipe = e.originalEvent.touches,
        start = swipe[0].pageY;
    
        $(this).on('touchmove', function(e) {
    
            var contact = e.originalEvent.touches,
            end = contact[0].pageY,
            distance = end-start;
    
            if (distance < -30) // up
            if (distance > 30) // down
        })
        .one('touchend', function() {
    
            $(this).off('touchmove touchend');
        });
    });
    

    function scrollChange(e) {
        console.log(e);
        if (e.deltaY > 0) {
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

    document.querySelector('.poems').addEventListener('click', (e) => {
            
            console.log(e.target.classList);
        });
    document.querySelector('.btn-start').addEventListener('click', function() {
        nextSlide(6);
    });

    document.addEventListener('load', nextSlide(0));





   



}

function throttle(func, limit) {
    let inThrottle;
    return function () {
        const context = this;
        const args = arguments;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => {
                inThrottle = false
            }, limit);
        }
    }
}

init();

document.addEventListener('load', init());

