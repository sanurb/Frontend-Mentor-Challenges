const sliderModule = (function() {
    let currentIndex = 0;
    const slider = document.querySelector(".slider");
    const slides = [...document.querySelectorAll(".slide")];
    const thumbnails = [...document.querySelectorAll(".thumbnail")];
    const prevBtn = document.querySelector("#prev");
    const nextBtn = document.querySelector("#next");

    function init() {
        prevBtn.addEventListener("click", () => moveSlider("prev"));
        nextBtn.addEventListener("click", () => moveSlider("next"));
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.addEventListener("click", () => changeSlide(index));
        });
        updateButtonVisibility();
    }

    function moveSlider(dir) {
        currentIndex += (dir === "next" ? 1 : -1);
        updateSlider();
    }

    function changeSlide(index) {
        currentIndex = index;
        updateSlider();
    }

    function updateSlider() {
		slider.style.transform = `translateX(-${100 * currentIndex}%)`;
		slides.forEach((slide, index) => {
			slide.classList.toggle("active-slide", index === currentIndex);
		});
		updateButtonVisibility();
		updateThumbnails();
	}

    function updateButtonVisibility() {
        prevBtn.classList.toggle("hidden", currentIndex === 0);
        nextBtn.classList.toggle("hidden", currentIndex === slides.length - 1);
    }

    function updateThumbnails() {
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle("thumbnail--active", index === currentIndex);
        });
    }

    return { init };
})();


document.addEventListener("DOMContentLoaded", sliderModule.init);

const scrollRevealModule = (function() {
    const sr = ScrollReveal({
        distance: '25px',
        duration: 1300,
        easing: 'cubic-bezier(.68, -.55, .265, 1.55)',
        reset: true
    });

    function init() {
        sr.reveal(`.slide1`, { origin: 'top' });
        sr.reveal(`.product__content`, { origin: 'bottom' });
        sr.reveal(`.thumbnails`, { origin: 'bottom' });
    }

    return { init };
})();

document.addEventListener("DOMContentLoaded", scrollRevealModule.init);
