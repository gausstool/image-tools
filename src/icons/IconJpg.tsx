export function IconJpg() {
  return (
    <svg width="24" height="24" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="jpgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1E90FF"></stop>
          <stop offset="100%" stop-color="#0066CC"></stop>
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="15"
        fill="url(#jpgGradient)"
        stroke="#1E90FF"
        stroke-width="2"
      ></rect>
      <path d="M30,30 L90,30 L90,70 L70,90 L30,90 Z" fill="white" fill-opacity="0.9"></path>
      <rect x="40" y="40" width="40" height="25" fill="#1E90FF" rx="3"></rect>
      <circle cx="60" cy="52" r="8" fill="white"></circle>
      <rect x="45" y="70" width="30" height="8" fill="#0066CC" rx="4"></rect>
      <rect x="50" y="82" width="20" height="5" fill="#1E90FF" fill-opacity="0.7" rx="2.5"></rect>
    </svg>
  );
}
