import gsap from "gsap";

export default function productCard(): void {
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>(".product-card")
  );
  if (cards.length === 0) return;

  cards.forEach((card) => {
    const decors = Array.from(
      card.querySelectorAll<HTMLElement>(".product-card__decor")
    );
    if (decors.length === 0) return;

    const quickTos = decors.map((decor) => {
      const target =
        decor.querySelector<HTMLElement>(".product-card__decor-image") || decor;
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
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (evt.clientX - cx) / (rect.width / 2);
      const ny = (evt.clientY - cy) / (rect.height / 2);

      decors.forEach((decor, i) => {
        const depth = getDepth(i, decor);
        quickTos[i].xTo(nx * depth);
        quickTos[i].yTo(ny * depth);
      });
    };

    const onLeave = () => {
      decors.forEach((_, i) => {
        quickTos[i].xTo(0);
        quickTos[i].yTo(0);
      });
    };

    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
  });
}
