export default function clearInputBtns() {
  const elements = Array.from(
    document.querySelectorAll<HTMLButtonElement>(".js-clear-input-btn")
  );
  elements.forEach((element) => {
    const input = element.previousElementSibling?.matches("input, textarea")
      ? (element.previousElementSibling as HTMLInputElement)
      : null;
    if (!input) {
      console.error("Input not found");
      return;
    }
    element.addEventListener("click", (event) => {
      event.preventDefault();
      input.value = "";
      input.dispatchEvent(new Event("input"));
    });
  });
}
