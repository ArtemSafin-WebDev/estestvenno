import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function sayCheese() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".say-cheese")
  );
  elements.forEach((element) => {
    const waves = element.querySelector<HTMLElement>(".say-cheese__bg-image");
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
      },
    });
    tl.from(waves, {
      scaleY: 0,
      duration: 2,
      transformOrigin: "center bottom",
      ease: "expo.out",
    });
  });
}
