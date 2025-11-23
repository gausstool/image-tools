export function IconWebp() {
  return (
    <svg width="24" height="24" viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="webpGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4CD964"></stop>
          <stop offset="100%" stop-color="#2ECC71"></stop>
        </linearGradient>
      </defs>
      <rect
        x="10"
        y="10"
        width="100"
        height="100"
        rx="15"
        fill="url(#webpGradient)"
        stroke="#4CD964"
        stroke-width="2"
      ></rect>
      <circle cx="60" cy="50" r="25" fill="white" fill-opacity="0.9"></circle>
      <path d="M45,50 A15,15 0 1,1 75,50 A15,15 0 1,1 45,50" fill="#4CD964" fill-opacity="0.7"></path>
      <circle cx="55" cy="50" r="10" fill="#2ECC71"></circle>
      <rect x="45" y="70" width="30" height="8" fill="#2ECC71" rx="4"></rect>
      <rect x="50" y="82" width="20" height="5" fill="#4CD964" rx="2.5"></rect>
    </svg>
  );
}
