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
import menu from "./menu";
import fixedHeader from "./fixedHeader";
import modals from "./modals";
import forms from "./forms";
import clearInputBtns from "./clearInputBtns";
import fileUpload from "./fileUpload";
import stickyCatalogNav from "./stickyCatalogNav";
import cardsParallax from "./cardsParallax";
import { debounce } from "lodash-es";
import otherTastes from "./otherTastes";
import product from "./product";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  smoothScrolling();
  fixedHeader();
  intro();
  cheese();
  stickyCatalogNav();
  catalog();
  productCard();
  fridgeDrag();
  advantages();
  team();
  vacanciesSlider();
  vacanciesBtn();
  sayCheese();
  magnet();
  menu();
  modals();
  fileUpload();
  forms();
  clearInputBtns();
  cardsParallax();
  otherTastes();
  product();
});

window.addEventListener("load", () => {
  ScrollTrigger.refresh();
  document.body.classList.add("loaded");
});

let viewportWidth = window.innerWidth;
window.addEventListener(
  "resize",
  debounce(() => {
    if (viewportWidth === window.innerWidth) return;
    viewportWidth = window.innerWidth;
    ScrollTrigger.refresh();
  }, 500)
);
