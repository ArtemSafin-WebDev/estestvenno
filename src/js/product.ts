import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import setMouseParallax from "./mouseParallax";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function product() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".product")
  );
  elements.forEach((element) => {
    const cards = Array.from(
      element.querySelectorAll<HTMLElement>(".product__slider-card")
    );
    cards.forEach((card) => {
      const parts = Array.from(
        card.querySelectorAll<HTMLElement>(".product__slider-card-decor")
      );
      setMouseParallax(card, parts);
    });

    const blocks = Array.from(
      element.querySelectorAll<HTMLElement>(".product__block")
    );

    blocks.forEach((block) => {
      const btn = block.querySelector<HTMLButtonElement>(".product__block-btn");
      const dropdown = block.querySelector<HTMLElement>(
        ".product__block-dropdown"
      );
      btn?.addEventListener("click", (event) => {
        event.preventDefault();
        block.classList.toggle("active");
      });

      dropdown?.addEventListener("transitionend", () => {
        ScrollTrigger.refresh();
      });
    });

    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    new Swiper(container, {
      speed: 600,
      longSwipesRatio: 0.2,
      effect: "fade",
      loop: true,
      fadeEffect: {
        crossFade: true,
      },
      pagination: {
        el: element.querySelector<HTMLElement>(".product__slider-pagination"),
        clickable: true,
      },
      modules: [Navigation, EffectFade, Pagination],
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".product__slider-arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".product__slider-arrow--next"
        ),
      },
    });
  });
}
