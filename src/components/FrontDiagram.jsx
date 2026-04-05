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

function qPath(...segments) {
  return segments.join(' ');
}

function drawPointLabel(label, pt, dx = 0.14, dy = -0.14) {
  return (
    <text x={sx(pt.x + dx)} y={sy(pt.y + dy)} fill="#29344e" fontSize="12" fontWeight="700">
      {label}
    </text>
  );
}

const FrontDiagram = forwardRef(function FrontDiagram({ draft, style }, ref) {
  const width = sx(draft.width + 5.6);
  const height = sy(draft.length + 2.8);
  const { O, A, B, C, D, E, F, G, P, W, Y, L1, L2, H, I, T } = draft.points;
  const { centerPanelHem } = draft.guides;

  const outerShape = qPath(
    `M ${sx(O.x)} ${sy(A.y)}`,
    `L ${sx(O.x)} ${sy(D.y)}`,
    `Q ${sx(0.2)} ${sy(0.2)} ${sx(C.x)} ${sy(C.y)}`,
    `L ${sx(E.x)} ${sy(E.y)}`,
    `Q ${sx(draft.width - 0.75)} ${sy(B.y - 0.55)} ${sx(F.x)} ${sy(F.y)}`,
    `L ${sx(G.x)} ${sy(G.y)}`,
    `L ${sx(O.x)} ${sy(A.y)}`,
  );

  const princessCurve = qPath(
    `M ${sx(W.x)} ${sy(W.y)}`,
    `Q ${sx(P.x + 0.45)} ${sy(P.y - 0.5)} ${sx(P.x)} ${sy(P.y)}`,
    `Q ${sx(P.x - 0.3)} ${sy(Y.y - 0.7)} ${sx(Y.x)} ${sy(Y.y)}`,
  );

  const centerPanelShape = qPath(
    `M ${sx(O.x)} ${sy(A.y)}`,
    `L ${sx(O.x)} ${sy(D.y)}`,
    `Q ${sx(0.15)} ${sy(0.15)} ${sx(C.x)} ${sy(C.y)}`,
    `L ${sx(E.x - 1.85)} ${sy(E.y + 0.08)}`,
    `Q ${sx(P.x - 0.45)} ${sy(P.y - 1.35)} ${sx(P.x)} ${sy(P.y)}`,
    `Q ${sx(P.x - 0.18)} ${sy(Y.y - 0.6)} ${sx(centerPanelHem.x)} ${sy(centerPanelHem.y)}`,
    `L ${sx(O.x)} ${sy(A.y)}`,
  );

  const sidePanelShape = qPath(
    `M ${sx(W.x)} ${sy(W.y)}`,
    `Q ${sx(P.x + 0.45)} ${sy(P.y - 0.5)} ${sx(P.x)} ${sy(P.y)}`,
    `Q ${sx(P.x - 0.3)} ${sy(Y.y - 0.7)} ${sx(Y.x)} ${sy(Y.y)}`,
    `L ${sx(G.x)} ${sy(G.y)}`,
    `L ${sx(F.x)} ${sy(F.y)}`,
    `Q ${sx(draft.width - 0.7)} ${sy(B.y - 0.6)} ${sx(E.x)} ${sy(E.y)}`,
    `L ${sx(W.x)} ${sy(W.y)}`,
  );

  const waistDart = qPath(
    `M ${sx(L1.x)} ${sy(L1.y)}`,
    `L ${sx(P.x)} ${sy(P.y)}`,
    `L ${sx(L2.x)} ${sy(L2.y)}`,
  );

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
      <line x1={sx(O.x)} y1={sy(T.y)} x2={sx(F.x)} y2={sy(T.y)} stroke="#e6a8ba" strokeDasharray="6 6" />
      <line x1={sx(O.x)} y1={sy(O.y)} x2={sx(O.x)} y2={sy(A.y)} stroke="#36588a" strokeDasharray="6 6" />

      {style === 'princess' ? (
        <>
          <path d={centerPanelShape} fill="rgba(255, 197, 82, 0.18)" stroke="#821d3d" strokeWidth="3.2" strokeLinejoin="round" />
          <path d={sidePanelShape} fill="rgba(54, 88, 138, 0.1)" stroke="#36588a" strokeWidth="3.2" strokeLinejoin="round" />
          <path d={princessCurve} fill="none" stroke="#d82a56" strokeWidth="2.6" strokeDasharray="8 6" />
        </>
      ) : (
        <>
          <path d={outerShape} fill="rgba(255, 197, 82, 0.14)" stroke="#821d3d" strokeWidth="3.4" strokeLinejoin="round" />
          <path d={waistDart} fill="none" stroke="#36588a" strokeWidth="2.5" />
        </>
      )}

      <circle cx={sx(P.x)} cy={sy(P.y)} r="4.5" fill="#f78d08" />

      <text x={sx(0.2)} y={sy(0.75)} fill="#29344e" fontSize="16" fontWeight="700">Front draft</text>
      <text x={sx(0.18)} y={sy(B.y - 0.16)} fill="#b64a07" fontSize="13">Armhole line</text>
      <text x={sx(0.18)} y={sy(H.y - 0.16)} fill="#456fa7" fontSize="13">Bust / apex line</text>
      <text x={sx(0.18)} y={sy(T.y - 0.16)} fill="#b61e46" fontSize="13">Front chest guide</text>
      <text x={sx(0.18)} y={sy(A.y + 0.8)} fill="#29344e" fontSize="13">Center front on fold / opening line</text>
      <text x={sx(P.x + 0.24)} y={sy(P.y - 0.28)} fill="#f78d08" fontSize="13">Apex</text>

      {style === 'princess' ? (
        <>
          <text x={sx(1)} y={sy(draft.length + 1.45)} fill="#821d3d" fontSize="12">Center front panel</text>
          <text x={sx(draft.width - 3.6)} y={sy(draft.length + 1.45)} fill="#36588a" fontSize="12">Side front panel</text>
          <text x={sx(W.x + 0.18)} y={sy(W.y - 0.2)} fill="#d82a56" fontSize="12">Princess line</text>
        </>
      ) : (
        <text x={sx(P.x + 0.25)} y={sy(draft.length - 0.4)} fill="#36588a" fontSize="12">Waist dart</text>
      )}

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

export default FrontDiagram;
