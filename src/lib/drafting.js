const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const point = (x, y) => ({ x, y });

export const defaultMeasurements = {
  backLength: '14',
  frontLength: '15',
  waist: '32',
  shoulder: '14',
  upperChest: '34',
  fullChest: '36',
  shoulderToBust: '10.5',
  apexToApex: '7.5',
  lowerBust: '31',
  frontNeckDepth: '6',
  backNeckDepth: '2',
  sleeveLength: '4',
  sleeveRound: '11',
  frontOpening: '1.25',
};

export function normalizeMeasurements(rawMeasurements) {
  const backLength = clamp(toNumber(rawMeasurements.backLength, 14), 10, 22);
  const frontLength = clamp(toNumber(rawMeasurements.frontLength, 15), 10, 22);
  const waist = clamp(toNumber(rawMeasurements.waist, 32), 24, 60);
  const shoulder = clamp(toNumber(rawMeasurements.shoulder, 14), 10, 22);
  const upperChest = clamp(toNumber(rawMeasurements.upperChest, 34), 28, 56);
  const fullChest = clamp(toNumber(rawMeasurements.fullChest, 36), upperChest, 60);
  const shoulderToBust = clamp(
    toNumber(rawMeasurements.shoulderToBust, 10.5),
    7,
    frontLength - 1.25,
  );
  const apexToApex = clamp(toNumber(rawMeasurements.apexToApex, 7.5), 5, 12);
  const lowerBust = clamp(toNumber(rawMeasurements.lowerBust, 31), 24, fullChest);
  const frontNeckDepth = clamp(toNumber(rawMeasurements.frontNeckDepth, 6), 3, 9);
  const backNeckDepth = clamp(toNumber(rawMeasurements.backNeckDepth, 2), 0.5, 4);
  const sleeveLength = clamp(toNumber(rawMeasurements.sleeveLength, 4), 3, 10);
  const sleeveRound = clamp(toNumber(rawMeasurements.sleeveRound, 11), 8, 22);
  const frontOpening = clamp(toNumber(rawMeasurements.frontOpening, 1.25), 0.75, 2);

  return {
    backLength,
    frontLength,
    waist,
    shoulder,
    upperChest,
    fullChest,
    shoulderToBust,
    apexToApex,
    lowerBust,
    frontNeckDepth,
    backNeckDepth,
    sleeveLength,
    sleeveRound,
    frontOpening,
  };
}

function buildFrontDraft(measurements) {
  const width = clamp(measurements.fullChest / 4 + 1.15, 10, 16);
  const waistWidth = clamp(measurements.waist / 4 + 1, 8.8, width + 0.5);
  const lowerBustWidth = clamp(measurements.lowerBust / 4 + 1, waistWidth, width + 0.7);
  const length = measurements.frontLength;
  const shoulderHalf = clamp(measurements.shoulder / 2, 5, width - 1.2);
  const armholeDepth = clamp(measurements.upperChest / 6 + 1.45, 6.2, length - 3);
  const boatWidth = clamp(shoulderHalf - 1.1, 3.4, shoulderHalf - 0.35);
  const shoulderDrop = 0.78;
  const apex = point(
    clamp(measurements.apexToApex / 2, 2.6, width - 2),
    measurements.shoulderToBust,
  );
  const princessTop = point(clamp(width * 0.58, apex.x + 0.8, width - 1), armholeDepth - 0.8);
  const princessUnderBust = point(clamp(apex.x + 0.55, apex.x + 0.35, lowerBustWidth - 0.8), Math.min(apex.y + 2.3, length - 1.75));
  const princessHem = point(clamp(apex.x + 0.15, apex.x - 0.1, waistWidth - 1.1), length);
  const sideTop = point(width, armholeDepth + 0.12);
  const sideUnderBust = point(lowerBustWidth, princessUnderBust.y + 0.1);
  const sideHem = point(waistWidth, length);

  return {
    width,
    length,
    labels: [
      { label: '1/4 full chest + ease', value: width },
      { label: '1/4 waist + ease', value: waistWidth },
      { label: 'Front neck depth', value: measurements.frontNeckDepth },
      { label: 'Shoulder to bust', value: measurements.shoulderToBust },
    ],
    guides: {
      frontOpening: measurements.frontOpening,
      boatWidth,
      armholeDepth,
    },
    pieces: {
      center: {
        centerTop: point(0, 0),
        centerBottom: point(0, length),
        neckEnd: point(boatWidth, 0),
        shoulderEnd: point(shoulderHalf, shoulderDrop),
        depthMark: point(0, measurements.frontNeckDepth),
        princessTop,
        princessUnderBust,
        princessHem,
        apex,
      },
      side: {
        princessTop,
        princessUnderBust,
        princessHem,
        shoulderJoin: point(shoulderHalf - 0.55, shoulderDrop + 0.08),
        sideTop,
        sideUnderBust,
        sideHem,
      },
    },
  };
}

function buildBackDraft(measurements) {
  const width = clamp(measurements.upperChest / 4 + 1, 9.5, 15.5);
  const waistWidth = clamp(measurements.waist / 4 + 0.85, 8.5, width + 0.4);
  const length = measurements.backLength;
  const shoulderHalf = clamp(measurements.shoulder / 2 - 0.1, 4.9, width - 1.15);
  const armholeDepth = clamp(measurements.upperChest / 6 + 1.25, 6.1, length - 2.8);
  const boatWidth = clamp(shoulderHalf - 1.2, 3.2, shoulderHalf - 0.45);
  const shoulderDrop = 0.72;
  const dartX = clamp(width * 0.54, 3.25, width - 2);

  return {
    width,
    length,
    labels: [
      { label: '1/4 upper chest + ease', value: width },
      { label: '1/4 waist + ease', value: waistWidth },
      { label: 'Back neck depth', value: measurements.backNeckDepth },
      { label: 'Dart height', value: 2.8 },
    ],
    guides: {
      armholeDepth,
      boatWidth,
    },
    piece: {
      centerTop: point(0, 0),
      centerBottom: point(0, length),
      neckEnd: point(boatWidth, 0),
      shoulderEnd: point(shoulderHalf, shoulderDrop),
      depthMark: point(0, measurements.backNeckDepth),
      sideTop: point(width, armholeDepth),
      sideHem: point(waistWidth, length),
      dartTop: point(dartX, length - 2.8),
      dartLeft: point(dartX - 0.42, length),
      dartRight: point(dartX + 0.42, length),
    },
  };
}

function buildSleeveDraft(measurements) {
  const width = clamp(measurements.sleeveRound + 6.5, 14, 24);
  const topLift = clamp(measurements.sleeveLength * 0.22, 0.6, 1.5);
  const bottomDip = clamp(measurements.sleeveLength * 1.12 + 0.9, 4, 9);
  const openingHalf = clamp(measurements.sleeveRound / 2 + 0.55, 4.2, width / 2 - 1.8);

  return {
    width,
    height: topLift + bottomDip + 0.8,
    labels: [
      { label: 'Sleeve length', value: measurements.sleeveLength },
      { label: 'Sleeve round', value: measurements.sleeveRound },
      { label: 'Top span', value: width },
      { label: 'Opening / 2', value: openingHalf },
    ],
    piece: {
      topLeft: point(0, topLift),
      topRight: point(width, 0),
      leftFrontNotch: point(width * 0.1, topLift + 0.35),
      rightBackNotch: point(width * 0.9, 0.35),
      leftCurveAnchor: point(width * 0.18, topLift + 1.6),
      rightCurveAnchor: point(width * 0.82, topLift + 1.4),
      bottomCenter: point(width * 0.5, topLift + bottomDip),
      openingLeft: point(width * 0.5 - openingHalf, topLift + bottomDip - 0.05),
      openingRight: point(width * 0.5 + openingHalf, topLift + bottomDip - 0.05),
    },
  };
}

export function buildDraftSet(rawMeasurements) {
  const measurements = normalizeMeasurements(rawMeasurements);

  return {
    styleLabel: 'Boat Neck Princess Cut Blouse',
    measurements,
    front: buildFrontDraft(measurements),
    back: buildBackDraft(measurements),
    sleeve: buildSleeveDraft(measurements),
  };
}

export function formatInches(value) {
  return `${value.toFixed(2).replace(/\.00$/, '')}"`;
}
