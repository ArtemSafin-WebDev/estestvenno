import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function cheese() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".cheese")
  );

  elements.forEach((element) => {
    const slider = element.querySelector(".cheese__slider");
    if (slider) {
      const items = Array.from(
        slider.querySelectorAll<HTMLElement>(".swiper-slide:not(:first-child)")
      );
      const firstChildText = slider.querySelector(
        ".swiper-slide:first-child .cheese__slider-card-text"
      );
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slider,
          start: "center center",
          end: () => `center+=${100 * items.length}% center`,
          pin: element,
          pinSpacing: true,
          markers: false,
          scrub: true,
        },
      });

      if (firstChildText) {
        tl.to(firstChildText, {
          autoAlpha: 0,
          duration: 0.5,
        });
      }

      items.forEach((item, itemIndex) => {
        const text = item.querySelector(".cheese__slider-card-text");
        tl.to(item, {
          autoAlpha: 1,
          duration: 0.5,
        }).to(
          item,
          {
            top: 0,
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
    }

    const darkBlueLayer = element.querySelector(".cheese__darkblue-layer");
    const pinkLayer = element.querySelector(".cheese__pink-layer");

    if (darkBlueLayer && pinkLayer) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "bottom-=30 bottom",
        },
      });

      tl.from(darkBlueLayer, {
        yPercent: -100,
        duration: 1,
        ease: "expo.out",
      });
      tl.from(
        pinkLayer,
        {
          yPercent: -100,
          duration: 1,
          ease: "expo.out",
        },
        "<+=0.1"
      );
    }
  });
}
