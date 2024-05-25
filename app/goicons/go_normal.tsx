// https://commons.wikimedia.org/wiki/Category:Go_(set_of_square_images)?uselang=ja
const SvgComponent = ({
  background = "#DCB35C",
  line = "#000",
  size = 100,
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
    <rect width={size} height={size} fill={background} />
    <path
      stroke={line}
      strokeWidth={size / 25}
      d={`M0,${size / 2}H${size}M${size / 2},0V${size}`}
    />
    <circle cx={size / 2} cy={size / 2} r={size / 10} fill={line} />
  </svg>
);

export default SvgComponent;
