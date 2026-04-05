const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

const point = (x, y) => ({ x, y });

export const defaultMeasurements = {
  bust: '36',
  waist: '32',
  shoulder: '14',
  blouseLength: '15',
  frontNeckDepth: '6',
  backNeckDepth: '2',
  armholeRound: '16',
  bustPointHeight: '10.5',
  bustPointSpan: '7.5',
  sleeveLength: '4',
  sleeveRound: '11',
  frontOpening: '1.25',
};

export function normalizeMeasurements(rawMeasurements) {
  const bust = clamp(toNumber(rawMeasurements.bust, 36), 28, 60);
  const waist = clamp(toNumber(rawMeasurements.waist, 32), 24, bust);
  const shoulder = clamp(toNumber(rawMeasurements.shoulder, 14), 10, 22);
  const blouseLength = clamp(toNumber(rawMeasurements.blouseLength, 15), 10, 22);
  const frontNeckDepth = clamp(toNumber(rawMeasurements.frontNeckDepth, 6), 3, 9);
  const backNeckDepth = clamp(toNumber(rawMeasurements.backNeckDepth, 2), 0.5, 4);
  const armholeRound = clamp(toNumber(rawMeasurements.armholeRound, 16), 12, 26);
  const bustPointHeight = clamp(
    toNumber(rawMeasurements.bustPointHeight, 10.5),
    7,
    blouseLength - 1.5,
  );
  const bustPointSpan = clamp(toNumber(rawMeasurements.bustPointSpan, 7.5), 5, 12);
  const sleeveLength = clamp(toNumber(rawMeasurements.sleeveLength, 4), 3, 10);
  const sleeveRound = clamp(toNumber(rawMeasurements.sleeveRound, 11), 8, 22);
  const frontOpening = clamp(toNumber(rawMeasurements.frontOpening, 1.25), 0.75, 2);

  return {
    bust,
    waist,
    shoulder,
    blouseLength,
    frontNeckDepth,
    backNeckDepth,
    armholeRound,
    bustPointHeight,
    bustPointSpan,
    sleeveLength,
    sleeveRound,
    frontOpening,
  };
}

function buildFrontDraft(measurements) {
  const bodyWidth = clamp(measurements.bust / 4 + 1.15, 10, 16);
  const waistWidth = clamp(measurements.waist / 4 + 1.05, 8.7, bodyWidth + 0.7);
  const length = measurements.blouseLength;
  const shoulder = clamp(measurements.shoulder / 2 - 0.1, 5, bodyWidth - 1.4);
  const armholeDepth = clamp(measurements.bust / 6 + 1.1, 6.6, length - 3.25);
  const boatWidth = clamp(shoulder - 1, 3.8, shoulder - 0.35);
  const shoulderDrop = 0.8;
  const bustPoint = point(
    clamp(measurements.bustPointSpan / 2, 2.6, bodyWidth - 2.1),
    clamp(measurements.bustPointHeight, armholeDepth + 1.25, length - 1.7),
  );
  const princessTop = point(bodyWidth * 0.62, armholeDepth - 0.95);
  const princessWaist = point(bustPoint.x + 0.25, length);
  const sideSeamTop = point(bodyWidth, armholeDepth + 0.1);
  const sideSeamWaist = point(waistWidth, length);
  const openingX = point(measurements.frontOpening, 0);

  return {
    width: bodyWidth,
    length,
    measurements: [
      { label: '1/4 bust + ease', value: bodyWidth },
      { label: '1/4 waist + ease', value: waistWidth },
      { label: 'Front neck depth', value: measurements.frontNeckDepth },
      { label: 'Apex height', value: bustPoint.y },
    ],
    points: {
      centerTop: point(0, 0),
      centerBottom: point(0, length),
      neckEnd: point(boatWidth, 0),
      shoulderEnd: point(shoulder, shoulderDrop),
      princessTop,
      princessWaist,
      bustPoint,
      sideSeamTop,
      sideSeamWaist,
      openingTop: openingX,
      openingBottom: point(measurements.frontOpening, length),
      frontDepthMark: point(0, measurements.frontNeckDepth),
    },
    guides: {
      boatWidth,
      armholeDepth,
      shoulderDrop,
      openingWidth: measurements.frontOpening,
      underarmY: armholeDepth + 0.1,
    },
  };
}

function buildBackDraft(measurements) {
  const bodyWidth = clamp(measurements.bust / 4 + 0.85, 9.8, 15.5);
  const waistWidth = clamp(measurements.waist / 4 + 0.9, 8.5, bodyWidth + 0.4);
  const length = measurements.blouseLength;
  const shoulder = clamp(measurements.shoulder / 2 - 0.15, 4.9, bodyWidth - 1.2);
  const armholeDepth = clamp(measurements.bust / 6 + 0.95, 6.4, length - 3.35);
  const boatWidth = clamp(shoulder - 1.1, 3.6, shoulder - 0.45);
  const shoulderDrop = 0.75;
  const dartX = clamp(bodyWidth * 0.52, 3.3, bodyWidth - 2.2);

  return {
    width: bodyWidth,
    length,
    measurements: [
      { label: '1/4 bust + ease', value: bodyWidth },
      { label: '1/4 waist + ease', value: waistWidth },
      { label: 'Back neck depth', value: measurements.backNeckDepth },
      { label: 'Dart position', value: dartX },
    ],
    points: {
      centerTop: point(0, 0),
      centerBottom: point(0, length),
      neckEnd: point(boatWidth, 0),
      shoulderEnd: point(shoulder, shoulderDrop),
      sideSeamTop: point(bodyWidth, armholeDepth),
      sideSeamWaist: point(waistWidth, length),
      dartTop: point(dartX, length - 2.9),
      dartLeft: point(dartX - 0.4, length),
      dartRight: point(dartX + 0.4, length),
      backDepthMark: point(0, measurements.backNeckDepth),
    },
    guides: {
      boatWidth,
      armholeDepth,
      shoulderDrop,
    },
  };
}

function buildSleeveDraft(measurements) {
  const length = measurements.sleeveLength;
  const width = clamp(measurements.armholeRound + 3.25, 14, 26);
  const topRise = clamp(length * 0.24, 0.8, 2);
  const dip = clamp(length * 0.95 + 0.9, 3.5, 8.5);
  const opening = clamp(measurements.sleeveRound / 2 + 0.75, 4.5, width / 2 - 1.5);

  return {
    width,
    height: topRise + dip,
    measurements: [
      { label: 'Sleeve length', value: length },
      { label: 'Sleeve round', value: measurements.sleeveRound },
      { label: 'Armhole round', value: measurements.armholeRound },
      { label: 'Opening width / 2', value: opening },
    ],
    points: {
      topLeft: point(0, topRise),
      topRight: point(width, 0),
      frontNotch: point(width * 0.1, topRise + 0.35),
      backNotch: point(width * 0.9, 0.35),
      bottomCenter: point(width * 0.5, topRise + dip),
      bottomLeft: point(width * 0.5 - opening, topRise + dip - 0.1),
      bottomRight: point(width * 0.5 + opening, topRise + dip - 0.1),
    },
    guides: {
      topRise,
      dip,
    },
  };
}

export function buildDraftSet(rawMeasurements) {
  const measurements = normalizeMeasurements(rawMeasurements);

  return {
    measurements,
    styleLabel: 'Boat Neck Princess Cut',
    front: buildFrontDraft(measurements),
    back: buildBackDraft(measurements),
    sleeve: buildSleeveDraft(measurements),
  };
}

export function formatInches(value) {
  return `${value.toFixed(2).replace(/\.00$/, '')}"`;
}
