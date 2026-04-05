const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const point = (x, y) => ({ x, y });

export const defaultMeasurements = {
  fabricLength: '50',
  shoulder: '14',
  blouseLength: '15',
  waist: '32',
  chest: '36',
  bust: '38',
  neck: '13',
  sleeveLength: '',
};

export function normalizeMeasurements(rawMeasurements) {
  const fabricLength = toNumber(rawMeasurements.fabricLength, 50);
  const shoulder = clamp(toNumber(rawMeasurements.shoulder, 14), 10, 24);
  const blouseLength = clamp(toNumber(rawMeasurements.blouseLength, 15), 10, 24);
  const waist = clamp(toNumber(rawMeasurements.waist, 32), 22, 60);
  const chest = clamp(toNumber(rawMeasurements.chest, 36), 26, 60);
  const bust = clamp(toNumber(rawMeasurements.bust, 38), chest, 65);
  const neck = clamp(toNumber(rawMeasurements.neck, 13), 9, 24);
  const derivedSleeve = clamp(blouseLength * 0.58 + 0.75, 5.5, 11.5);
  const sleeveLength = clamp(
    toNumber(rawMeasurements.sleeveLength, derivedSleeve),
    4.5,
    Math.max(12, Math.min(fabricLength / 4, 24)),
  );

  return {
    fabricLength,
    shoulder,
    blouseLength,
    waist,
    chest,
    bust,
    neck,
    sleeveLength,
    derivedSleeve: rawMeasurements.sleeveLength === '' ? sleeveLength : null,
  };
}

function buildFrontDraft(measurements, style) {
  const bust = measurements.bust;
  const chest = measurements.chest;
  const waist = measurements.waist;
  const length = measurements.blouseLength;
  const armholeDepth = clamp(bust / 6, 5.9, 7.4);
  const bustPointHeight = clamp(armholeDepth + 1.6, armholeDepth + 1, length - 3);
  const width = clamp(bust / 4 + 1, 10, 16);
  const waistWidth = clamp(measurements.waist / 4 + 1.2, 9, width + 0.8);
  const neckWidth = clamp(Math.max(measurements.neck / 6, chest / 12), 2.2, 4.1);
  const neckDepth = clamp(measurements.neck / 3.2, 4, 7.5);
  const shoulderWidth = clamp(measurements.shoulder / 2, 5.3, width - 1.1);
  const shoulderDrop = 0.65;
  const shoulderEnd = point(shoulderWidth, shoulderDrop);
  const droppedArmholeX = shoulderWidth;
  const underarm = point(width, armholeDepth);
  const sideWaist = point(waistWidth, length);
  const apex = point(clamp(bust / 12 + 2.3, neckWidth + 1.2, width - 2.1), bustPointHeight);
  const dartHalf = clamp(0.48 + Math.max(0, bust - waist) / 32, 0.5, 0.95);
  const dartStartY = clamp(length - 2.2, bustPointHeight + 2.2, length - 1.4);
  const dartLeft = point(apex.x - dartHalf, length);
  const dartRight = point(apex.x + dartHalf, length);
  const dartTop = point(apex.x, dartStartY);
  const armholeInwardPoint = point(droppedArmholeX - 0.4, armholeDepth * 0.6);
  const armholeMid = point(width - 0.95, armholeDepth - 0.2);
  const princessArmholePoint = point(width - 1.35, armholeDepth - 1.15);
  const princessWaist = point(apex.x + 0.2, length);
  const sidePanelWaist = point(waistWidth, length);

  return {
    width,
    length,
    measurements: [
      { label: 'Front length', value: length },
      { label: 'Armhole depth', value: armholeDepth },
      { label: '1/4 bust + ease', value: width },
      { label: '1/4 waist + shaping', value: waistWidth },
    ],
    style,
    points: {
      O: point(0, 0),
      A: point(0, length),
      B: point(0, armholeDepth),
      C: point(neckWidth, 0),
      D: point(0, neckDepth),
      E: shoulderEnd,
      F: underarm,
      G: sideWaist,
      P: apex,
      X: point(droppedArmholeX, armholeDepth),
      M: armholeInwardPoint,
      N: armholeMid,
      W: princessArmholePoint,
      Y: princessWaist,
      T1: dartLeft,
      T2: dartRight,
      T3: dartTop,
      H: point(0, bustPointHeight),
      I: point(width, bustPointHeight),
    },
    guides: {
      armholeDepth,
      bustPointHeight,
      neckWidth,
      neckDepth,
      droppedArmholeX,
      shoulderDrop,
      sidePanelWaist,
    },
  };
}

function buildBackDraft(measurements) {
  const bust = Math.max(measurements.chest, measurements.bust - 1);
  const length = measurements.blouseLength;
  const armholeDepth = clamp(bust / 6, 5.8, 7.2);
  const width = clamp(bust / 4 + 0.5, 9.8, 15.5);
  const waistWidth = clamp(measurements.waist / 4 + 0.8, 8.8, width + 0.6);
  const neckWidth = clamp(Math.max(measurements.neck / 6 - 0.1, measurements.chest / 12 - 0.1), 2, 3.8);
  const neckDepth = clamp(measurements.neck / 10 + 0.5, 1.2, 2.7);
  const shoulderWidth = clamp(measurements.shoulder / 2 - 0.15, 5.1, width - 1.1);
  const shoulderDrop = 0.8;
  const shoulderEnd = point(shoulderWidth, shoulderDrop);
  const droppedArmholeX = shoulderWidth;
  const underarm = point(width, armholeDepth);
  const sideWaist = point(waistWidth, length);
  const dartX = clamp(width * 0.52, neckWidth + 1.5, width - 1.8);
  const dartApex = point(dartX, armholeDepth + 2);
  const dartLeft = point(dartX - 0.42, length);
  const dartRight = point(dartX + 0.42, length);
  const armholeControl = point(droppedArmholeX + 0.18, armholeDepth * 0.56);
  const armholeDiag = point(droppedArmholeX + 0.5, armholeDepth * 0.78);

  return {
    width,
    length,
    measurements: [
      { label: 'Back length', value: length },
      { label: 'Armhole depth', value: armholeDepth },
      { label: '1/4 chest + 1/2"', value: width },
      { label: '1/4 waist + 3/4"', value: waistWidth },
    ],
    points: {
      O: point(0, 0),
      A: point(0, length),
      B: point(0, armholeDepth),
      C: point(neckWidth, 0),
      D: point(0, neckDepth),
      E: shoulderEnd,
      F: underarm,
      G: sideWaist,
      X: point(droppedArmholeX, armholeDepth),
      M: armholeControl,
      N: armholeDiag,
      P: dartApex,
      T1: dartLeft,
      T2: dartRight,
      H: point(0, armholeDepth + 1.3),
      I: point(width, armholeDepth + 1.3),
    },
    guides: {
      armholeDepth,
      neckWidth,
      neckDepth,
      shoulderDrop,
      droppedArmholeX,
    },
  };
}

function buildSleeveDraft(measurements, front, back) {
  const sleeveLength = measurements.sleeveLength;
  const armholeTotal = front.armholeLength + back.armholeLength;
  const capHeight = clamp(armholeTotal / 6.2, 4.2, 6.1);
  const topWidth = clamp(armholeTotal / 2 + 0.4, 10.5, 15.8);
  const hemWidth = clamp(topWidth * 0.76, 8.2, 12.5);
  const midX = topWidth / 2;
  const frontNotchX = topWidth * 0.28;
  const backNotchX = topWidth * 0.72;
  const leafCenter = point(topWidth * 0.24, capHeight + sleeveLength * 0.62);
  const leafSize = {
    width: clamp(topWidth * 0.18, 1.4, 2.2),
    height: clamp(sleeveLength * 0.24, 1.5, 2.6),
  };

  return {
    width: topWidth,
    height: capHeight + sleeveLength,
    measurements: [
      { label: 'Sleeve length', value: sleeveLength },
      { label: 'Cap height', value: capHeight },
      { label: 'Top width', value: topWidth },
      { label: 'Hem width', value: hemWidth },
    ],
    points: {
      O: point(0, capHeight),
      A: point(topWidth, capHeight),
      B: point(midX, 0),
      C: point(midX, capHeight + sleeveLength),
      D: point(midX - hemWidth / 2, capHeight + sleeveLength),
      E: point(midX + hemWidth / 2, capHeight + sleeveLength),
      F: point(frontNotchX, capHeight * 0.62),
      G: point(backNotchX, capHeight * 0.54),
      H: point(topWidth * 0.18, capHeight * 0.22),
      I: point(topWidth * 0.82, capHeight * 0.12),
    },
    guides: {
      capHeight,
      sleeveLength,
      midX,
      hemWidth,
      leafCenter,
      leafSize,
    },
  };
}

function approximateQuadraticLength(start, control, end, segments = 20) {
  let length = 0;
  let previous = start;

  for (let step = 1; step <= segments; step += 1) {
    const t = step / segments;
    const x = (1 - t) ** 2 * start.x + 2 * (1 - t) * t * control.x + t ** 2 * end.x;
    const y = (1 - t) ** 2 * start.y + 2 * (1 - t) * t * control.y + t ** 2 * end.y;
    const current = point(x, y);
    length += Math.hypot(current.x - previous.x, current.y - previous.y);
    previous = current;
  }

  return length;
}

export function buildDraftSet(rawMeasurements, style = 'princess') {
  const measurements = normalizeMeasurements(rawMeasurements);
  const front = buildFrontDraft(measurements, style);
  const back = buildBackDraft(measurements);

  const frontArmholeLength =
    approximateQuadraticLength(front.points.E, front.points.M, front.points.N) +
    approximateQuadraticLength(front.points.N, front.points.N, front.points.F);

  const backArmholeLength =
    approximateQuadraticLength(back.points.E, back.points.M, back.points.N) +
    approximateQuadraticLength(back.points.N, back.points.N, back.points.F);

  front.armholeLength = frontArmholeLength;
  back.armholeLength = backArmholeLength;

  return {
    measurements,
    style,
    front,
    back,
    sleeve: buildSleeveDraft(measurements, front, back),
  };
}

export function formatInches(value) {
  return `${value.toFixed(2).replace(/\.00$/, '')}"`;
}
