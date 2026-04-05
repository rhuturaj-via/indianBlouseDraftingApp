import { forwardRef } from 'react';
import { formatInches } from '../lib/drafting';

const SCALE = 28;
const PADDING = 36;

function sx(value) {
  return PADDING + value * SCALE;
}

function sy(value) {
  return PADDING + value * SCALE;
}

const FrontDiagram = forwardRef(function FrontDiagram({ draft }, ref) {
  const width = sx(draft.width + 6);
  const height = sy(draft.length + 2.8);
  const { center, side } = draft.pieces;

  const centerPiece = [
    `M ${sx(center.centerTop.x)} ${sy(center.centerBottom.y)}`,
    `L ${sx(center.centerTop.x)} ${sy(center.depthMark.y)}`,
    `Q ${sx(center.neckEnd.x * 0.52)} ${sy(0.06)} ${sx(center.neckEnd.x)} ${sy(center.neckEnd.y)}`,
    `L ${sx(center.shoulderEnd.x)} ${sy(center.shoulderEnd.y)}`,
    `Q ${sx(center.princessTop.x - 0.38)} ${sy(center.princessTop.y + 0.28)} ${sx(center.princessTop.x)} ${sy(center.princessTop.y)}`,
    `Q ${sx(center.apex.x - 0.52)} ${sy(center.apex.y)} ${sx(center.princessUnderBust.x)} ${sy(center.princessUnderBust.y)}`,
    `Q ${sx(center.princessHem.x - 0.1)} ${sy(center.princessHem.y - 0.65)} ${sx(center.princessHem.x)} ${sy(center.princessHem.y)}`,
    `L ${sx(center.centerTop.x)} ${sy(center.centerBottom.y)}`,
  ].join(' ');

  const sidePiece = [
    `M ${sx(side.princessTop.x)} ${sy(side.princessTop.y)}`,
    `Q ${sx(side.princessTop.x + 1.1)} ${sy(side.princessTop.y - 0.6)} ${sx(side.sideTop.x)} ${sy(side.sideTop.y)}`,
    `L ${sx(side.sideHem.x)} ${sy(side.sideHem.y)}`,
    `Q ${sx(side.sideUnderBust.x - 0.25)} ${sy(side.sideUnderBust.y - 0.55)} ${sx(side.sideUnderBust.x)} ${sy(side.sideUnderBust.y)}`,
    `Q ${sx(side.princessUnderBust.x + 0.78)} ${sy(side.princessUnderBust.y)} ${sx(side.princessUnderBust.x)} ${sy(side.princessUnderBust.y)}`,
    `Q ${sx(side.princessTop.x + 0.1)} ${sy(side.princessTop.y + 0.28)} ${sx(side.princessTop.x)} ${sy(side.princessTop.y)}`,
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
      <path d={centerPiece} fill="rgba(255,197,82,0.18)" stroke="#821d3d" strokeWidth="3.2" strokeLinejoin="round" />
      <path d={sidePiece} fill="rgba(54,88,138,0.1)" stroke="#36588a" strokeWidth="3.2" strokeLinejoin="round" />
      <rect
        x={sx(0)}
        y={sy(0)}
        width={sx(draft.guides.frontOpening) - sx(0)}
        height={sy(draft.length) - sy(0)}
        fill="rgba(255,255,255,0.8)"
        stroke="#c8d4e5"
        strokeWidth="1.8"
      />
      <circle cx={sx(center.apex.x)} cy={sy(center.apex.y)} r="4.4" fill="#f78d08" />

      <text x={sx(0.2)} y={sy(0.78)} fill="#29344e" fontSize="16" fontWeight="700">Front</text>
      <text x={sx(0.22)} y={sy(0.4)} fill="#29344e" fontSize="12">Boat neck</text>
      <text x={sx(center.princessTop.x + 0.22)} y={sy(center.princessTop.y - 0.2)} fill="#d82a56" fontSize="12">
        Princess seam
      </text>
      <text x={sx(center.apex.x + 0.18)} y={sy(center.apex.y - 0.18)} fill="#f78d08" fontSize="12">
        Bust point
      </text>
      <text x={sx(0.14)} y={sy(draft.length + 0.72)} fill="#36588a" fontSize="12">Opening strip</text>
      <text x={sx(side.sideTop.x - 0.82)} y={sy(side.sideTop.y - 0.18)} fill="#36588a" fontSize="12">Armhole</text>
      <text x={sx(0.8)} y={sy(draft.length + 1.45)} fill="#821d3d" fontSize="12">Center front piece</text>
      <text x={sx(draft.width - 2.7)} y={sy(draft.length + 1.45)} fill="#36588a" fontSize="12">Side front piece</text>

      <g transform={`translate(${sx(draft.width + 1)} ${sy(1.05)})`}>
        {draft.labels.map((item, index) => (
          <text key={item.label} y={index * 17} fill="#29344e" fontSize="11.5">
            {item.label}: {formatInches(item.value)}
          </text>
        ))}
      </g>
    </svg>
  );
});

export default FrontDiagram;
