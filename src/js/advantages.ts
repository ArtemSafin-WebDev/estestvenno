import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import Swiper from "swiper";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
gsap.registerPlugin(ScrollTrigger);

export default function advantages() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".advantages")
  );

  elements.forEach((element) => {
    let mm = gsap.matchMedia();
    const items = Array.from(
      element.querySelectorAll<HTMLElement>(
        ".advantages__slider .swiper-slide:not(:first-child)"
      )
    );
    const slider = element.querySelector<HTMLElement>(".advantages__slider");
    const container = slider?.querySelector<HTMLElement>(
      ".advantages__slider .swiper"
    );
    mm.add("(min-width: 577px)", () => {
      if (items.length > 1) {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: element,
            start: "top+=100 top",
            end: () => `top+=${66 * items.length}% top`,
            pin: true,
            pinSpacing: true,
            markers: false,
            scrub: true,
          },
        });

        items.forEach((item) => {
          tl.to(item, {
            autoAlpha: 1,
            duration: 0.5,
          }).to(
            item,
            {
              left: 0,
              duration: 1,
            },
            "<"
          );
        });
      }
    });
    if (slider && container)
      mm.add("(max-width: 576px)", () => {
        console.log("Intialising slider");
        const instance = new Swiper(container, {
          speed: 600,
          modules: [Pagination],
          // autoHeight: true,
          pagination: {
            el: slider.querySelector<HTMLElement>(
              ".advantages__slider-pagination"
            ),
            type: "bullets",
            clickable: true,
          },
          // on: {
          //   slideChangeTransitionEnd: () => {
          //     ScrollTrigger.refresh();
          //   },
          // },
        });

        return () => {
          instance.destroy();
        };
      });

    const shopsSlider = element.querySelector<HTMLElement>(
      ".advantages__shops-slider .swiper"
    );

    if (shopsSlider) {
      new Swiper(shopsSlider, {
        speed: 600,
        modules: [Autoplay, EffectFade],
        effect: "fade",
        allowTouchMove: false,
        loop: true,
        fadeEffect: {
          crossFade: true,
        },
        autoplay: {
          delay: 600,
          disableOnInteraction: false,
        },
      });
    }
  });
}
