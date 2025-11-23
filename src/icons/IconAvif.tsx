export function IconAvif() {
  return (
    <svg width="24" height="24" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="avifGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF3B30"></stop>
          <stop offset="100%" stop-color="#CC0000"></stop>
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="15"
        fill="url(#avifGradient)"
        stroke="#FF3B30"
        stroke-width="2"
      ></rect>
      <polygon points="40,35 80,35 70,65 50,85 40,65" fill="white" fill-opacity="0.9"></polygon>
      <circle cx="55" cy="50" r="8" fill="#FF3B30"></circle>
      <rect x="45" y="65" width="20" height="8" fill="#CC0000" rx="4"></rect>
      <rect x="48" y="77" width="14" height="5" fill="#FF3B30" fill-opacity="0.7" rx="2.5"></rect>
    </svg>
  );
}
