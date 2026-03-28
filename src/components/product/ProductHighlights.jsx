function ProductHighlights({ highlights }) {
  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft sm:p-8">
      <h3 className="font-display text-2xl font-bold text-slate-900">
        Why Choose This?
      </h3>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {highlights.map((highlight, index) => (
          <div
            key={index}
            className="flex items-start gap-3 rounded-xl border border-emerald-100 bg-emerald-50 p-4"
          >
            <span className="mt-1 text-2xl">✓</span>
            <span className="font-semibold text-slate-700">{highlight}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductHighlights;
