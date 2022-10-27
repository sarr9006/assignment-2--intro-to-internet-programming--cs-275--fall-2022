let track = document.querySelector(`.carousel_track`);
let slides = Array.from(track.childern);

let nextButton = document.querySelector(`.carousel_button-right`);
let prevButton = document.querySelector(`.carousel_button-left`);
let dotsNav = document.querySelector(`.carousel_map`);
let dots = Array.from(dotsNav.childern);

let slideWidth = slides[0].getBoundingClientRect().width;


let setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + `px`;
};
sildes.forEach(setSlidePosition);

nextButton.addEventListener(`click`, e=>{
    let currentSlide = track.querySelector(`.current-slide`);
    let nextSlide = currentSlide.nextElementSibling;
    let amountToMove = nextSlide.style.left;

    track.style.transform = `translateX(-`+ amountToMove +`)`;
    currentSlide.classList.remove(`current-slide`);
    nextSlide.classList.add(`current-slide`);

})