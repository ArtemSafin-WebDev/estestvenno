import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Swiper from "swiper";
import { Pagination } from "swiper/modules";
import "swiper/css";

gsap.registerPlugin(ScrollTrigger);

export default function partners() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".partners")
  );
  elements.forEach((element) => {
    const accordions = Array.from(
      element.querySelectorAll<HTMLElement>(".partners__faq-accordion")
    );
    accordions.forEach((accordion) => {
      const btn = accordion.querySelector<HTMLButtonElement>(
        ".partners__faq-accordion-btn"
      );
      const dropdown = accordion.querySelector<HTMLElement>(
        ".partners__faq-accordion-dropdown"
      );

      dropdown?.addEventListener("transitionend", () => {
        ScrollTrigger.refresh();
      });

      btn?.addEventListener("click", (event) => {
        event.preventDefault();
        accordions.forEach((someAccordion) => {
          if (someAccordion === accordion) return;
          someAccordion.classList.remove("active");
        });
        accordion.classList.toggle("active");
      });
    });
    let mm = gsap.matchMedia();
    const container = element.querySelector<HTMLElement>(".swiper");
    if (!container) return;
    mm.add("(max-width: 576px)", () => {
      const instance = new Swiper(container, {
        speed: 600,
        slidesPerView: "auto",
        modules: [Pagination],
        pagination: {
          el: element.querySelector<HTMLElement>(
            ".partners__requirements-slider-pagination"
          ),
          type: "bullets",
          clickable: true,
        },
      });

      return () => {
        instance.destroy();
      };
    });
  });
}
