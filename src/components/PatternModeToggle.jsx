import clsx from 'clsx';

const modes = [
  {
    id: 'princess',
    title: 'Princess cut',
    description: 'Shows the panel seam shaping through the bust and waist.',
  },
  {
    id: 'classic',
    title: 'Classic blouse',
    description: 'Shows a simpler dart-led draft for a standard blouse block.',
  },
];

export default function PatternModeToggle({ value, onChange }) {
  return (
    <section className="draft-card p-5 sm:p-6">
      <p className="text-sm font-semibold uppercase tracking-[0.22em] text-currant-700">
        Pattern Type
      </p>
      <div className="mt-4 grid gap-3">
        {modes.map((mode) => {
          const active = value === mode.id;
          return (
            <button
              key={mode.id}
              type="button"
              onClick={() => onChange(mode.id)}
              className={clsx(
                'min-h-[52px] rounded-[24px] border px-4 py-4 text-left transition',
                active
                  ? 'border-currant-500 bg-currant-700 text-white shadow-[0_18px_40px_rgba(182,30,70,0.28)]'
                  : 'border-ink-100 bg-sand-50 text-ink-900 hover:border-saffron-300 hover:bg-saffron-50',
              )}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="text-base font-semibold">{mode.title}</div>
                  <div className={clsx('mt-1 text-sm', active ? 'text-white/82' : 'text-ink-600')}>
                    {mode.description}
                  </div>
                </div>
                <span
                  className={clsx(
                    'mt-1 h-4 w-4 rounded-full border-2',
                    active ? 'border-white bg-saffron-300' : 'border-ink-300 bg-white',
                  )}
                  aria-hidden="true"
                />
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}
