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

function drawPointLabel(label, pt, dx = 0.14, dy = -0.14) {
  return (
    <text x={sx(pt.x + dx)} y={sy(pt.y + dy)} fill="#29344e" fontSize="12" fontWeight="700">
      {label}
    </text>
  );
}

const SleeveDiagram = forwardRef(function SleeveDiagram({ draft }, ref) {
  const width = sx(draft.width + 4.8);
  const height = sy(draft.height + 3);
  const { O, A, B, C, D, E, F, G, H, I } = draft.points;
  const { leafCenter, leafSize } = draft.guides;

  const sleeveShape = [
    `M ${sx(O.x)} ${sy(O.y)}`,
    `Q ${sx(H.x)} ${sy(H.y)} ${sx(B.x)} ${sy(B.y)}`,
    `Q ${sx(I.x)} ${sy(I.y)} ${sx(A.x)} ${sy(A.y)}`,
    `L ${sx(E.x)} ${sy(E.y)}`,
    `L ${sx(D.x)} ${sy(D.y)}`,
    `L ${sx(O.x)} ${sy(O.y)}`,
  ].join(' ');

  const leafCut = [
    `M ${sx(leafCenter.x)} ${sy(leafCenter.y - leafSize.height / 2)}`,
    `Q ${sx(leafCenter.x + leafSize.width / 2)} ${sy(leafCenter.y)} ${sx(leafCenter.x)} ${sy(leafCenter.y + leafSize.height / 2)}`,
    `Q ${sx(leafCenter.x - leafSize.width / 2)} ${sy(leafCenter.y)} ${sx(leafCenter.x)} ${sy(leafCenter.y - leafSize.height / 2)}`,
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

      <rect
        x={sx(O.x)}
        y={sy(B.y)}
        width={sx(draft.width) - sx(0)}
        height={sy(draft.guides.sleeveLength) - sy(0)}
        fill="none"
        stroke="#d7dfec"
        strokeDasharray="7 7"
      />

      <line x1={sx(O.x)} y1={sy(O.y)} x2={sx(A.x)} y2={sy(A.y)} stroke="#f4b22d" strokeDasharray="7 7" />
      <line x1={sx(B.x)} y1={sy(B.y)} x2={sx(C.x)} y2={sy(C.y)} stroke="#36588a" strokeDasharray="6 6" />

      <path d={sleeveShape} fill="rgba(248, 241, 229, 0.92)" stroke="#36588a" strokeWidth="3.3" strokeLinejoin="round" />
      <path d={leafCut} fill="rgba(234, 74, 109, 0.14)" stroke="#d82a56" strokeWidth="2.2" />

      <circle cx={sx(F.x)} cy={sy(F.y)} r="3.8" fill="#d82a56" />
      <circle cx={sx(G.x)} cy={sy(G.y)} r="3.8" fill="#f78d08" />

      <text x={sx(0.2)} y={sy(0.75)} fill="#29344e" fontSize="16" fontWeight="700">Sleeve draft</text>
      <text x={sx(0.18)} y={sy(O.y - 0.16)} fill="#b64a07" fontSize="13">Bicep line</text>
      <text x={sx(B.x + 0.18)} y={sy(0.72)} fill="#36588a" fontSize="13">Center grain</text>
      <text x={sx(F.x - 1.2)} y={sy(F.y + 0.75)} fill="#d82a56" fontSize="12">Front notch</text>
      <text x={sx(G.x + 0.16)} y={sy(G.y + 0.75)} fill="#b64a07" fontSize="12">Back notch</text>
      <text x={sx(leafCenter.x + 0.3)} y={sy(leafCenter.y + 0.1)} fill="#d82a56" fontSize="12">Leaf cut</text>

      {drawPointLabel('O', O)}
      {drawPointLabel('A', A, 0.14, 0.38)}
      {drawPointLabel('B', B)}
      {drawPointLabel('C', C, 0.14, 0.45)}
      {drawPointLabel('D', D, 0.14, 0.45)}
      {drawPointLabel('E', E, 0.14, 0.45)}

      <g transform={`translate(${sx(draft.width + 0.95)} ${sy(1.05)})`}>
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
