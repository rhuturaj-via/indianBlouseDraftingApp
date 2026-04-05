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

const FrontDiagram = forwardRef(function FrontDiagram({ draft }, ref) {
  const width = sx(draft.width + 5.5);
  const height = sy(draft.length + 2.8);
  const {
    centerTop,
    centerBottom,
    neckEnd,
    shoulderEnd,
    princessTop,
    princessWaist,
    bustPoint,
    sideSeamTop,
    sideSeamWaist,
    openingTop,
    openingBottom,
    frontDepthMark,
  } = draft.points;

  const centerPiece = [
    `M ${sx(centerTop.x)} ${sy(centerBottom.y)}`,
    `L ${sx(centerTop.x)} ${sy(frontDepthMark.y)}`,
    `Q ${sx(neckEnd.x * 0.45)} ${sy(0.08)} ${sx(neckEnd.x)} ${sy(neckEnd.y)}`,
    `L ${sx(shoulderEnd.x)} ${sy(shoulderEnd.y)}`,
    `Q ${sx(princessTop.x - 0.35)} ${sy(draft.guides.armholeDepth - 0.25)} ${sx(princessTop.x)} ${sy(princessTop.y)}`,
    `Q ${sx(bustPoint.x - 0.55)} ${sy(bustPoint.y)} ${sx(princessWaist.x)} ${sy(princessWaist.y)}`,
    `L ${sx(centerTop.x)} ${sy(centerBottom.y)}`,
  ].join(' ');

  const sidePiece = [
    `M ${sx(princessTop.x)} ${sy(princessTop.y)}`,
    `Q ${sx(bustPoint.x + 0.95)} ${sy(bustPoint.y - 0.12)} ${sx(princessWaist.x)} ${sy(princessWaist.y)}`,
    `L ${sx(sideSeamWaist.x)} ${sy(sideSeamWaist.y)}`,
    `L ${sx(sideSeamTop.x)} ${sy(sideSeamTop.y)}`,
    `Q ${sx(sideSeamTop.x - 0.5)} ${sy(draft.guides.armholeDepth - 0.75)} ${sx(princessTop.x)} ${sy(princessTop.y)}`,
  ].join(' ');

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Front blouse draft"
    >
      <rect width={width} height={height} rx="26" fill="#fffdf9" />
      <rect x={sx(0)} y={sy(0)} width={sx(draft.width) - sx(0)} height={sy(draft.length) - sy(0)} fill="none" stroke="#d8dfeb" strokeDasharray="7 7" />

      <path d={centerPiece} fill="rgba(255,197,82,0.18)" stroke="#821d3d" strokeWidth="3.1" strokeLinejoin="round" />
      <path d={sidePiece} fill="rgba(54,88,138,0.1)" stroke="#36588a" strokeWidth="3.1" strokeLinejoin="round" />
      <rect
        x={sx(openingTop.x)}
        y={sy(openingTop.y)}
        width={sx(draft.guides.openingWidth) - sx(0)}
        height={sy(openingBottom.y) - sy(openingTop.y)}
        fill="rgba(255,255,255,0.75)"
        stroke="#b7c4d8"
        strokeWidth="2"
      />

      <circle cx={sx(bustPoint.x)} cy={sy(bustPoint.y)} r="4.5" fill="#f78d08" />

      <text x={sx(0.2)} y={sy(0.78)} fill="#29344e" fontSize="16" fontWeight="700">Front part</text>
      <text x={sx(0.25)} y={sy(0.38)} fill="#29344e" fontSize="12">Boat neck</text>
      <text x={sx(princessTop.x + 0.2)} y={sy(princessTop.y - 0.18)} fill="#d82a56" fontSize="12">Princess seam</text>
      <text x={sx(bustPoint.x + 0.18)} y={sy(bustPoint.y - 0.18)} fill="#f78d08" fontSize="12">Apex</text>
      <text x={sx(openingTop.x + 0.12)} y={sy(draft.length + 0.7)} fill="#36588a" fontSize="12">Front opening</text>
      <text x={sx(sideSeamTop.x - 0.85)} y={sy(sideSeamTop.y - 0.16)} fill="#36588a" fontSize="12">Armhole</text>

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

export default FrontDiagram;
