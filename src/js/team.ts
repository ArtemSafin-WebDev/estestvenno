import Swiper from "swiper";
import "swiper/css";
import { Navigation, Pagination } from "swiper/modules";

export default function team() {
  const elements = Array.from(document.querySelectorAll<HTMLElement>(".team"));
  elements.forEach((element) => {
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;

    new Swiper(container, {
      speed: 600,
      slidesPerView: "auto",
      modules: [Navigation, Pagination],
      pagination: {
        el: element.querySelector<HTMLElement>(".team__slider-pagination"),
        type: "bullets",
        clickable: true,
      },
      navigation: {
        prevEl: element.querySelector<HTMLButtonElement>(".team__arrow--prev"),
        nextEl: element.querySelector<HTMLButtonElement>(".team__arrow--next"),
      },
    });
  });
}
