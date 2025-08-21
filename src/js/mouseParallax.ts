import gsap from "gsap";
import { isTouch } from "./utils";

const setMouseParallax = (container: HTMLElement, elements: HTMLElement[]) => {
  if (elements.length === 0 || isTouch()) return;

  const quickTos = elements.map((decor) => {
    const target = decor.querySelector<HTMLElement>("img") || decor;
    target.style.willChange = "transform";
    return {
      xTo: gsap.quickTo(target, "x", { duration: 0.4, ease: "power3.out" }),
      yTo: gsap.quickTo(target, "y", { duration: 0.4, ease: "power3.out" }),
    };
  });

  const getDepth = (index: number, el: HTMLElement): number => {
    const fromAttr = el.dataset.depth ? Number(el.dataset.depth) : NaN;
    if (!Number.isNaN(fromAttr)) return fromAttr;
    if (index === 0) return 14;
    if (index === 1) return 10;
    return 6;
  };

  const onMove = (evt: MouseEvent) => {
    const rect = container.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const nx = (evt.clientX - cx) / (rect.width / 2);
    const ny = (evt.clientY - cy) / (rect.height / 2);

    elements.forEach((decor, i) => {
      const depth = getDepth(i, decor);
      quickTos[i].xTo(nx * depth);
      quickTos[i].yTo(ny * depth);
    });
  };

  const onLeave = () => {
    elements.forEach((_, i) => {
      quickTos[i].xTo(0);
      quickTos[i].yTo(0);
    });
  };

  container.addEventListener("mousemove", onMove);
  container.addEventListener("mouseleave", onLeave);
};

export default setMouseParallax;
