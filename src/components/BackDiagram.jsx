import { forwardRef } from 'react';
import { formatInches } from '../lib/drafting';

const SCALE = 28;
const PADDING = 38;

function sx(value) {
  return PADDING + value * SCALE;
}

function sy(value) {
  return PADDING + value * SCALE;
}

const BackDiagram = forwardRef(function BackDiagram({ draft }, ref) {
  const width = sx(draft.width + 5.5);
  const height = sy(draft.length + 2.8);
  const {
    centerTop,
    centerBottom,
    neckEnd,
    shoulderEnd,
    sideSeamTop,
    sideSeamWaist,
    dartTop,
    dartLeft,
    dartRight,
    backDepthMark,
  } = draft.points;

  const backPiece = [
    `M ${sx(centerTop.x)} ${sy(centerBottom.y)}`,
    `L ${sx(centerTop.x)} ${sy(backDepthMark.y)}`,
    `Q ${sx(neckEnd.x * 0.52)} ${sy(0.04)} ${sx(neckEnd.x)} ${sy(neckEnd.y)}`,
    `L ${sx(shoulderEnd.x)} ${sy(shoulderEnd.y)}`,
    `Q ${sx(sideSeamTop.x - 0.75)} ${sy(draft.guides.armholeDepth - 0.2)} ${sx(sideSeamTop.x)} ${sy(sideSeamTop.y)}`,
    `L ${sx(sideSeamWaist.x)} ${sy(sideSeamWaist.y)}`,
    `L ${sx(centerTop.x)} ${sy(centerBottom.y)}`,
  ].join(' ');

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Back blouse draft"
    >
      <rect width={width} height={height} rx="26" fill="#fffdf9" />
      <rect x={sx(0)} y={sy(0)} width={sx(draft.width) - sx(0)} height={sy(draft.length) - sy(0)} fill="none" stroke="#d8dfeb" strokeDasharray="7 7" />

      <path d={backPiece} fill="rgba(54,88,138,0.09)" stroke="#29344e" strokeWidth="3.1" strokeLinejoin="round" />
      <path d={`M ${sx(dartLeft.x)} ${sy(dartLeft.y)} L ${sx(dartTop.x)} ${sy(dartTop.y)} L ${sx(dartRight.x)} ${sy(dartRight.y)}`} fill="none" stroke="#36588a" strokeWidth="2.4" />

      <text x={sx(0.2)} y={sy(0.78)} fill="#29344e" fontSize="16" fontWeight="700">Back part</text>
      <text x={sx(0.25)} y={sy(0.38)} fill="#29344e" fontSize="12">Boat neck</text>
      <text x={sx(sideSeamTop.x - 0.85)} y={sy(sideSeamTop.y - 0.16)} fill="#36588a" fontSize="12">Back armhole</text>
      <text x={sx(dartTop.x + 0.18)} y={sy(dartTop.y + 0.12)} fill="#36588a" fontSize="12">Back dart</text>
      <text x={sx(0.18)} y={sy(draft.length + 0.7)} fill="#29344e" fontSize="12">Center back fold</text>

      <g transform={`translate(${sx(draft.width + 0.9)} ${sy(1.1)})`}>
        {draft.measurements.map((item, index) => (
          <text key={item.label} y={index * 17} fill="#29344e" fontSize="11.5">
            {item.label}: {formatInches(item.value)}
          </text>
        ))}
      </g>
    </svg>
  );
});

export default BackDiagram;
