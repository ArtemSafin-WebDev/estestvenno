export default function fixedHeader() {
  const pageHeader = document.querySelector<HTMLElement>(".page-header");

  if (!pageHeader) return;
  const checkHeader = () => {
    const offset = window.matchMedia("(max-width: 576px)").matches ? 0 : 150;
    if (window.scrollY > offset) {
      pageHeader.classList.add("page-header--fixed");
    } else {
      pageHeader.classList.remove("page-header--fixed");
    }
  };

  checkHeader();
  window.addEventListener("scroll", () => {
    checkHeader();
  });

  window.addEventListener("resize", checkHeader);
}
