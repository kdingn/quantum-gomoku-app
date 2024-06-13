// https://commons.wikimedia.org/wiki/Category:Go_(set_of_square_images)?uselang=ja
const SvgComponent = ({
  backgroundColor = "#DCB35C",
  lineColor = "#000",
  size = 100,
  text = "",
  circleColor = "#FFFFFF",
  textColor = "#000000",
  onlyStone = false,
}) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
    <rect width={size} height={size} fill={backgroundColor} />
    <path
      stroke={lineColor}
      strokeWidth={size / 25}
      d={`M0,${size / 2}H${(size / 25) * 13}M${size / 2},0V${size}`}
    />
    {text && (
      <>
        <circle cx="50%" cy="50%" r={size / 2.3} fill={circleColor} />
        {!onlyStone && (
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
        )}
      </>
    )}
  </svg>
);

export default SvgComponent;
