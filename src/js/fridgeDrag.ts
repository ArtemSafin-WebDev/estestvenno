import gsap from "gsap";
import { Draggable, InertiaPlugin } from "gsap/all";

gsap.registerPlugin(Draggable, InertiaPlugin);
export default function fridgeDrag() {
  const elements = Array.from(
    document.querySelectorAll<HTMLElement>(".js-fridge-drag")
  );
  elements.forEach((element) => {
    const items = Array.from(
      element.querySelectorAll<HTMLElement>("[data-drag-item]")
    );
    items.forEach((item) => {
      Draggable.create(item, {
        // type: "x",
        inertia: true,
        dragResistance: 0.3,
        bounds: element,
      });
    });
  });
}
