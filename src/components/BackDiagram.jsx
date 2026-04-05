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

const BackDiagram = forwardRef(function BackDiagram({ draft, style }, ref) {
  const width = sx(draft.width + 5.6);
  const height = sy(draft.length + 2.8);
  const { O, A, B, C, D, E, F, G, P, L1, L2, H, I } = draft.points;

  const outerShape = [
    `M ${sx(O.x)} ${sy(A.y)}`,
    `L ${sx(O.x)} ${sy(D.y)}`,
    `Q ${sx(0.12)} ${sy(0.16)} ${sx(C.x)} ${sy(C.y)}`,
    `L ${sx(E.x)} ${sy(E.y)}`,
    `Q ${sx(draft.width - 0.6)} ${sy(B.y - 0.45)} ${sx(F.x)} ${sy(F.y)}`,
    `L ${sx(G.x)} ${sy(G.y)}`,
    `L ${sx(O.x)} ${sy(A.y)}`,
  ].join(' ');

  const waistDart = [
    `M ${sx(L1.x)} ${sy(L1.y)}`,
    `L ${sx(P.x)} ${sy(P.y)}`,
    `L ${sx(L2.x)} ${sy(L2.y)}`,
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

      <rect
        x={sx(O.x)}
        y={sy(O.y)}
        width={sx(draft.width) - sx(0)}
        height={sy(draft.length) - sy(0)}
        fill="none"
        stroke="#d7dfec"
        strokeDasharray="7 7"
      />

      <line x1={sx(O.x)} y1={sy(B.y)} x2={sx(F.x)} y2={sy(B.y)} stroke="#f4b22d" strokeDasharray="7 7" />
      <line x1={sx(O.x)} y1={sy(H.y)} x2={sx(I.x)} y2={sy(H.y)} stroke="#8bb0e5" strokeDasharray="8 8" />
      <line x1={sx(O.x)} y1={sy(O.y)} x2={sx(O.x)} y2={sy(A.y)} stroke="#36588a" strokeDasharray="6 6" />

      <path d={outerShape} fill="rgba(54, 88, 138, 0.09)" stroke="#29344e" strokeWidth="3.4" strokeLinejoin="round" />
      <path d={waistDart} fill="none" stroke={style === 'princess' ? '#d82a56' : '#36588a'} strokeWidth="2.5" />

      <text x={sx(0.2)} y={sy(0.75)} fill="#29344e" fontSize="16" fontWeight="700">Back draft</text>
      <text x={sx(0.18)} y={sy(B.y - 0.16)} fill="#b64a07" fontSize="13">Armhole line</text>
      <text x={sx(0.18)} y={sy(H.y - 0.16)} fill="#456fa7" fontSize="13">Back bust line</text>
      <text x={sx(0.18)} y={sy(A.y + 0.8)} fill="#29344e" fontSize="13">Center back on fold</text>
      <text x={sx(P.x + 0.22)} y={sy(P.y - 0.3)} fill={style === 'princess' ? '#d82a56' : '#36588a'} fontSize="12">
        Back waist dart
      </text>

      {drawPointLabel('O', O)}
      {drawPointLabel('A', A, 0.14, 0.45)}
      {drawPointLabel('B', B)}
      {drawPointLabel('C', C)}
      {drawPointLabel('D', D, 0.2, 0.38)}
      {drawPointLabel('E', E)}
      {drawPointLabel('F', F, 0.14, 0.38)}
      {drawPointLabel('G', G, 0.14, 0.45)}
      {drawPointLabel('P', P)}

      <g transform={`translate(${sx(draft.width + 1.2)} ${sy(1.1)})`}>
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
