import clsx from 'clsx';
import { Download, Printer } from 'lucide-react';

export default function DiagramCard({
  title,
  subtitle,
  caption,
  onDownload,
  onPrint,
  children,
}) {
  return (
    <section className="draft-card overflow-hidden">
      <div className="border-b border-sand-200 bg-white px-5 py-4 sm:px-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-currant-700">
              Draft Diagram
            </p>
            <h3 className="mt-2 text-2xl font-semibold tracking-tight text-ink-950">{title}</h3>
            <p className="mt-2 max-w-xl text-sm leading-6 text-ink-600">{subtitle}</p>
          </div>
          <div className="print-hidden flex gap-2">
            <button
              type="button"
              onClick={onDownload}
              className={clsx(
                'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-4 py-2.5 text-sm font-semibold text-ink-900 transition',
                'hover:border-saffron-400 hover:bg-saffron-50',
              )}
            >
              <Download className="h-4 w-4" />
              Download SVG
            </button>
            <button
              type="button"
              onClick={onPrint}
              className={clsx(
                'inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full bg-ink-950 px-4 py-2.5 text-sm font-semibold text-white transition',
                'hover:bg-ink-900',
              )}
            >
              <Printer className="h-4 w-4" />
              Print
            </button>
          </div>
        </div>
      </div>
      <div className="grid-paper bg-white/70 px-4 py-4 sm:px-6 sm:py-6">{children}</div>
      <div className="border-t border-sand-200 bg-sand-50/80 px-5 py-3 text-sm text-ink-700 sm:px-6">
        {caption}
      </div>
    </section>
  );
}
