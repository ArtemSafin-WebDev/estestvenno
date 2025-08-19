import { isTouch } from "./utils";
import gsap from "gsap";

type MagneticConfig = {
  maxTranslatePx: number;
  activationDistancePx: number;
  tweenDurationSec: number;
};

type MagneticItem = {
  button: HTMLElement;
  element: HTMLElement;
  xTo: (value: number) => void;
  yTo: (value: number) => void;
};

function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function magnet(): void {
  if (isTouch()) return;

  const config: MagneticConfig = {
    maxTranslatePx: 40,
    activationDistancePx: 110,
    tweenDurationSec: 0.45,
  };

  const buttons = Array.from(
    document.querySelectorAll<HTMLElement>(".js-magnet-btn")
  );
  if (buttons.length === 0) return;

  const items: MagneticItem[] = [];

  buttons.forEach((button) => {
    const element = button.querySelector<HTMLElement>(".js-magnet-btn-element");
    if (!element) return;

    // Hint the browser for smoother transforms
    element.style.willChange = "transform";

    const xTo = gsap.quickTo(element, "x", {
      duration: config.tweenDurationSec,
      ease: "expo.out",
      overwrite: "auto",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: config.tweenDurationSec,
      ease: "expo.out",
      overwrite: "auto",
    });

    items.push({ button, element, xTo, yTo });
  });

  if (items.length === 0) return;

  let mouseX = 0;
  let mouseY = 0;
  let hasPointer = false;

  const onMouseMove = (event: MouseEvent) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    hasPointer = true;
    updateTargetsAndAnimate();
  };

  const updateTargetsAndAnimate = () => {
    if (!hasPointer) return;

    for (const item of items) {
      const rect = item.button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.hypot(dx, dy);

      let targetX = 0;
      let targetY = 0;
      if (distance < config.activationDistancePx) {
        const factor = config.maxTranslatePx / config.activationDistancePx;
        const influence = Math.pow(
          1 - distance / config.activationDistancePx,
          2
        );
        targetX = clamp(
          dx * factor * influence,
          -config.maxTranslatePx,
          config.maxTranslatePx
        );
        targetY = clamp(
          dy * factor * influence,
          -config.maxTranslatePx,
          config.maxTranslatePx
        );
      }

      item.xTo(targetX);
      item.yTo(targetY);
    }
  };

  // Interaction lifecycle
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      for (const item of items) {
        gsap.to(item.element, {
          x: 0,
          y: 0,
          duration: 0.2,
          ease: "expo.out",
          overwrite: "auto",
        });
      }
    }
  });
}
