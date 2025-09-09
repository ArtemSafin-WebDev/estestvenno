import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function homeLoading() {
  const tl = gsap.timeline({
    delay: 0.5,
  });

  tl.fromTo(
    ".intro__heading",
    {
      autoAlpha: 0,
      y: 60,
    },
    {
      autoAlpha: 1,
      duration: 1,
      y: 0,
    }
  );
  tl.fromTo(
    ".intro__slider",
    {
      autoAlpha: 0,
      duration: 1,
    },
    {
      autoAlpha: 1,
      duration: 1,
    },
    "-=0.5"
  );
}
