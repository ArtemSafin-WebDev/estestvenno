import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function homeLoading() {
  const tl = gsap.timeline({
    delay: 0.5,
  });

  tl.from(".intro__heading", {
    autoAlpha: 0,
    duration: 1,
    y: 60,
  });
  tl.from(
    ".intro__slider",
    {
      autoAlpha: 0,
      duration: 1,
    },
    "-=0.5"
  );
}
