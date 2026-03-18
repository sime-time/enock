export function scrollToSection(href: string, event?: MouseEvent): void {
  if (!href.startsWith("#")) return;

  event?.preventDefault();

  const target = document.querySelector<HTMLElement>(href);
  if (!target) return;

  const navOffset = 0;
  const top = target.getBoundingClientRect().top + window.scrollY - navOffset;

  window.scrollTo({ top, behavior: "smooth" });
}
