import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

export default function otherTastes() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".other-tastes")
  );
  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;

    new Swiper(container, {
      speed: 600,
      slidesPerView: "auto",
      modules: [Navigation, Pagination],
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".other-tastes__slider-arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".other-tastes__slider-arrow--next"
        ),
      },
      pagination: {
        el: element.querySelector<HTMLElement>(
          ".other-tastes__slider-pagination"
        ),
      },
    });
  });
}
