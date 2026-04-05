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

const FrontDiagram = forwardRef(function FrontDiagram({ draft, style }, ref) {
  const width = sx(draft.width + 5.8);
  const height = sy(draft.length + 3);
  const { O, A, B, C, D, E, F, G, P, X, M, N, W, Y, T1, T2, T3, H, I } = draft.points;

  const outline = [
    `M ${sx(O.x)} ${sy(A.y)}`,
    `L ${sx(O.x)} ${sy(D.y)}`,
    `Q ${sx(0.2)} ${sy(0.2)} ${sx(C.x)} ${sy(C.y)}`,
    `L ${sx(E.x)} ${sy(E.y)}`,
    `Q ${sx(M.x)} ${sy(M.y)} ${sx(N.x)} ${sy(N.y)}`,
    `Q ${sx(draft.width - 0.35)} ${sy(draft.guides.armholeDepth + 0.15)} ${sx(F.x)} ${sy(F.y)}`,
    `L ${sx(G.x)} ${sy(G.y)}`,
    `L ${sx(O.x)} ${sy(A.y)}`,
  ].join(' ');

  const princessLine = [
    `M ${sx(W.x)} ${sy(W.y)}`,
    `Q ${sx(P.x + 0.25)} ${sy(P.y - 0.45)} ${sx(P.x)} ${sy(P.y)}`,
    `Q ${sx(P.x + 0.1)} ${sy(draft.length - 0.9)} ${sx(Y.x)} ${sy(Y.y)}`,
  ].join(' ');

  const centerPanel = [
    `M ${sx(O.x)} ${sy(A.y)}`,
    `L ${sx(O.x)} ${sy(D.y)}`,
    `Q ${sx(0.2)} ${sy(0.2)} ${sx(C.x)} ${sy(C.y)}`,
    `L ${sx(E.x - 1.35)} ${sy(E.y + 0.08)}`,
    `Q ${sx(P.x - 0.6)} ${sy(P.y - 1.2)} ${sx(P.x)} ${sy(P.y)}`,
    `Q ${sx(P.x - 0.18)} ${sy(draft.length - 0.8)} ${sx(Y.x)} ${sy(Y.y)}`,
    `L ${sx(O.x)} ${sy(A.y)}`,
  ].join(' ');

  const sidePanel = [
    `M ${sx(W.x)} ${sy(W.y)}`,
    `Q ${sx(P.x + 0.25)} ${sy(P.y - 0.45)} ${sx(P.x)} ${sy(P.y)}`,
    `Q ${sx(P.x + 0.1)} ${sy(draft.length - 0.9)} ${sx(Y.x)} ${sy(Y.y)}`,
    `L ${sx(G.x)} ${sy(G.y)}`,
    `L ${sx(F.x)} ${sy(F.y)}`,
    `Q ${sx(M.x + 0.25)} ${sy(M.y + 0.45)} ${sx(E.x)} ${sy(E.y)}`,
    `L ${sx(W.x)} ${sy(W.y)}`,
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
      <line x1={sx(X.x)} y1={sy(E.y)} x2={sx(X.x)} y2={sy(B.y)} stroke="#c4cfdf" strokeDasharray="6 6" />
      <line x1={sx(O.x)} y1={sy(O.y)} x2={sx(O.x)} y2={sy(A.y)} stroke="#36588a" strokeDasharray="6 6" />

      {style === 'princess' ? (
        <>
          <path d={centerPanel} fill="rgba(255, 197, 82, 0.18)" stroke="#821d3d" strokeWidth="3.1" strokeLinejoin="round" />
          <path d={sidePanel} fill="rgba(54, 88, 138, 0.1)" stroke="#36588a" strokeWidth="3.1" strokeLinejoin="round" />
          <path d={princessLine} fill="none" stroke="#d82a56" strokeWidth="2.4" strokeDasharray="8 6" />
        </>
      ) : (
        <>
          <path d={outline} fill="rgba(255, 197, 82, 0.14)" stroke="#821d3d" strokeWidth="3.3" strokeLinejoin="round" />
          <path d={`M ${sx(T1.x)} ${sy(T1.y)} L ${sx(T3.x)} ${sy(T3.y)} L ${sx(T2.x)} ${sy(T2.y)}`} fill="none" stroke="#36588a" strokeWidth="2.4" />
        </>
      )}

      <circle cx={sx(P.x)} cy={sy(P.y)} r="4.5" fill="#f78d08" />

      <text x={sx(0.2)} y={sy(0.75)} fill="#29344e" fontSize="16" fontWeight="700">Front draft</text>
      <text x={sx(0.18)} y={sy(B.y - 0.16)} fill="#b64a07" fontSize="13">Armhole depth line</text>
      <text x={sx(0.18)} y={sy(H.y - 0.16)} fill="#456fa7" fontSize="13">Bust / apex line</text>
      <text x={sx(X.x + 0.18)} y={sy(B.y - 0.16)} fill="#6b7280" fontSize="12">Shoulder drop line</text>
      <text x={sx(0.18)} y={sy(A.y + 0.78)} fill="#29344e" fontSize="13">Center front line</text>
      <text x={sx(M.x - 0.9)} y={sy(M.y - 0.3)} fill="#b61e46" fontSize="12">Front armhole curves inward</text>
      <text x={sx(P.x + 0.22)} y={sy(P.y - 0.22)} fill="#f78d08" fontSize="12">Bust point</text>

      {style === 'princess' ? (
        <>
          <text x={sx(W.x + 0.18)} y={sy(W.y - 0.2)} fill="#d82a56" fontSize="12">Princess seam</text>
          <text x={sx(0.9)} y={sy(draft.length + 1.4)} fill="#821d3d" fontSize="12">Center front panel</text>
          <text x={sx(draft.width - 3.2)} y={sy(draft.length + 1.4)} fill="#36588a" fontSize="12">Side front panel</text>
        </>
      ) : (
        <text x={sx(T3.x + 0.18)} y={sy(T3.y + 0.2)} fill="#36588a" fontSize="12">Waist dart</text>
      )}

      {drawPointLabel('O', O)}
      {drawPointLabel('A', A, 0.14, 0.45)}
      {drawPointLabel('B', B)}
      {drawPointLabel('C', C)}
      {drawPointLabel('D', D, 0.18, 0.38)}
      {drawPointLabel('E', E)}
      {drawPointLabel('F', F, 0.14, 0.38)}
      {drawPointLabel('G', G, 0.14, 0.45)}
      {drawPointLabel('X', X)}
      {drawPointLabel('P', P)}

      <g transform={`translate(${sx(draft.width + 1.15)} ${sy(1.05)})`}>
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
