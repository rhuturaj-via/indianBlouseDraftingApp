import clsx from 'clsx';

const fields = [
  { name: 'fabricLength', label: 'Fabric length', hint: 'Example: 50' },
  { name: 'shoulder', label: 'Shoulder size', hint: 'Across shoulder' },
  { name: 'blouseLength', label: 'Blouse length', hint: 'Shoulder to hem' },
  { name: 'waist', label: 'Waist size', hint: 'Body waist round' },
  { name: 'chest', label: 'Chest size', hint: 'Upper chest round' },
  { name: 'bust', label: 'Bust size', hint: 'Full bust round' },
  { name: 'neck', label: 'Neck size', hint: 'Neck round' },
  { name: 'sleeveLength', label: 'Sleeve length', hint: 'Optional, auto if blank' },
];

export default function MeasurementForm({ values, onChange }) {
  return (
    <section className="draft-card p-5 sm:p-6">
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-currant-700">
            Measurement Sheet
          </p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-ink-950">
            Enter blouse measurements in inches
          </h2>
        </div>
        <div className="rounded-full bg-saffron-100 px-3 py-1 text-xs font-semibold text-saffron-800">
          Live draft
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field.name} className="space-y-2">
            <span className="block text-sm font-medium text-ink-900">{field.label}</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.25"
              value={values[field.name]}
              onChange={(event) => onChange(field.name, event.target.value)}
              className={clsx(
                'min-h-[48px] w-full rounded-2xl border border-ink-200 bg-white px-4 py-3 text-base text-ink-950 outline-none transition',
                'focus:border-currant-400 focus:ring-4 focus:ring-currant-100',
              )}
              aria-label={field.label}
              placeholder={field.hint}
            />
            <span className="block text-sm text-ink-600">{field.hint}</span>
          </label>
        ))}
      </div>
    </section>
  );
}
