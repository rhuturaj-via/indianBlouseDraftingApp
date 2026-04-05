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

const SleeveDiagram = forwardRef(function SleeveDiagram({ draft }, ref) {
  const width = x(draft.viewWidth);
  const height = y(draft.viewHeight);

  return (
    <svg
      ref={ref}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${height}`}
      className="h-auto w-full"
      role="img"
      aria-label="Sleeve draft"
    >
      <rect width={width} height={height} rx="28" fill="#fffdf9" />
      <line x1={x(0)} y1={y(draft.guides.capHeight)} x2={x(draft.guides.bicepWidth)} y2={y(draft.guides.capHeight)} stroke="#f4b22d" strokeDasharray="7 7" />
      <line x1={x(draft.guides.halfCap)} y1={y(0)} x2={x(draft.guides.halfCap)} y2={y(draft.guides.capHeight + draft.guides.sleeveLength)} stroke="#36588a" strokeDasharray="6 6" />
      <path d={scalePath(draft.outlinePath)} fill="rgba(248, 241, 229, 0.85)" stroke="#36588a" strokeWidth="4" strokeLinejoin="round" />

      <text x={x(0.25)} y={y(0.85)} fill="#29344e" fontSize="16" fontWeight="700">Sleeve</text>
      <text x={x(0.3)} y={y(draft.guides.capHeight - 0.16)} fill="#b64a07" fontSize="13">Cap height</text>
      <text x={x(draft.guides.halfCap + 0.2)} y={y(1.05)} fill="#36588a" fontSize="13">Center grain</text>
      <text x={x(draft.guides.halfCap - 1.2)} y={y(draft.guides.capHeight + draft.guides.sleeveLength - 0.2)} fill="#29344e" fontSize="13">
        Hem width
      </text>

      <g transform={`translate(${x(draft.viewWidth - 4.1)} ${y(0.85)})`}>
        {draft.measurements.map((item, index) => (
          <text key={item.label} y={index * 18} fill="#29344e" fontSize="12">
            {item.label}: {formatInches(item.value)}
          </text>
        ))}
      </g>
    </svg>
  );
});

export default SleeveDiagram;
