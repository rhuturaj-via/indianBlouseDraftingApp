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
  const chestRef = Math.max(measurements.chest, measurements.bust - 1);
  const width = clamp(chestRef / 4 + (style === 'princess' ? 1 : 0.85), 10.5, 18.5);
  const length = measurements.blouseLength;
  const armholeDepth = clamp(chestRef / 6 + 1.05, 6.8, length - 3.25);
  const bustLine = clamp(armholeDepth + 1.25, armholeDepth + 0.9, length - 3);
  const waistWidth = clamp(measurements.waist / 4 + (style === 'princess' ? 2 : 1.35), 9.5, width + 0.85);
  const neckWidth = clamp(Math.max(measurements.neck / 6, measurements.chest / 12), 2.2, 4.2);
  const neckDepth = clamp(measurements.neck / 6 + 1.55, 3.4, 7.25);
  const shoulderDrop = 1;
  const shoulderWidth = clamp(measurements.shoulder / 2, 5.25, width - 1);
  const shoulderTip = point(shoulderWidth, shoulderDrop);
  const underarm = point(width, armholeDepth);
  const waist = point(waistWidth, length);
  const apex = point(clamp(width * 0.58, neckWidth + 2, width - 1.75), bustLine);
  const dartHalf = clamp((width - waistWidth + 1.2) / 4, 0.45, 0.9);
  const waistDartLeft = point(apex.x - dartHalf, length);
  const waistDartRight = point(apex.x + dartHalf, length);
  const princessWaist = point(clamp(apex.x - 0.2, neckWidth + 1.5, waistWidth - 0.5), length);
  const princessArmhole = point(clamp(width - 1.55, apex.x + 1.1, width - 0.6), armholeDepth - 1.25);
  const centerPanelHem = point(clamp(princessWaist.x + 0.1, apex.x - 0.4, apex.x + 0.4), length);
  const beltDrop = clamp(length * 0.26, 3.3, 5.2);

  return {
    width,
    length,
    measurements: [
      { label: 'Length OA', value: length },
      { label: 'Armhole depth OB', value: armholeDepth },
      { label: 'Quarter chest + ease', value: width },
      { label: 'Quarter waist + ease', value: waistWidth },
    ],
    points: {
      O: point(0, 0),
      A: point(0, length),
      B: point(0, armholeDepth),
      C: point(neckWidth, 0),
      D: point(0, neckDepth),
      E: shoulderTip,
      F: underarm,
      G: waist,
      P: apex,
      W: princessArmhole,
      Y: princessWaist,
      L1: waistDartLeft,
      L2: waistDartRight,
      H: point(0, bustLine),
      I: point(width, bustLine),
      T: point(0, beltDrop),
    },
    guides: {
      armholeDepth,
      bustLine,
      beltDrop,
      shoulderDrop,
      neckWidth,
      neckDepth,
      centerPanelHem,
    },
    style,
  };
}

function buildBackDraft(measurements, style) {
  const chestRef = Math.max(measurements.chest, measurements.bust - 2);
  const width = clamp(chestRef / 4 + 0.5, 10, 17.5);
  const length = measurements.blouseLength;
  const armholeDepth = clamp(chestRef / 6 + 1, 6.6, length - 3.2);
  const waistWidth = clamp(measurements.waist / 4 + 1.5, 9, width + 1.1);
  const neckWidth = clamp(Math.max(measurements.neck / 6 - 0.1, measurements.chest / 12 - 0.1), 2.1, 4);
  const neckDepth = clamp(measurements.neck / 10 + 0.8, 1.2, 3.1);
  const shoulderDrop = 1;
  const shoulderWidth = clamp(measurements.shoulder / 2 - 0.2, 5.15, width - 1.2);
  const shoulderTip = point(shoulderWidth, shoulderDrop);
  const underarm = point(width, armholeDepth);
  const waist = point(waistWidth, length);
  const apex = point(clamp(width * 0.53, neckWidth + 1.8, width - 2), armholeDepth + 1.55);
  const dartHalf = clamp((width - waistWidth + 1.15) / 4, 0.45, 0.8);

  return {
    width,
    length,
    measurements: [
      { label: 'Length OA', value: length },
      { label: 'Armhole depth OB', value: armholeDepth },
      { label: 'Quarter chest + 1/2"', value: width },
      { label: 'Quarter waist + 1 1/2"', value: waistWidth },
    ],
    points: {
      O: point(0, 0),
      A: point(0, length),
      B: point(0, armholeDepth),
      C: point(neckWidth, 0),
      D: point(0, neckDepth),
      E: shoulderTip,
      F: underarm,
      G: waist,
      P: apex,
      L1: point(apex.x - dartHalf, length),
      L2: point(apex.x + dartHalf, length),
      H: point(0, armholeDepth + 1.4),
      I: point(width, armholeDepth + 1.4),
    },
    guides: {
      armholeDepth,
      waistLine: length,
      shoulderDrop,
      neckWidth,
      neckDepth,
      style,
    },
  };
}

function buildSleeveDraft(measurements) {
  const sleeveLength = measurements.sleeveLength;
  const capHeight = clamp(measurements.chest / 12 + 2.1, 4.2, 6.6);
  const width = clamp(Math.max(measurements.chest, measurements.bust) / 4 + 1.5, 10.5, 17);
  const hemWidth = clamp(width * 0.74, 8, 13.2);
  const midX = width / 2;

  return {
    width,
    height: capHeight + sleeveLength,
    measurements: [
      { label: 'Sleeve length', value: sleeveLength },
      { label: 'Cap height', value: capHeight },
      { label: 'Top sleeve width', value: width },
      { label: 'Hem width', value: hemWidth },
    ],
    points: {
      O: point(0, capHeight),
      A: point(width, capHeight),
      B: point(midX, 0),
      C: point(midX, capHeight + sleeveLength),
      D: point(midX - hemWidth / 2, capHeight + sleeveLength),
      E: point(midX + hemWidth / 2, capHeight + sleeveLength),
      F1: point(width * 0.28, capHeight * 0.2),
      F2: point(width * 0.72, capHeight * 0.12),
      N1: point(width * 0.22, capHeight * 0.58),
      N2: point(width * 0.78, capHeight * 0.5),
    },
    guides: {
      capHeight,
      sleeveLength,
      midX,
      hemWidth,
      width,
    },
  };
}

export function buildDraftSet(rawMeasurements, style = 'princess') {
  const measurements = normalizeMeasurements(rawMeasurements);

  return {
    measurements,
    style,
    front: buildFrontDraft(measurements, style),
    back: buildBackDraft(measurements, style),
    sleeve: buildSleeveDraft(measurements),
  };
}

export function formatInches(value) {
  return `${value.toFixed(2).replace(/\.00$/, '')}"`;
}
