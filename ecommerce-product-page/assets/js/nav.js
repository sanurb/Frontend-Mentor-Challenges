const closeMenuBtn = document.querySelector("#closeMenu");
const openMenuBtn = document.querySelector("#openMenu");
const navPanelContainer = document.querySelector(".nav__panel-container");
const overlayEl = document.querySelector(".nav__overlay");
const navLinks = document.querySelectorAll(".nav__link a");

const toggleMenu = () => {
    const isExpanded = navPanelContainer.classList.toggle("expanded");
    overlayEl.classList.toggle('active');

    navLinks.forEach(link => {
        link.tabIndex = isExpanded ? 0 : -1;
    });
}

closeMenuBtn.addEventListener("click", toggleMenu);
openMenuBtn.addEventListener("click", toggleMenu);
navPanelContainer.addEventListener("click", (e) => {
    e.currentTarget === e.target && toggleMenu();
});
