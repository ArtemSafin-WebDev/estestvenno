import gsap from "gsap";
import { MorphSVGPlugin } from "gsap/all";

gsap.registerPlugin(MorphSVGPlugin);

export default function vacanciesBtn() {
  const btn = document.querySelector(".vacancies__card-button");

  if (!btn) return;

  //   MorphSVGPlugin.convertToPath("#vacancies-circle");
  const tl = gsap.timeline({
    paused: true,
  });
  tl.to("#vacancies-star", {
    duration: 0.2,
    morphSVG: {
      shape: "#vacancies-circle",
      shapeIndex: 12,
    },
  });

  btn.addEventListener("mouseenter", () => {
    tl.play();
  });
  btn.addEventListener("mouseleave", () => {
    tl.reverse();
  });
}
