export default function menu() {
  const menu = document.querySelector(".page-header");
  if (!menu) return;

  const menuOpen = document.querySelector<HTMLButtonElement>(
    ".page-header__menu-open"
  );
  const menuClose = document.querySelector<HTMLButtonElement>(
    ".page-header__menu-close"
  );

  menuOpen?.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.add("menu-open");
  });
  menuClose?.addEventListener("click", (event) => {
    event.preventDefault();
    document.body.classList.remove("menu-open");
  });
}
