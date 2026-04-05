import clsx from 'clsx';

const groups = [
  {
    title: 'Body',
    fields: [
      { name: 'backLength', label: 'Back length', hint: 'Back shoulder to hem' },
      { name: 'frontLength', label: 'Front length', hint: 'Front shoulder to hem' },
      { name: 'waist', label: 'Waist circumference', hint: 'Natural waist round' },
      { name: 'shoulder', label: 'Shoulder width', hint: 'Across shoulder' },
      { name: 'upperChest', label: 'Upper chest', hint: 'Upper chest round' },
      { name: 'fullChest', label: 'Full chest', hint: 'Full bust / chest round' },
    ],
  },
  {
    title: 'Princess Fit',
    fields: [
      { name: 'shoulderToBust', label: 'Shoulder to bust point', hint: 'Shoulder seam to apex' },
      { name: 'apexToApex', label: 'Apex to apex', hint: 'Bust point to bust point' },
      { name: 'lowerBust', label: 'Lower bust', hint: 'Under-bust round' },
      { name: 'frontNeckDepth', label: 'Front neck depth', hint: 'Boat neck front drop' },
      { name: 'backNeckDepth', label: 'Back neck depth', hint: 'Boat neck back drop' },
      { name: 'frontOpening', label: 'Front opening width', hint: 'Hook placket / overlap' },
    ],
  },
  {
    title: 'Sleeve',
    fields: [
      { name: 'sleeveLength', label: 'Sleeve length', hint: 'Finished sleeve length' },
      { name: 'sleeveRound', label: 'Sleeve round', hint: 'Round at sleeve opening' },
    ],
  },
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
            Enter the measurements used in real princess-cut blouse drafting
          </h2>
          <p className="mt-2 text-sm leading-6 text-ink-600">
            This is closer to the measurement list used by blouse pattern calculators than the earlier reduced form.
          </p>
        </div>
        <div className="rounded-full bg-saffron-100 px-3 py-1 text-xs font-semibold text-saffron-800">
          Required
        </div>
      </div>

      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.title}>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-ink-700">
              {group.title}
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              {group.fields.map((field) => (
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
          </div>
        ))}
      </div>
    </section>
  );
}
