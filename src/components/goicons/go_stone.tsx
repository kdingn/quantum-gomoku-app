// https://commons.wikimedia.org/wiki/Category:Go_(set_of_square_images)?uselang=ja
const SvgComponent = ({
  size = 100,
  text = "",
  outlineColor = "#FFFFFF",
  circleColor = "#FFFFFF",
  textColor = "#000000",
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
    <circle cx="50%" cy="50%" r={size / 2.3} fill={outlineColor} />
    <circle cx="50%" cy="50%" r={size / 2.5} fill={circleColor} />
    <text
      x="49%"
      y="54%"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={size / 2}
      fill={textColor}
    >
      {text}
    </text>
  </svg>
);

export default SvgComponent;
