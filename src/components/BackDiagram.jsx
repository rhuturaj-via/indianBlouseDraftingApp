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

const BackDiagram = forwardRef(function BackDiagram({ draft }, ref) {
  const width = sx(draft.width + 5.8);
  const height = sy(draft.length + 2.8);
  const piece = draft.piece;

  const backPiece = [
    `M ${sx(piece.centerTop.x)} ${sy(piece.centerBottom.y)}`,
    `L ${sx(piece.centerTop.x)} ${sy(piece.depthMark.y)}`,
    `Q ${sx(piece.neckEnd.x * 0.55)} ${sy(0.04)} ${sx(piece.neckEnd.x)} ${sy(piece.neckEnd.y)}`,
    `L ${sx(piece.shoulderEnd.x)} ${sy(piece.shoulderEnd.y)}`,
    `Q ${sx(piece.sideTop.x - 0.78)} ${sy(piece.sideTop.y - 0.18)} ${sx(piece.sideTop.x)} ${sy(piece.sideTop.y)}`,
    `L ${sx(piece.sideHem.x)} ${sy(piece.sideHem.y)}`,
    `L ${sx(piece.centerTop.x)} ${sy(piece.centerBottom.y)}`,
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
      <path d={backPiece} fill="rgba(54,88,138,0.09)" stroke="#29344e" strokeWidth="3.2" strokeLinejoin="round" />
      <path d={`M ${sx(piece.dartLeft.x)} ${sy(piece.dartLeft.y)} L ${sx(piece.dartTop.x)} ${sy(piece.dartTop.y)} L ${sx(piece.dartRight.x)} ${sy(piece.dartRight.y)}`} fill="none" stroke="#36588a" strokeWidth="2.4" />

      <text x={sx(0.2)} y={sy(0.78)} fill="#29344e" fontSize="16" fontWeight="700">Back</text>
      <text x={sx(0.22)} y={sy(0.4)} fill="#29344e" fontSize="12">Boat neck</text>
      <text x={sx(piece.sideTop.x - 0.8)} y={sy(piece.sideTop.y - 0.16)} fill="#36588a" fontSize="12">Back armhole</text>
      <text x={sx(piece.dartTop.x + 0.18)} y={sy(piece.dartTop.y + 0.12)} fill="#36588a" fontSize="12">Back dart</text>
      <text x={sx(0.16)} y={sy(draft.length + 0.72)} fill="#29344e" fontSize="12">Center back on fold</text>

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

export default BackDiagram;
