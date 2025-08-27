import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function stickyCatalogNav() {
  const nav = document.querySelector<HTMLElement>(".catalog__nav");
  if (!nav) return;
  let mm = gsap.matchMedia();
  mm.add("(min-width: 769px)", () => {
    ScrollTrigger.create({
      trigger: nav,
      // pin: ".catalog__nav-wrapper",
      toggleClass: "sticky",
      start: "top top+=100",
      end: "bottom bottom",
      endTrigger: ".catalog",
      markers: false,
      onLeaveBack: () => {
        nav.classList.remove("sticky");
      },
      onEnter: () => {
        nav.classList.add("sticky");
      },
      onEnterBack: () => {
        nav.classList.remove("hidden");
      },
      onLeave: () => {
        nav.classList.add("hidden");
      },
    });
  });
}
