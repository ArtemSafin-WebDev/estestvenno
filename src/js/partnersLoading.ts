import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function partnersLoading() {
  const tl = gsap.timeline({
    delay: 0.5,
  });
  tl.from(".partners-intro__breadcrumbs, .partners-intro__back-btn", {
    autoAlpha: 0,
    duration: 1,
  });
  tl.from(
    ".partners-intro__heading",
    {
      autoAlpha: 0,
      duration: 1,
      y: 60,
    },
    "-=0.5"
  );
  tl.from(
    ".cheese__slider",
    {
      autoAlpha: 0,
      duration: 1,
    },
    "-=0.5"
  );
}
