import { forwardRef } from 'react';
import { formatInches } from '../lib/drafting';

const SCALE = 28;
const PADDING = 42;

function x(px) {
  return PADDING + px * SCALE;
}

function y(px) {
  return PADDING + px * SCALE;
}

function scalePath(path) {
  const tokens = path.split(' ');
  let isX = true;
  return tokens
    .map((token) => {
      if (['M', 'L', 'Q', 'Z'].includes(token)) {
        if (token === 'Z') {
          return token;
        }
        isX = true;
        return token;
      }

      const value = Number(token);
      if (Number.isNaN(value)) {
        return token;
      }

      const scaled = isX ? x(value) : y(value);
      isX = !isX;
      return scaled.toFixed(2);
    })
    .join(' ');
}

const FrontDiagram = forwardRef(function FrontDiagram({ draft, style }, ref) {
  const width = x(draft.viewWidth);
  const height = y(draft.viewHeight);
  const princessLabel = style === 'princess' ? 'Princess seam' : 'Waist dart';

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Front blouse draft"
    >
      <rect width={width} height={height} rx="28" fill="#fffdf9" />
      <line x1={x(0)} y1={y(draft.guides.bustLine)} x2={x(draft.viewWidth - 0.8)} y2={y(draft.guides.bustLine)} stroke="#9bb6dd" strokeDasharray="8 8" />
      <line x1={x(0)} y1={y(draft.guides.armholeDepth)} x2={x(draft.viewWidth - 0.8)} y2={y(draft.guides.armholeDepth)} stroke="#f4b22d" strokeDasharray="7 7" />
      <line x1={x(0)} y1={y(draft.guides.waistLine)} x2={x(draft.viewWidth - 0.8)} y2={y(draft.guides.waistLine)} stroke="#e76181" strokeDasharray="8 8" />
      <line x1={x(0)} y1={y(0)} x2={x(0)} y2={y(draft.guides.waistLine)} stroke="#36588a" strokeDasharray="6 6" />

      <path d={scalePath(draft.outlinePath)} fill="rgba(255, 197, 82, 0.14)" stroke="#821d3d" strokeWidth="4" strokeLinejoin="round" />
      <path d={scalePath(draft.princessPath)} fill="none" stroke="#36588a" strokeWidth="3.2" strokeDasharray={style === 'princess' ? undefined : '10 8'} strokeLinecap="round" />

      <circle cx={x(draft.guides.princessX)} cy={y(draft.guides.bustLine)} r="6" fill="#f78d08" />

      <text x={x(0.2)} y={y(0.8)} fill="#29344e" fontSize="16" fontWeight="700">Front</text>
      <text x={x(0.2)} y={y(draft.guides.bustLine - 0.18)} fill="#456fa7" fontSize="13">Bust line</text>
      <text x={x(0.2)} y={y(draft.guides.armholeDepth - 0.16)} fill="#b64a07" fontSize="13">Armhole depth</text>
      <text x={x(0.2)} y={y(draft.guides.waistLine - 0.16)} fill="#b61e46" fontSize="13">Waist line</text>
      <text x={x(draft.guides.princessX + 0.2)} y={y(draft.guides.bustLine - 0.3)} fill="#36588a" fontSize="13">
        {princessLabel}
      </text>
      <text x={x(0.16)} y={y(draft.guides.waistLine + 0.85)} fill="#29344e" fontSize="13">Center front fold</text>
      <text x={x(draft.guides.halfShoulder - 0.35)} y={y(0.45)} fill="#821d3d" fontSize="13">Shoulder</text>

      <g transform={`translate(${x(draft.viewWidth - 3.7)} ${y(0.85)})`}>
        {draft.measurements.map((item, index) => (
          <text key={item.label} y={index * 18} fill="#29344e" fontSize="12">
            {item.label}: {formatInches(item.value)}
          </text>
        ))}
      </g>
    </svg>
  );
});

export default FrontDiagram;
