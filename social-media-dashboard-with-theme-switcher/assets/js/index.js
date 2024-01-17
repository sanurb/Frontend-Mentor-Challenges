/**
 * Module NumberAnimator for animating numbers.
 * Utilizes requestAnimationFrame for smooth animation.
 */
const NumberAnimator = (function() {
    function animateNumber(element, start, end, duration) {
        let startTime = null;
        const suffix = element.textContent.replace(/[0-9]/g, '');

        const step = (currentTime) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start) + suffix;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }

    return {
        animate: animateNumber
    };
})();

document.addEventListener('DOMContentLoaded', () => {
    const numberElements = document.querySelectorAll('.number');

    numberElements.forEach(element => {
        const endValue = parseInt(element.textContent, 10);
        const duration = element.dataset.duration ? parseInt(element.dataset.duration, 10) : 2000;

        NumberAnimator.animate(element, 0, endValue, duration);
    });
});