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

    const heading = element.querySelector<HTMLElement>(".catalog__heading");

    if (heading) {
      const tl = gsap.timeline({
        scrollTrigger: {
          scrub: true,
          trigger: element,
          start: "top bottom",
          end: "bottom+=30% bottom",
          endTrigger: heading,
          markers: false,
        },
      });
      tl.from(
        heading,
        {
          rotate: -100,
          duration: 1,
          // autoAlpha: 0,
        },
        0
      );

      tl.from(
        heading,
        {
          autoAlpha: 0,
          duration: 0.3,
        },
        0.2
      );
    }

    const waves = element.querySelector(".catalog__bg-image");

    if (waves) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "top bottom",
        },
      });
      tl.from(waves, {
        scaleY: 0,
        duration: 2,
        transformOrigin: "center bottom",
        ease: "expo.out",
      });
    }
  });
}
