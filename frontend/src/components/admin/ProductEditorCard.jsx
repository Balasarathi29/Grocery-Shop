function ProductEditorCard({
  form,
  onChange,
  onSubmit,
  onReset,
  onSwitchToCreate,
  isSaving,
  isEditing,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-700">
            Product Entry
          </p>
          <h2 className="mt-2 font-display text-2xl text-slate-900">
            {isEditing ? "Edit Product" : "Create Product"}
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Add a product to the backend catalog, then decide whether it should
            appear in offers.
          </p>
          <p className="mt-1 text-xs text-slate-500">
            Product numbers are assigned automatically when you save a new item.
          </p>
        </div>
        {isEditing && (
          <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-brand-700">
            Editing
          </span>
        )}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:gap-4">
        <Field
          label="Name"
          name="name"
          value={form.name}
          onChange={onChange}
          className="sm:col-span-1"
          required
        />
        <Field
          label="Category codes"
          name="categoryCodes"
          value={form.categoryCodes}
          onChange={onChange}
          placeholder="veg, staples"
          required
          className="sm:col-span-1"
        />
        <Field
          label="Unit"
          name="unit"
          value={form.unit}
          onChange={onChange}
          placeholder="500 g"
          required
        />
        <Field
          label="Highlights, comma separated"
          name="highlights"
          value={form.highlights}
          onChange={onChange}
          placeholder="Fresh, Local, High Protein"
        />
        <Field
          label="Price"
          name="price"
          value={form.price}
          onChange={onChange}
          type="number"
          required
        />
        <Field
          label="MRP"
          name="mrp"
          value={form.mrp}
          onChange={onChange}
          type="number"
          required
        />
        <Field
          label="Badge"
          name="badge"
          value={form.badge}
          onChange={onChange}
          placeholder="New"
        />
        <TextArea
          label="Specifications"
          name="specifications"
          value={form.specifications}
          onChange={onChange}
          rows={4}
          placeholder={
            "Add one specification per line using Label: Value\nExample: Weight: 500 g\nExample: Origin: Local"
          }
          className="sm:col-span-2"
        />
        <TextArea
          label="Description"
          name="description"
          value={form.description}
          onChange={onChange}
          rows={4}
          required
          className="sm:col-span-2"
        />
        <Field
          label="Product image URL"
          name="imageUrl"
          value={form.imageUrl}
          onChange={onChange}
          placeholder="https://..."
          className="sm:col-span-2"
        />

        <div className="sm:col-span-2 rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Image Preview
          </p>
          <img
            src={
              form.imageUrl ||
              "https://picsum.photos/seed/jothi-preview/640/480"
            }
            alt="Product preview"
            className="h-40 w-full rounded-xl object-cover"
          />
        </div>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            name="inStock"
            type="checkbox"
            checked={form.inStock}
            onChange={onChange}
            className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
          />
          In stock
        </label>

        <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
          <input
            name="featuredOffer"
            type="checkbox"
            checked={form.featuredOffer}
            onChange={onChange}
            className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
          />
          Featured in Offers page
        </label>
      </div>

      <div className="mt-5 flex flex-wrap gap-3">
        <button
          type="submit"
          disabled={isSaving}
          className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-brand-400"
        >
          {isEditing ? "Update Product" : "Save Product"}
        </button>
        {isEditing && (
          <button
            type="button"
            onClick={onSwitchToCreate || onReset}
            className="rounded-xl border border-emerald-200 bg-emerald-50 px-5 py-2.5 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100"
          >
            Add New Product
          </button>
        )}
        <button
          type="button"
          onClick={onReset}
          className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
        >
          Clear Form
        </button>
      </div>
    </form>
  );
}

function Field({ label, className = "", ...props }) {
  return (
    <label className={`text-sm font-medium text-slate-700 ${className}`}>
      {label}
      <input
        {...props}
        className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
      />
    </label>
  );
}

function TextArea({ label, className = "", ...props }) {
  return (
    <label className={`text-sm font-medium text-slate-700 ${className}`}>
      {label}
      <textarea
        {...props}
        className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
      />
    </label>
  );
}

export default ProductEditorCard;
