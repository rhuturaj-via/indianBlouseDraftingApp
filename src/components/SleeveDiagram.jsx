import { forwardRef } from 'react';
import { formatInches } from '../lib/drafting';

const SCALE = 18;
const PADDING = 38;

function sx(value) {
  return PADDING + value * SCALE;
}

function sy(value) {
  return PADDING + value * SCALE;
}

const SleeveDiagram = forwardRef(function SleeveDiagram({ draft }, ref) {
  const width = sx(draft.width + 4);
  const height = sy(draft.height + 3);
  const piece = draft.piece;

  const sleeveShape = [
    `M ${sx(piece.topLeft.x)} ${sy(piece.topLeft.y)}`,
    `L ${sx(piece.topRight.x)} ${sy(piece.topRight.y)}`,
    `L ${sx(piece.topRight.x + 0.7)} ${sy(piece.topRight.y + 1.45)}`,
    `Q ${sx(piece.rightCurveAnchor.x)} ${sy(piece.rightCurveAnchor.y + 3)} ${sx(piece.bottomCenter.x)} ${sy(piece.bottomCenter.y)}`,
    `Q ${sx(piece.leftCurveAnchor.x)} ${sy(piece.leftCurveAnchor.y + 3.1)} ${sx(piece.topLeft.x + 1.1)} ${sy(piece.topLeft.y + 1.42)}`,
    `L ${sx(piece.topLeft.x)} ${sy(piece.topLeft.y)}`,
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
      <path d={sleeveShape} fill="rgba(248,241,229,0.94)" stroke="#36588a" strokeWidth="3.2" strokeLinejoin="round" />

      <circle cx={sx(piece.leftFrontNotch.x)} cy={sy(piece.leftFrontNotch.y)} r="4" fill="#d82a56" />
      <circle cx={sx(piece.rightBackNotch.x)} cy={sy(piece.rightBackNotch.y)} r="4" fill="#f78d08" />
      <circle cx={sx(piece.bottomCenter.x)} cy={sy(piece.bottomCenter.y)} r="3.6" fill="#36588a" />

      <text x={sx(0.24)} y={sy(0.82)} fill="#29344e" fontSize="16" fontWeight="700">Sleeve</text>
      <text x={sx(piece.leftFrontNotch.x + 0.34)} y={sy(piece.leftFrontNotch.y + 0.5)} fill="#d82a56" fontSize="12">
        Front notch
      </text>
      <text x={sx(piece.rightBackNotch.x - 2.1)} y={sy(piece.rightBackNotch.y + 0.5)} fill="#b64a07" fontSize="12">
        Back notch
      </text>
      <text x={sx(piece.bottomCenter.x - 0.7)} y={sy(piece.bottomCenter.y + 0.78)} fill="#36588a" fontSize="12">
        Sleeve dip
      </text>
      <text x={sx(piece.openingLeft.x - 0.25)} y={sy(piece.openingLeft.y + 0.88)} fill="#29344e" fontSize="12">
        Opening
      </text>

      <g transform={`translate(${sx(draft.width + 1)} ${sy(1.18)})`}>
        {draft.labels.map((item, index) => (
          <text key={item.label} y={index * 17} fill="#29344e" fontSize="11.5">
            {item.label}: {formatInches(item.value)}
          </text>
        ))}
      </g>
    </svg>
  );
});

export default SleeveDiagram;
