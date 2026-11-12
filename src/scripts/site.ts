// Small progressive enhancements. Everything works and is readable without this script.
const OPEN = 9;
const CLOSE = 19;
const CALLS_UNTIL = 22;

/** Current time in Kyiv as minutes since midnight. */
function kyivMinutes(): number {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Kyiv", hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? 0);
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? 0);
  return h * 60 + m;
}
const fmt = (min: number) => `${Math.floor(min / 60)}:${String(min % 60).padStart(2, "0")}`;

function updateTime(): void {
  const now = kyivMinutes();
  const h = now / 60;
  let state = "closed";
  let text = "Телефонуйте завтра з 9:00";
  if (h >= OPEN && h < CLOSE) { state = "open"; text = "Зараз відчинено, до 19:00"; }
  else if (h >= CLOSE && h < CALLS_UNTIL) { state = "calls"; text = "СТО зачинено, дзвінки до 22:00"; }
  else if (h < OPEN) { text = "Телефонуйте сьогодні з 9:00"; }
  document.querySelectorAll<HTMLElement>("[data-status]").forEach((el) => {
    el.textContent = text;
    el.dataset.state = state;
    el.hidden = false;
  });
  document.querySelectorAll<HTMLElement>("[data-now]").forEach((el) => {
    const pct = (now / 1440) * 100;
    el.style.setProperty("--now", String(pct));
    el.dataset.edge = pct < 8 ? "start" : pct > 92 ? "end" : "";
    const label = el.querySelector<HTMLElement>("[data-now-label]");
    if (label) label.textContent = `Зараз ${fmt(now)}`;
    el.hidden = false;
  });
}
updateTime();
window.setInterval(updateTime, 60_000);

// Disclosures (phone list, mobile menu): Esc and a click outside close them; links inside close the menu.
const disclosures = Array.from(document.querySelectorAll<HTMLDetailsElement>("details[data-dismiss]"));
document.addEventListener("click", (e) => {
  for (const d of disclosures) if (d.open && !d.contains(e.target as Node)) d.open = false;
});
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  for (const d of disclosures) {
    if (!d.open) continue;
    d.open = false;
    d.querySelector<HTMLElement>("summary")?.focus();
  }
});
for (const d of disclosures) {
  d.addEventListener("toggle", () => {
    if (d.open) for (const o of disclosures) if (o !== d) o.open = false;
  });
  d.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) => a.addEventListener("click", () => { d.open = false; }));
}

// Mobile call bar appears after the first screen has scrolled away.
const hero = document.getElementById("hero");
const bar = document.querySelector<HTMLElement>("[data-callbar]");
if (hero && bar && "IntersectionObserver" in window) {
  document.documentElement.classList.add("has-callbar");
  new IntersectionObserver(([entry]) => {
    bar.classList.toggle("is-shown", !entry?.isIntersecting);
  }, { threshold: 0 }).observe(hero);
}

// FutureLink on touch: a tap shows the «in development» hint for a moment (hover/focus do not exist there). No navigation.
{
  let timer = 0;
  const hide = () => document.querySelectorAll(".future-link.is-tapped").forEach((el) => el.classList.remove("is-tapped"));
  document.addEventListener("click", (e) => {
    const link = (e.target as Element).closest<HTMLElement>(".future-link");
    window.clearTimeout(timer);
    hide();
    if (!link) return;
    link.classList.add("is-tapped");
    timer = window.setTimeout(hide, 2600);
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") hide(); });
}
