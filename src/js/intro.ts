import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper/modules";
import setMouseParallax from "./mouseParallax";

export default function intro() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".intro"));
  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    new Swiper(container, {
      speed: 600,
      longSwipesRatio: 0.2,
      effect: "fade",
      fadeEffect: {
        crossFade: true,
      },
      modules: [Navigation, EffectFade],
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".intro__slider-arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".intro__slider-arrow--next"
        ),
      },
    });

    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".intro__slider-card")
    );
    cards.forEach((card) => {
      const parts = Array.from(
        card.querySelectorAll<HTMLElement>(".intro__slider-card-decor")
      );
      setMouseParallax(card, parts);
    });
  });
}
