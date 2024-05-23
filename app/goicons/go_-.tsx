const SvgComponent = ({ background = "#DCB35C", line = "#000" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
    <rect width="500" height="500" fill={background} />
    <path stroke={line} strokeWidth="20" d="M0,250H500M250,0V500" />
    <circle cx="250" cy="250" r="50" fill={line} />
  </svg>
);

export default SvgComponent;
