import "virtual:svg-icons-register";
import "../scss/style.scss";
import vacanciesSlider from "./vacanciesSlider";
import fridgeDrag from "./fridgeDrag";
import advantages from "./advantages";
import intro from "./intro";
import catalog from "./catalog";
import smoothScrolling from "./smoothScrolling";
import magnet from "./magnet";
import productCard from "./productCard";

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  intro();
  catalog();
  productCard();
  fridgeDrag();
  advantages();
  vacanciesSlider();
  magnet();
});

window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});
