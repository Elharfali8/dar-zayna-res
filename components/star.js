/** 8-point star (two overlapping squares) as SVG polygon points, centred on (cx, cy) with outer radius R. */
export function starPoints(cx, cy, R) {
  const r = (R * Math.cos(Math.PI / 4)) / Math.cos(Math.PI / 8);
  return Array.from({ length: 16 }, (_, i) => {
    const angle = (i * Math.PI) / 8 - Math.PI / 2;
    const radius = i % 2 === 0 ? R : r;
    return `${(cx + radius * Math.cos(angle)).toFixed(2)},${(cy + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");
}
