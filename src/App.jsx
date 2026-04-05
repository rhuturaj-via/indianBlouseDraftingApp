import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, Scissors, Shirt, Sparkles } from 'lucide-react';
import DiagramCard from './components/DiagramCard';
import FrontDiagram from './components/FrontDiagram';
import BackDiagram from './components/BackDiagram';
import SleeveDiagram from './components/SleeveDiagram';
import MeasurementForm from './components/MeasurementForm';
import PatternModeToggle from './components/PatternModeToggle';
import { buildDraftSet, defaultMeasurements, formatInches } from './lib/drafting';

function downloadSvg(ref, filename) {
  if (!ref.current) {
    return;
  }

  const blob = new Blob([ref.current.outerHTML], { type: 'image/svg+xml;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function buildPrintSheet(refs, measurements, style) {
  const diagrams = refs
    .map((entry) => {
      if (!entry.ref.current) {
        return '';
      }

      return `
        <section style="break-inside: avoid; margin-bottom: 24px;">
          <h2 style="margin: 0 0 10px; font-size: 20px; color: #171d2f;">${entry.label}</h2>
          ${entry.ref.current.outerHTML}
        </section>
      `;
    })
    .join('');

  const summary = [
    ['Pattern type', style === 'princess' ? 'Princess cut blouse' : 'Classic blouse'],
    ['Fabric length', formatInches(measurements.fabricLength)],
    ['Shoulder', formatInches(measurements.shoulder)],
    ['Blouse length', formatInches(measurements.blouseLength)],
    ['Waist', formatInches(measurements.waist)],
    ['Chest', formatInches(measurements.chest)],
    ['Bust', formatInches(measurements.bust)],
    ['Neck', formatInches(measurements.neck)],
    ['Sleeve length', formatInches(measurements.sleeveLength)],
  ]
    .map(([label, value]) => `<li style="margin-bottom: 6px;"><strong>${label}:</strong> ${value}</li>`)
    .join('');

  return `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Indian blouse draft</title>
    <style>
      body { font-family: Inter, Arial, sans-serif; margin: 24px; color: #171d2f; }
      h1 { margin-bottom: 8px; }
      ul { padding-left: 18px; margin: 0 0 20px; }
      svg { width: 100%; height: auto; border: 1px solid #efe2cc; border-radius: 20px; background: #fffdf9; }
      @page { size: A4 portrait; margin: 12mm; }
    </style>
  </head>
  <body>
    <h1>Indian blouse drafting sheet</h1>
    <p style="margin-top: 0;">Printable cutting guide generated from your measurements.</p>
    <ul>${summary}</ul>
    ${diagrams}
  </body>
</html>`;
}

export default function App() {
  const [measurements, setMeasurements] = useState(defaultMeasurements);
  const [style, setStyle] = useState('princess');

  const draftSet = buildDraftSet(measurements, style);

  const frontRef = useRef(null);
  const backRef = useRef(null);
  const sleeveRef = useRef(null);

  const handleMeasurementChange = (field, value) => {
    setMeasurements((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadSheet = () => {
    const markup = buildPrintSheet(
      [
        { label: 'Front draft', ref: frontRef },
        { label: 'Back draft', ref: backRef },
        { label: 'Sleeve draft', ref: sleeveRef },
      ],
      draftSet.measurements,
      style,
    );

    const blob = new Blob([markup], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'indian-blouse-print-sheet.html';
    link.click();
    URL.revokeObjectURL(url);
  };

  const measurementHighlights = [
    ['Pattern type', style === 'princess' ? 'Princess cut blouse' : 'Classic blouse'],
    ['Fabric length', formatInches(draftSet.measurements.fabricLength)],
    ['Blouse length', formatInches(draftSet.measurements.blouseLength)],
    ['Bust', formatInches(draftSet.measurements.bust)],
    ['Sleeve length', formatInches(draftSet.measurements.sleeveLength)],
  ];

  return (
    <main className="min-h-screen px-4 py-6 sm:px-5 lg:px-6">
      <div className="mx-auto max-w-7xl">
        <motion.section
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="overflow-hidden rounded-[32px] bg-gradient-to-br from-ink-950 via-currant-950 to-currant-800 text-white shadow-[0_30px_80px_rgba(23,29,47,0.28)]"
        >
          <div className="grid gap-10 px-5 py-8 sm:px-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:px-8 md:py-10">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-saffron-100">
                <Sparkles className="h-4 w-4" />
                Indian blouse drafting studio
              </div>
              <h1 className="mt-5 max-w-2xl text-4xl font-semibold tracking-tight sm:text-5xl">
                Draft front, back, and sleeve diagrams from your blouse measurements.
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
                Enter measurements in inches and the app lays out a clear blouse block with separate draft diagrams.
                Switch between a classic blouse and a princess cut version, then print or download the diagrams as SVG files.
              </p>

              <div className="print-hidden mt-6 flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full bg-saffron-300 px-6 py-3 text-base font-semibold text-ink-950 transition hover:bg-saffron-200"
                >
                  <Printer className="h-5 w-5" />
                  Print current sheet
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSheet}
                  className="inline-flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-white/18 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/14"
                >
                  <Download className="h-5 w-5" />
                  Download printable sheet
                </button>
              </div>
            </div>

            <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur sm:p-6">
              <div className="flex items-center gap-3 text-saffron-200">
                <Shirt className="h-6 w-6" />
                <p className="text-sm font-semibold uppercase tracking-[0.22em]">Current draft summary</p>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {measurementHighlights.map(([label, value]) => (
                  <div key={label} className="rounded-[22px] bg-white/8 px-4 py-4">
                    <div className="text-sm text-white/62">{label}</div>
                    <div className="mt-1 text-xl font-semibold">{value}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-[24px] bg-saffron-50/10 px-4 py-4 text-sm leading-6 text-white/78">
                {draftSet.measurements.derivedSleeve
                  ? `Sleeve length was left blank, so the sleeve draft is using an auto-derived length of ${formatInches(draftSet.measurements.derivedSleeve)}.`
                  : 'Sleeve length is using the exact value you entered.'}
              </div>
            </div>
          </div>
        </motion.section>

        <section className="mt-6 grid gap-6 lg:grid-cols-[minmax(320px,380px)_minmax(0,1fr)]">
          <div className="space-y-6 lg:sticky lg:top-6 lg:self-start">
            <MeasurementForm values={measurements} onChange={handleMeasurementChange} />
            <PatternModeToggle value={style} onChange={setStyle} />
            <section className="draft-card p-5 sm:p-6">
              <div className="flex items-center gap-3">
                <Scissors className="h-5 w-5 text-currant-700" />
                <h2 className="text-xl font-semibold tracking-tight text-ink-950">Draft notes</h2>
              </div>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-ink-700">
                <li>All diagrams are drafted in inches and rendered as half-pattern cutting guides.</li>
                <li>The front, back, and sleeve are separated so you can print them independently.</li>
                <li>Princess mode adds the bust-to-waist seam line; classic mode keeps the shaping simpler.</li>
              </ul>
            </section>
          </div>

          <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.42 }}>
              <DiagramCard
                title="Front Draft"
                subtitle="Front body block with neckline, shoulder slope, armhole depth, waist line, and princess seam or dart shaping."
                caption="Use the center-front fold line on the left edge. In princess mode, the inner seam line helps separate the center panel and side panel."
                onDownload={() => downloadSvg(frontRef, 'indian-blouse-front.svg')}
                onPrint={handlePrint}
              >
                <FrontDiagram ref={frontRef} draft={draftSet.front} style={style} />
              </DiagramCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.46 }}>
              <DiagramCard
                title="Back Draft"
                subtitle="Back body block with a shallower neckline and simplified shaping so it can be cut separately from the front."
                caption="Use the center-back fold line on the left edge if you are cutting on fold. Princess mode gives you a vertical panel line for back shaping."
                onDownload={() => downloadSvg(backRef, 'indian-blouse-back.svg')}
                onPrint={handlePrint}
              >
                <BackDiagram ref={backRef} draft={draftSet.back} style={style} />
              </DiagramCard>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <DiagramCard
                title="Sleeve Draft"
                subtitle="Sleeve block derived from the blouse measurements, with cap height and hem width shown as a separate printable piece."
                caption="The sleeve diagram is kept separate for printing. Leave the sleeve length blank if you want the app to derive a short blouse sleeve automatically."
                onDownload={() => downloadSvg(sleeveRef, 'indian-blouse-sleeve.svg')}
                onPrint={handlePrint}
              >
                <SleeveDiagram ref={sleeveRef} draft={draftSet.sleeve} />
              </DiagramCard>
            </motion.div>
          </div>
        </section>
      </div>
    </main>
  );
}
