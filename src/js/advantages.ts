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
            trigger: slider,
            start: "center center",
            end: () => `center+=${400 * items.length}% center`,
            pin: ".pin-wrapper-second",
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
        const instance = new Swiper(container, {
          speed: 600,
          modules: [Pagination],
          pagination: {
            el: slider.querySelector<HTMLElement>(
              ".advantages__slider-pagination"
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
