import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function advantages() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".advantages")
  );

  elements.forEach((element) => {
    const items = Array.from(
      element.querySelectorAll<HTMLElement>(".swiper-slide:not(:first-child)")
    );
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top+=100 top",
        end: () => `top+=${66 * items.length}% top`,
        pin: true,
        pinSpacing: true,
        markers: false,
        scrub: true,
      },
    });

    items.forEach((item) => {
      tl.to(item, {
        autoAlpha: 1,
        duration: 0.5,
      }).to(
        item,
        {
          left: 0,
          duration: 1,
        },
        "<"
      );
    });
  });
}
