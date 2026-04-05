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

const BackDiagram = forwardRef(function BackDiagram({ draft, style }, ref) {
  const width = x(draft.viewWidth);
  const height = y(draft.viewHeight);
  const shapingLabel = style === 'princess' ? 'Back panel seam' : 'Back dart';

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Back blouse draft"
    >
      <rect width={width} height={height} rx="28" fill="#fffdf9" />
      <line x1={x(0)} y1={y(draft.guides.armholeDepth)} x2={x(draft.viewWidth - 0.8)} y2={y(draft.guides.armholeDepth)} stroke="#f4b22d" strokeDasharray="7 7" />
      <line x1={x(0)} y1={y(draft.guides.waistLine)} x2={x(draft.viewWidth - 0.8)} y2={y(draft.guides.waistLine)} stroke="#e76181" strokeDasharray="8 8" />
      <line x1={x(0)} y1={y(0)} x2={x(0)} y2={y(draft.guides.waistLine)} stroke="#36588a" strokeDasharray="6 6" />

      <path d={scalePath(draft.outlinePath)} fill="rgba(54, 88, 138, 0.08)" stroke="#29344e" strokeWidth="4" strokeLinejoin="round" />
      <path d={scalePath(draft.shapingPath)} fill="none" stroke="#d82a56" strokeWidth="3.2" strokeDasharray={style === 'princess' ? undefined : '10 8'} strokeLinecap="round" />

      <text x={x(0.2)} y={y(0.8)} fill="#29344e" fontSize="16" fontWeight="700">Back</text>
      <text x={x(0.2)} y={y(draft.guides.armholeDepth - 0.16)} fill="#b64a07" fontSize="13">Armhole depth</text>
      <text x={x(0.2)} y={y(draft.guides.waistLine - 0.16)} fill="#b61e46" fontSize="13">Waist line</text>
      <text x={x(draft.guides.dartX + 0.2)} y={y(draft.guides.waistLine * 0.58)} fill="#d82a56" fontSize="13">
        {shapingLabel}
      </text>
      <text x={x(0.16)} y={y(draft.guides.waistLine + 0.85)} fill="#29344e" fontSize="13">Center back fold</text>
      <text x={x(draft.guides.halfShoulder - 0.35)} y={y(0.44)} fill="#29344e" fontSize="13">Shoulder</text>

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

export default BackDiagram;
