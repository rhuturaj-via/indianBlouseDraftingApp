const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

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
  const bustRef = Math.max(measurements.bust, measurements.chest);
  const width = clamp(bustRef / 4 + 1.5, 10, 20);
  const waistWidth = clamp(measurements.waist / 4 + 0.85, 8.5, width);
  const halfShoulder = clamp(measurements.shoulder / 2 + 0.35, 5.6, width - 1.1);
  const shoulderDrop = 0.9;
  const neckWidth = clamp(measurements.neck / 6 + 0.4, 2.2, 4.5);
  const neckDepth = clamp(measurements.neck / 5 + 0.8, 3.1, 5.6);
  const armholeDepth = clamp(bustRef / 6 + 2.45, 7.8, measurements.blouseLength - 3.25);
  const bustLine = clamp(armholeDepth + 1.5, armholeDepth + 1, measurements.blouseLength - 3.2);
  const underarmX = width - 0.35;
  const underarmY = armholeDepth + 0.7;
  const sideWaistX = clamp(waistWidth + 0.8, 9, width + 0.2);
  const hemY = measurements.blouseLength;
  const princessX = clamp(width * 0.56, 5.2, width - 1.3);
  const princessBustX = princessX + 0.35;
  const dartIntake = clamp((width - waistWidth) * 0.65, 0.7, 2.1);

  const outlinePath = [
    `M 0 ${hemY}`,
    `L 0 ${neckDepth}`,
    `Q 0 0 ${neckWidth} 0`,
    `L ${halfShoulder} ${shoulderDrop}`,
    `Q ${width - 0.8} ${armholeDepth * 0.18} ${underarmX} ${underarmY}`,
    `L ${sideWaistX} ${hemY}`,
    'Z',
  ].join(' ');

  const princessPath = style === 'princess'
    ? [
        `M ${princessX - 0.2} ${shoulderDrop + 0.4}`,
        `Q ${princessX + 0.65} ${bustLine - 0.9} ${princessBustX} ${bustLine}`,
        `Q ${princessX} ${hemY - 1.2} ${princessX - 0.65} ${hemY}`,
      ].join(' ')
    : [
        `M ${princessX} ${bustLine - 2}`,
        `L ${princessX} ${hemY - 0.4}`,
      ].join(' ');

  return {
    viewWidth: width + 2.4,
    viewHeight: hemY + 2.4,
    outlinePath,
    princessPath,
    measurements: [
      { label: 'Shoulder', value: measurements.shoulder },
      { label: 'Bust / 4 + ease', value: width },
      { label: 'Waist / 4 + ease', value: waistWidth },
      { label: 'Front neck depth', value: neckDepth },
    ],
    guides: {
      bustLine,
      waistLine: hemY,
      armholeDepth,
      neckWidth,
      neckDepth,
      halfShoulder,
      underarmX,
      underarmY,
      princessX,
      dartIntake,
    },
  };
}

function buildBackDraft(measurements, style) {
  const chestRef = Math.max(measurements.chest, measurements.bust - 1);
  const width = clamp(chestRef / 4 + 1.1, 9.5, 18);
  const waistWidth = clamp(measurements.waist / 4 + 0.75, 8.5, width);
  const halfShoulder = clamp(measurements.shoulder / 2 + 0.2, 5.4, width - 1.3);
  const shoulderDrop = 0.7;
  const neckWidth = clamp(measurements.neck / 6 + 0.35, 2.1, 4.1);
  const neckDepth = clamp(measurements.neck / 10 + 0.4, 1.2, 2.8);
  const armholeDepth = clamp(chestRef / 6 + 2.2, 7.2, measurements.blouseLength - 3.1);
  const underarmX = width - 0.25;
  const underarmY = armholeDepth + 0.4;
  const sideWaistX = clamp(waistWidth + 0.6, 8.8, width + 0.2);
  const hemY = measurements.blouseLength;
  const dartX = clamp(width * 0.5, 4.6, width - 1.5);

  const outlinePath = [
    `M 0 ${hemY}`,
    `L 0 ${neckDepth}`,
    `Q 0 0 ${neckWidth} 0`,
    `L ${halfShoulder} ${shoulderDrop}`,
    `Q ${width - 0.55} ${armholeDepth * 0.24} ${underarmX} ${underarmY}`,
    `L ${sideWaistX} ${hemY}`,
    'Z',
  ].join(' ');

  const shapingPath = style === 'princess'
    ? [
        `M ${dartX - 0.35} ${shoulderDrop + 0.4}`,
        `Q ${dartX + 0.15} ${hemY * 0.45} ${dartX - 0.1} ${hemY}`,
      ].join(' ')
    : [
        `M ${dartX} ${hemY * 0.42}`,
        `L ${dartX} ${hemY - 0.4}`,
      ].join(' ');

  return {
    viewWidth: width + 2.1,
    viewHeight: hemY + 2.2,
    outlinePath,
    shapingPath,
    measurements: [
      { label: 'Shoulder', value: measurements.shoulder },
      { label: 'Chest / 4 + ease', value: width },
      { label: 'Waist / 4 + ease', value: waistWidth },
      { label: 'Back neck depth', value: neckDepth },
    ],
    guides: {
      armholeDepth,
      waistLine: hemY,
      neckWidth,
      neckDepth,
      halfShoulder,
      underarmX,
      underarmY,
      dartX,
    },
  };
}

function buildSleeveDraft(measurements) {
  const bicepWidth = clamp(Math.max(measurements.chest, measurements.bust) / 4 + 2.1, 11, 18);
  const capHeight = clamp(measurements.chest / 10 + 2.2, 4.5, 7.2);
  const sleeveLength = measurements.sleeveLength;
  const hemWidth = clamp(bicepWidth * 0.76, 8, 14.5);
  const halfCap = bicepWidth / 2;

  const outlinePath = [
    `M 0 ${capHeight + sleeveLength}`,
    `L ${halfCap - hemWidth / 2} ${capHeight + sleeveLength}`,
    `Q ${halfCap - 0.25} ${capHeight + sleeveLength * 0.45} ${bicepWidth} ${capHeight}`,
    `Q ${halfCap + 0.65} 0 ${halfCap} 0`,
    `Q ${halfCap - 0.65} 0 0 ${capHeight}`,
    `Q ${halfCap - hemWidth * 0.55} ${capHeight + sleeveLength * 0.45} 0 ${capHeight + sleeveLength}`,
    'Z',
  ].join(' ');

  return {
    viewWidth: bicepWidth + 2.4,
    viewHeight: capHeight + sleeveLength + 2.4,
    outlinePath,
    measurements: [
      { label: 'Sleeve length', value: sleeveLength },
      { label: 'Bicep width', value: bicepWidth },
      { label: 'Cap height', value: capHeight },
      { label: 'Hem width', value: hemWidth },
    ],
    guides: {
      capHeight,
      sleeveLength,
      bicepWidth,
      hemWidth,
      halfCap,
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
