import { isTouch } from "./utils";
import gsap from "gsap";
/**
 * Magnetic pointer effect for elements with class `.js-magnet-btn`.
 *
 * Behavior:
 * - Tracks mouse position and, for each button, moves the inner element
 *   `.js-magnet-btn-element` toward the cursor when the cursor is within a
 *   configurable activation radius.
 * - Uses GSAP `quickTo` for smooth, interruptible tweens of translateX/translateY.
 * - Disabled automatically on touch devices to avoid interfering with touch UX.
 */

// Tunable parameters controlling strength and feel of the effect
type MagneticConfig = {
  // Maximum translation (in pixels) the inner element can travel along each axis
  maxTranslatePx: number;
  // Radius (in pixels) around the button center where the effect engages
  activationDistancePx: number;
  // GSAP tween duration for each positional update
  tweenDurationSec: number;
};

// Cached references and tween updaters for each magnetic button
type MagneticItem = {
  // The outer button with class `.js-magnet-btn`
  button: HTMLElement;
  // The inner element that will be pulled (e.g., circle) `.js-magnet-btn-element`
  element: HTMLElement;
  // GSAP quickTo setters for performant, interruptible updates
  xTo: (value: number) => void;
  yTo: (value: number) => void;
};

// Utility to clamp a numeric value into a [min, max] range
function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

export default function magnet(): void {
  // Skip on touch-first environments; magnetic hover is a pointer UX
  if (isTouch()) return;

  const config: MagneticConfig = {
    maxTranslatePx: 60,
    activationDistancePx: 110,
    tweenDurationSec: 0.45,
  };

  // Collect all magnetic buttons on the page
  const buttons = Array.from(
    document.querySelectorAll<HTMLElement>(".js-magnet-btn")
  );
  if (buttons.length === 0) return;

  const items: MagneticItem[] = [];

  // Prepare each button: find its inner element and create fast GSAP setters
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

  // Track the pointer position and trigger an update tick
  const onMouseMove = (event: MouseEvent) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
    hasPointer = true;
    updateTargetsAndAnimate();
  };

  // Compute target offsets for each item and animate toward them
  const updateTargetsAndAnimate = () => {
    if (!hasPointer) return;

    for (const item of items) {
      // Measure button center in viewport coordinates
      const rect = item.button.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const dx = mouseX - centerX;
      const dy = mouseY - centerY;
      const distance = Math.hypot(dx, dy);

      let targetX = 0;
      let targetY = 0;
      item.button.classList.remove("mouse-inside");
      if (distance < config.activationDistancePx) {
        item.button.classList.add("mouse-inside");
        // Map cursor offset into a capped translation, scaled by proximity
        const factor = config.maxTranslatePx / config.activationDistancePx;
        // Non-linear falloff for smoother feel near the edge of the radius
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

      // Apply updated targets via quickTo tweens
      item.xTo(targetX);
      item.yTo(targetY);
    }
  };

  // Interaction lifecycle
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      for (const item of items) {
        // Reset elements quickly when the tab becomes hidden
        gsap.to(item.element, {
          x: 0,
          y: 0,
          duration: 0.2,
          ease: "expo.out",
          overwrite: "auto",
        });
        item.button.classList.remove("mouse-inside");
      }
    }
  });
}
