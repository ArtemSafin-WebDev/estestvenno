import Swiper from "swiper";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";

export default function vacanciesSlider() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-vacancies-slider")
  );
  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;

    new Swiper(container, {
      speed: 600,
      modules: [Navigation, Pagination],
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(
          ".vacancies__slider-arrow--prev"
        ),
        nextEl: element.querySelector<HTMLButtonElement>(
          ".vacancies__slider-arrow--next"
        ),
      },
      pagination: {
        el: element.querySelector<HTMLElement>(".vacancies__slider-pagination"),
        type: "bullets",
        clickable: true,
      },
    });
  });
}
