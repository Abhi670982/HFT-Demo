export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function scrollToId(id: string) {
  if (typeof document === "undefined") return;
  const el = document.getElementById(id.replace(/^#/, ""));
  el?.scrollIntoView({ behavior: "smooth", block: "start" });
}
