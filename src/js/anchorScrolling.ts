import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { getScrollLookup } from "./getScrollLookup.js";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

export default function anchorScrolling() {
  const pageHeader = document.querySelector<HTMLElement>(".page-header");

  // Check which pinned containers exist on this page
  const firstWrapper = document.querySelector(".pin-wrapper-first");
  const secondWrapper = document.querySelector(".pin-wrapper-second");

  // Create position lookup functions only for existing pinned containers
  let getPositionFirst: ((element: Element) => number) | null = null;
  let getPositionSecond: ((element: Element) => number) | null = null;

  if (firstWrapper) {
    //@ts-ignore
    getPositionFirst = getScrollLookup("section", {
      pinnedContainer: ".pin-wrapper-first",
    });
  }

  if (secondWrapper) {
    //@ts-ignore
    getPositionSecond = getScrollLookup("section", {
      pinnedContainer: ".pin-wrapper-second",
    });
  }

  // Function to determine which pinned container an element belongs to
  function getElementPosition(element: Element): number {
    // Check if element is inside pin-wrapper-first
    if (firstWrapper && firstWrapper.contains(element) && getPositionFirst) {
      return getPositionFirst(element);
    }

    // Check if element is inside pin-wrapper-second
    if (secondWrapper && secondWrapper.contains(element) && getPositionSecond) {
      return getPositionSecond(element);
    }

    // For elements not in pinned containers, use regular positioning
    return element.getBoundingClientRect().top + window.pageYOffset;
  }

  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;
    if (target.matches("a") || target.closest("a")) {
      const link = target.matches("a")
        ? (target as HTMLAnchorElement)
        : target.closest<HTMLAnchorElement>("a");
      if (!link) return;

      const hash = link.hash;

      if (!hash) return;

      const element = document.querySelector(hash);
      if (element) {
        if (element.matches(".js-modal")) return;
        event.preventDefault();
        document.body.classList.remove("menu-open");

        history.replaceState({}, "", hash);

        gsap.to(window, {
          duration: 1.5,
          ease: "power2.out",
          scrollTo: {
            y: getElementPosition(element),
            autoKill: false,
            offsetY: pageHeader ? pageHeader.offsetHeight : 0,
          },
        });
      }
    }
  });

  if (window.location.hash) {
    window.addEventListener("load", () => {
      const hash = window.location.hash;

      if (!hash) return;
      const element = document.querySelector(hash);
      if (element) {
        console.log("Start element", element);
        if (element.matches(".js-modal")) return;
        document.body.classList.remove("menu-open");
        gsap.to(window, {
          duration: 0.4,
          ease: "none",
          scrollTo: {
            y: getElementPosition(element),
            autoKill: false,
            offsetY: pageHeader ? pageHeader.offsetHeight : 0,
          },
        });
      }
    });
  }
}
