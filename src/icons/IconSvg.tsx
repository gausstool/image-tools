export function IconSvg() {
  return (
    <svg width="24" height="24" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="svgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#9B59B6"></stop>
          <stop offset="100%" stop-color="#8E44AD"></stop>
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="15"
        fill="url(#svgGradient)"
        stroke="#9B59B6"
        stroke-width="2"
      ></rect>
      <path
        d="M35,35 L50,65 L65,35 L80,75 L35,75 Z"
        fill="white"
        fill-opacity="0.9"
        stroke="#9B59B6"
        stroke-width="2"
      ></path>
      <circle cx="45" cy="50" r="4" fill="#9B59B6"></circle>
      <circle cx="60" cy="50" r="4" fill="#8E44AD"></circle>
      <circle cx="70" cy="65" r="4" fill="#9B59B6"></circle>
    </svg>
  );
}
