import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function cardsParallax() {
  const tabs = Array.from(
    document.querySelectorAll<HTMLElement>(".catalog__tab")
  );
  tabs.forEach((tab) => {
    const slides = Array.from(
      tab.querySelectorAll<HTMLElement>(
        ".catalog__main-slider .swiper-slide:not(:nth-child(1)):not(:nth-child(2))"
      )
    );
    let mm = gsap.matchMedia();
    slides.forEach((slide) => {
      const card = slide.querySelector(".product-card");

      mm.add("(min-width: 769px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: "top bottom+=30%",
            end: "bottom center",
            scrub: true,
            markers: false,
          },
        });

        tl.to(card, {
          y: "-10rem",
          duration: 1,
        });
      });
    });
  });
}
