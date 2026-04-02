function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-700">
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl leading-tight text-slate-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 text-sm text-slate-600 sm:text-base">{subtitle}</p>
    </div>
  );
}

export default SectionTitle;
