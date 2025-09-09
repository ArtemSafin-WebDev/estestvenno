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

    const wavesTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".contacts--with-cheese-two",
        start: "top bottom+=35%",
      },
    });

    wavesTl.from(".partners__darkblue-layer", {
      yPercent: -100,
      duration: 0.7,
      ease: "power2.out",
    });
    wavesTl.from(
      ".partners__pink-layer",
      {
        yPercent: -100,
        duration: 0.7,
        ease: "power2.out",
      },
      "<+=0.2"
    );
    wavesTl.from(
      ".contacts__cheese",
      {
        scaleY: 0,
        duration: 1.5,
        transformOrigin: "center bottom",
        ease: "expo.out",
      },
      "<"
    );
  });
}
