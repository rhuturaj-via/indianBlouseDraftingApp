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
  const height = sy(draft.height + 2.8);
  const { O, A, B, C, D, E, F1, F2, N1, N2 } = draft.points;

  const sleeveShape = [
    `M ${sx(O.x)} ${sy(O.y)}`,
    `Q ${sx(N1.x - 0.65)} ${sy(N1.y - 1.25)} ${sx(B.x)} ${sy(B.y)}`,
    `Q ${sx(F2.x + 0.55)} ${sy(F2.y - 0.2)} ${sx(A.x)} ${sy(A.y)}`,
    `L ${sx(E.x)} ${sy(E.y)}`,
    `L ${sx(D.x)} ${sy(D.y)}`,
    `L ${sx(O.x)} ${sy(O.y)}`,
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

      <path d={sleeveShape} fill="rgba(248, 241, 229, 0.9)" stroke="#36588a" strokeWidth="3.4" strokeLinejoin="round" />

      <circle cx={sx(N1.x)} cy={sy(N1.y)} r="3.8" fill="#d82a56" />
      <circle cx={sx(N2.x)} cy={sy(N2.y)} r="3.8" fill="#f78d08" />

      <text x={sx(0.2)} y={sy(0.75)} fill="#29344e" fontSize="16" fontWeight="700">Sleeve draft</text>
      <text x={sx(0.18)} y={sy(O.y - 0.16)} fill="#b64a07" fontSize="13">Bicep line</text>
      <text x={sx(B.x + 0.2)} y={sy(0.7)} fill="#36588a" fontSize="13">Center grain</text>
      <text x={sx(N1.x - 1.35)} y={sy(N1.y + 0.65)} fill="#d82a56" fontSize="12">Front notch</text>
      <text x={sx(N2.x + 0.2)} y={sy(N2.y + 0.65)} fill="#b64a07" fontSize="12">Back notch</text>
      <text x={sx(D.x - 0.5)} y={sy(D.y + 0.75)} fill="#29344e" fontSize="12">Hem</text>

      {drawPointLabel('O', O)}
      {drawPointLabel('A', A, 0.14, 0.38)}
      {drawPointLabel('B', B)}
      {drawPointLabel('C', C, 0.14, 0.45)}
      {drawPointLabel('D', D, 0.14, 0.45)}
      {drawPointLabel('E', E, 0.14, 0.45)}

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

export default SleeveDiagram;
