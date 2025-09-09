import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Pagination, EffectFade } from "swiper/modules";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

export default function partnersIntro() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".partners-intro")
  );
  elements.forEach((element) => {
    let mm = gsap.matchMedia();
    const slider = element.querySelector(".cheese__slider");
    const container = element.querySelector<HTMLElement>(".swiper");

    if (slider && container) {
      mm.add("(min-width: 577px)", () => {
        const items = Array.from(
          slider.querySelectorAll<HTMLElement>(".swiper-slide")
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slider,
            start: "top top+=20%",
            end: () => `top+=${100 * items.length}% top`,
            pin: ".pin-wrapper-first",
            pinSpacing: true,
            markers: false,
            scrub: true,
          },
        });

        items.forEach((item, itemIndex) => {
          // if (itemIndex === 0) return;
          const text = item.querySelector(".cheese__slider-card-text");
          tl.to(item, {
            autoAlpha: 1,
            duration: 0.5,
          }).to(
            item,
            {
              x: 0,
              duration: 1,
            },
            "<"
          );
          if (itemIndex + 1 < items.length) {
            tl.to(
              text,
              {
                autoAlpha: 0,
                duration: 0.4,
              },
              "-=0.1"
            );
          }
        });
      });

      mm.add("(max-width: 576px)", () => {
        const instance = new Swiper(container, {
          speed: 600,
          modules: [Pagination, EffectFade],
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
          pagination: {
            el: slider.querySelector<HTMLElement>(".cheese__slider-pagination"),
            type: "bullets",
            clickable: true,
          },
        });

        return () => {
          instance.destroy();
        };
      });
    }
  });
}
