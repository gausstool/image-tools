export function IconPng() {
  return (
    <svg width="24" height="24" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pngGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#FF9A00"></stop>
          <stop offset="100%" stop-color="#FF6B00"></stop>
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="15"
        fill="url(#pngGradient)"
        stroke="#FF9A00"
        stroke-width="2"
      ></rect>
      <rect x="25" y="25" width="70" height="50" fill="white" fill-opacity="0.9" rx="5"></rect>
      <circle cx="50" cy="45" r="8" fill="#FF6B00"></circle>
      <circle cx="70" cy="45" r="8" fill="#FF9A00" fill-opacity="0.7"></circle>
      <rect x="35" y="60" width="50" height="8" fill="#FF6B00" rx="4"></rect>
      <rect x="45" y="72" width="30" height="6" fill="#FF9A00" fill-opacity="0.7" rx="3"></rect>
    </svg>
  );
}
