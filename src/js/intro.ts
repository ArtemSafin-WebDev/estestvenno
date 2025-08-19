import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper/modules";

export default function intro() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".intro"));
  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    new Swiper(container, {
      speed: 600,

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
  });
}
