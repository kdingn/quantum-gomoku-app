// https://commons.wikimedia.org/wiki/Category:Go_(set_of_square_images)?uselang=ja
const SvgComponent = ({
  backgroundColor = "#DCB35C",
  lineColor = "#000",
  size = 100,
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
    <rect width={size} height={size} fill={backgroundColor} />
    <path
      stroke={lineColor}
      strokeWidth={size / 25}
      d={`M${(size / 25) * 12},${size / 2}H${size}M${size / 2},0V${size}`}
    />
  </svg>
);

export default SvgComponent;
