/*
 * Lucide 1.x no longer ships brand logos, so these are drawn in the same style
 * (24×24 grid, round stroke) to sit alongside lucide-react icons.
 */
const base = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

export function InstagramIcon({ size = 20, strokeWidth = 1.5, ...props }) {
  return (
    <svg {...base} width={size} height={size} strokeWidth={strokeWidth} {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </svg>
  );
}

export function TikTokIcon({ size = 20, strokeWidth = 1.5, ...props }) {
  return (
    <svg {...base} width={size} height={size} strokeWidth={strokeWidth} {...props}>
      <path d="M9 12a4 4 0 1 0 4 4V3a5 5 0 0 0 5 5" />
    </svg>
  );
}
