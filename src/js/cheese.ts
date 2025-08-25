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
        slider.querySelectorAll<HTMLElement>(".swiper-slide")
      );
      const firstChildText = slider.querySelector(
        ".swiper-slide:first-child .cheese__slider-card-text"
      );
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: slider,
          start: "bottom+=20% bottom",
          end: () => `center+=${100 * items.length}% center`,
          pin: element,
          pinSpacing: true,
          markers: false,
          scrub: true,
        },
      });

      items.forEach((item, itemIndex) => {
        // const isEven = (itemIndex + 1) % 2 === 0;
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
    }

    const darkBlueLayer = element.querySelector(".cheese__darkblue-layer");
    const pinkLayer = element.querySelector(".cheese__pink-layer");
    const waves = element.querySelector(".cheese__waves");
    const wavesImage = element.querySelector(".cheese__waves-image");

    if (darkBlueLayer && pinkLayer && waves) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: "bottom-=17% bottom",
          markers: false,
        },
      });

      tl.from(darkBlueLayer, {
        yPercent: -100,
        duration: 0.7,
        ease: "power2.out",
      });
      tl.from(
        pinkLayer,
        {
          yPercent: -100,
          duration: 0.7,
          ease: "power2.out",
        },
        "<+=0.2"
      );
      tl.from(
        waves,
        {
          yPercent: -100,
          duration: 0.7,
          ease: "power2.out",
        },
        "<+=0.2"
      );
      tl.from(
        wavesImage,
        {
          scaleY: 0,
          duration: 1.5,
          transformOrigin: "center top",
          ease: "expo.out",
        },
        "<"
      );
    }
  });
}
