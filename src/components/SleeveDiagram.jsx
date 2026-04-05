import { forwardRef } from 'react';
import { formatInches } from '../lib/drafting';

const SCALE = 18;
const PADDING = 40;

function sx(value) {
  return PADDING + value * SCALE;
}

function sy(value) {
  return PADDING + value * SCALE;
}

const SleeveDiagram = forwardRef(function SleeveDiagram({ draft }, ref) {
  const width = sx(draft.width + 3);
  const height = sy(draft.height + 3);
  const { topLeft, topRight, frontNotch, backNotch, bottomCenter, bottomLeft, bottomRight } = draft.points;

  const sleevePiece = [
    `M ${sx(topLeft.x)} ${sy(topLeft.y)}`,
    `L ${sx(topRight.x)} ${sy(topRight.y)}`,
    `L ${sx(topRight.x + 0.7)} ${sy(topRight.y + 1.5)}`,
    `Q ${sx(draft.width * 0.76)} ${sy(draft.guides.topRise + 4.1)} ${sx(bottomCenter.x)} ${sy(bottomCenter.y)}`,
    `Q ${sx(draft.width * 0.24)} ${sy(draft.guides.topRise + 4.1)} ${sx(topLeft.x + 1.15)} ${sy(topLeft.y + 1.45)}`,
    `L ${sx(topLeft.x)} ${sy(topLeft.y)}`,
  ].join(' ');

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Sleeve draft"
    >
      <rect width={width} height={height} rx="26" fill="#fffdf9" />
      <path d={sleevePiece} fill="rgba(248,241,229,0.94)" stroke="#36588a" strokeWidth="3.1" strokeLinejoin="round" />
      <circle cx={sx(frontNotch.x)} cy={sy(frontNotch.y)} r="4" fill="#d82a56" />
      <circle cx={sx(backNotch.x)} cy={sy(backNotch.y)} r="4" fill="#f78d08" />
      <circle cx={sx(bottomCenter.x)} cy={sy(bottomCenter.y)} r="3.5" fill="#36588a" />

      <text x={sx(0.3)} y={sy(0.8)} fill="#29344e" fontSize="16" fontWeight="700">Sleeve</text>
      <text x={sx(frontNotch.x + 0.35)} y={sy(frontNotch.y + 0.45)} fill="#d82a56" fontSize="12">Front notch</text>
      <text x={sx(backNotch.x - 2.15)} y={sy(backNotch.y + 0.45)} fill="#b64a07" fontSize="12">Back notch</text>
      <text x={sx(bottomCenter.x - 0.9)} y={sy(bottomCenter.y + 0.75)} fill="#36588a" fontSize="12">Sleeve dip</text>
      <text x={sx(bottomLeft.x - 0.3)} y={sy(bottomLeft.y + 0.85)} fill="#29344e" fontSize="12">Opening</text>
      <text x={sx(bottomRight.x - 0.4)} y={sy(bottomRight.y + 0.85)} fill="#29344e" fontSize="12">Opening</text>

      <g transform={`translate(${sx(draft.width + 1.2)} ${sy(1.25)})`}>
        {draft.measurements.map((item, index) => (
          <text key={item.label} y={index * 17} fill="#29344e" fontSize="11.5">
            {item.label}: {formatInches(item.value)}
          </text>
        ))}
      </g>
    </svg>
  );
});

export default SleeveDiagram;
