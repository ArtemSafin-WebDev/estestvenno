import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { Pagination, EffectFade } from "swiper/modules";
import Swiper from "swiper";
import "swiper/css";
import "swiper/css/effect-fade";

gsap.registerPlugin(ScrollTrigger);

export default function cheese() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".cheese")
  );

  elements.forEach((element) => {
    let mm = gsap.matchMedia();
    const slider = element.querySelector(".cheese__slider");
    const container = element.querySelector<HTMLElement>(".swiper");
    const darkBlueLayer = element.querySelector(".cheese__darkblue-layer");
    const pinkLayer = element.querySelector(".cheese__pink-layer");
    const waves = element.querySelector(".cheese__waves");
    const wavesImage = element.querySelector(".cheese__waves-image");
    if (slider && container) {
      mm.add("(min-width: 577px)", () => {
        const items = Array.from(
          slider.querySelectorAll<HTMLElement>(".swiper-slide")
        );

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: slider,
            start: "bottom+=20% bottom",
            end: () => `center+=${150 * items.length}% center`,
            pin: ".pin-wrapper-first",
            pinSpacing: true,
            markers: false,
            scrub: true,
          },
        });

        items.forEach((item, itemIndex) => {
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
    const wavesTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".catalog",
        start: "top bottom+=35%",
        markers: false,
      },
    });

    wavesTl.from(darkBlueLayer, {
      yPercent: -100,
      duration: 0.7,
      ease: "power2.out",
    });
    wavesTl.from(
      pinkLayer,
      {
        yPercent: -100,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.2"
    );
    wavesTl.from(
      waves,
      {
        yPercent: -100,
        duration: 0.7,
        ease: "power2.out",
      },
      "-=0.2"
    );
    wavesTl.from(
      wavesImage,
      {
        scaleY: 0,
        duration: 1.5,
        transformOrigin: "center top",
        ease: "expo.out",
      },
      "<"
    );
  });
}
