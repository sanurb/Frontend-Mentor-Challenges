const toastContainer = document.querySelector(".toast-container");

export default function generateToast(message) {
	toastContainer.insertAdjacentHTML(
		"beforeend",
		`<p class="toast font-bold rounded bg-accent bkg">${message}</p>`
	);
	const toast = toastContainer.lastElementChild;
	toast.addEventListener("animationend", () => toast.remove(), {
		once: true,
	});
}
