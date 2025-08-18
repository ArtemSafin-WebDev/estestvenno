import "virtual:svg-icons-register";
import "../scss/style.scss";
import vacanciesSlider from "./vacanciesSlider";
import fridgeDrag from "./fridgeDrag";
import advantages from "./advantages";

document.addEventListener("DOMContentLoaded", () => {
  vacanciesSlider();
  fridgeDrag();
  advantages();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
