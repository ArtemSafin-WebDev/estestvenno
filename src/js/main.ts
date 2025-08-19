import "virtual:svg-icons-register";
import "../scss/style.scss";
import vacanciesSlider from "./vacanciesSlider";
import fridgeDrag from "./fridgeDrag";
import advantages from "./advantages";
import intro from "./intro";
import catalog from "./catalog";
import smoothScrolling from "./smoothScrolling";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  intro();
  catalog();
  fridgeDrag();
  advantages();
  vacanciesSlider();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
