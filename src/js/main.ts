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
import cheese from "./cheese";
import sayCheese from "./sayCheese";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import vacanciesBtn from "./vacanciesBtn";
import team from "./team";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  intro();
  cheese();
  catalog();
  productCard();
  fridgeDrag();
  advantages();
  team();
  vacanciesSlider();
  vacanciesBtn();
  sayCheese();
  magnet();
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
  document.body.classList.add("loaded");
});
