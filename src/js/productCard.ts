import setMouseParallax from "./mouseParallax";

export default function productCard() {
  const cards = Array.from(
    document.querySelectorAll<HTMLElement>(".product-card")
  );
  if (cards.length === 0) return;

  cards.forEach((card) => {
    const parts = Array.from(
      card.querySelectorAll<HTMLElement>(".product-card__decor")
    );
    setMouseParallax(card, parts);
  });
}
