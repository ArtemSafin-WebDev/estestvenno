import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";
import { EffectFade, Navigation } from "swiper/modules";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function catalog() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".catalog")
  );
  elements.forEach((element) => {
    const asideSliders = Array.from(
      element.querySelectorAll(".catalog__aside-slider")
    );
    asideSliders.forEach((slider) => {
      const container = slider.querySelector<HTMLElement>(".swiper");
      if (!container) return;
      const prevArrow = slider.querySelector<HTMLButtonElement>(
        ".catalog__aside-slider-arrow--prev"
      );
      console.log(container, prevArrow);
      new Swiper(container, {
        speed: 600,

        // effect: "fade",
        autoHeight: true,
        // fadeEffect: {
        //   crossFade: true,
        // },
        modules: [Navigation, EffectFade],
        navigation: {
          prevEl: slider.querySelector<HTMLButtonElement>(
            ".catalog__aside-slider-arrow--prev"
          ),
          nextEl: slider.querySelector<HTMLButtonElement>(
            ".catalog__aside-slider-arrow--next"
          ),
        },
      });
    });

    const tabBtns = Array.from(
      element.querySelectorAll<HTMLLinkElement>(".catalog__nav-link")
    );
    const tabItems = Array.from(
      element.querySelectorAll<HTMLElement>(".catalog__tab")
    );

    const setActive = (index: number) => {
      tabBtns.forEach((btn) => btn.classList.remove("active"));
      tabItems.forEach((item) => item.classList.remove("active"));
      tabBtns[index]?.classList.add("active");
      tabItems[index]?.classList.add("active");
      ScrollTrigger.refresh();
    };

    tabBtns.forEach((btn, btnIndex) => {
      btn.addEventListener("click", (event) => {
        event.preventDefault();
        setActive(btnIndex);
      });
    });

    // Mouse parallax effect for product card decor elements
    const productCards = Array.from(
      element.querySelectorAll<HTMLElement>(".product-card")
    );

    productCards.forEach((card) => {
      const decors = Array.from(
        card.querySelectorAll<HTMLElement>(".product-card__decor")
      );
      if (decors.length === 0) return;

      const quickTos = decors.map((decor) => {
        // Move the inner image so the wrapper's transform (scale) remains controlled by CSS
        const target =
          decor.querySelector<HTMLElement>(".product-card__decor-image") ||
          decor;
        target.style.willChange = "transform";
        return {
          xTo: gsap.quickTo(target, "x", { duration: 0.4, ease: "power3.out" }),
          yTo: gsap.quickTo(target, "y", { duration: 0.4, ease: "power3.out" }),
        };
      });

      const getDepth = (index: number, el: HTMLElement): number => {
        const fromAttr = el.dataset.depth ? Number(el.dataset.depth) : NaN;
        if (!Number.isNaN(fromAttr)) return fromAttr;
        // Reasonable defaults by layer order
        if (index === 0) return 14;
        if (index === 1) return 10;
        return 6;
      };

      const onMove = (evt: MouseEvent) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        // Normalize to [-1, 1]
        const nx = (evt.clientX - cx) / (rect.width / 2);
        const ny = (evt.clientY - cy) / (rect.height / 2);

        decors.forEach((decor, i) => {
          const depth = getDepth(i, decor);
          // Invert Y so upward movement is positive visually if desired
          quickTos[i].xTo(nx * depth);
          quickTos[i].yTo(ny * depth);
        });
      };

      const onLeave = () => {
        decors.forEach((_, i) => {
          quickTos[i].xTo(0);
          quickTos[i].yTo(0);
        });
      };

      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
    });
  });
}
