function ProductRating({ rating, reviews }) {
  return (
    <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft sm:p-8">
      <h3 className="font-display text-2xl font-bold text-slate-900">
        Customer Reviews
      </h3>

      <div className="mt-6 flex flex-col items-center gap-2 text-center sm:flex-row sm:items-start sm:text-left">
        <div>
          <div className="flex items-center justify-center gap-2 sm:justify-start">
            <span className="text-4xl font-display font-bold text-brand-900">
              {rating}
            </span>
            <div className="flex flex-col">
              <div className="text-xl">
                {"⭐".repeat(Math.floor(rating))}
                {rating % 1 !== 0 && "✨"}
              </div>
              <span className="text-xs font-semibold text-slate-500">
                Based on {reviews} reviews
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 space-y-3 border-t border-brand-100 pt-6">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span>5 ⭐</span>
          </span>
          <div className="h-2 w-32 rounded-full bg-brand-100">
            <div
              className="h-full rounded-full bg-brand-700"
              style={{ width: "75%" }}
            />
          </div>
          <span className="text-sm text-slate-600">75%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span>4 ⭐</span>
          </span>
          <div className="h-2 w-32 rounded-full bg-brand-100">
            <div
              className="h-full rounded-full bg-brand-700"
              style={{ width: "15%" }}
            />
          </div>
          <span className="text-sm text-slate-600">15%</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span>3 ⭐</span>
          </span>
          <div className="h-2 w-32 rounded-full bg-brand-100">
            <div
              className="h-full rounded-full bg-brand-700"
              style={{ width: "7%" }}
            />
          </div>
          <span className="text-sm text-slate-600">7%</span>
        </div>
      </div>
    </div>
  );
}

export default ProductRating;
