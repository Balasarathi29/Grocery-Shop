function ProductSpecifications({ specifications }) {
  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft sm:p-8">
      <h3 className="font-display text-2xl font-bold text-slate-900">
        Specifications
      </h3>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex flex-col rounded-xl border border-brand-100 bg-brand-50 p-4"
          >
            <span className="text-sm font-semibold text-brand-700">
              {spec.label}
            </span>
            <span className="mt-1 text-base font-bold text-slate-900">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductSpecifications;
