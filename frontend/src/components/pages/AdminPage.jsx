import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";
import { requestJson } from "../../utils/api";

const emptyCategoryForm = {
  code: "",
  name: "",
};

const emptyProductForm = {
  legacyId: "",
  name: "",
  categoryCodes: "",
  unit: "",
  price: "",
  mrp: "",
  description: "",
  badge: "",
  palette: "from-emerald-100 to-lime-100",
  inStock: true,
  rating: "4.5",
  reviews: "0",
  highlights: "",
  specifications: "",
};

function AdminPage() {
  const navigate = useNavigate();
  const { auth, catalog, actions } = useStorefront();
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm);
  const [productForm, setProductForm] = useState(emptyProductForm);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const metrics = useMemo(
    () => [
      {
        label: "Categories",
        value: catalog.categories.length,
      },
      {
        label: "Products",
        value: catalog.allProducts.length,
      },
      {
        label: "Admin",
        value: auth.user?.email || "Unknown",
      },
    ],
    [auth.user?.email, catalog.allProducts.length, catalog.categories.length],
  );

  const handleCategoryChange = (event) => {
    const { name, value } = event.target;
    setCategoryForm((previous) => ({ ...previous, [name]: value }));
  };

  const handleProductChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveCategory = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      await requestJson("/api/categories", {
        method: "POST",
        body: {
          code: categoryForm.code.trim(),
          name: categoryForm.name.trim(),
        },
      });

      await actions.onRefreshCatalog();
      setStatus(`Category ${categoryForm.name.trim()} created.`);
      setCategoryForm(emptyCategoryForm);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const saveProduct = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const specifications = productForm.specifications.trim()
        ? JSON.parse(productForm.specifications)
        : [];

      await requestJson("/api/products", {
        method: "POST",
        body: {
          legacyId: Number(productForm.legacyId),
          name: productForm.name.trim(),
          categoryCodes: productForm.categoryCodes
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          unit: productForm.unit.trim(),
          price: Number(productForm.price),
          mrp: Number(productForm.mrp),
          description: productForm.description.trim(),
          badge: productForm.badge.trim(),
          palette: productForm.palette.trim(),
          inStock: productForm.inStock,
          rating: Number(productForm.rating),
          reviews: Number(productForm.reviews),
          highlights: productForm.highlights
            .split(",")
            .map((value) => value.trim())
            .filter(Boolean),
          specifications,
        },
      });

      await actions.onRefreshCatalog();
      setStatus(`Product ${productForm.name.trim()} created.`);
      setProductForm(emptyProductForm);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <div className="overflow-hidden rounded-3xl border border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-lime-50 p-6 shadow-soft sm:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-700">
                Admin Access
              </p>
              <h1 className="mt-2 font-display text-3xl text-slate-900 sm:text-4xl">
                Grocery Shop Control Center
              </h1>
              <p className="mt-3 max-w-2xl text-sm text-slate-600 sm:text-base">
                Manage the live catalog from one place. Create categories,
                publish products, and keep the storefront fresh.
              </p>
            </div>

            <button
              onClick={() => navigate(APP_ROUTES.ACCOUNT)}
              className="w-fit rounded-xl border border-emerald-200 bg-white px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-50"
            >
              Back to Account
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-emerald-100 bg-white px-5 py-4 shadow-soft"
              >
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
                  {metric.label}
                </p>
                <p className="mt-2 text-xl font-bold text-slate-900">
                  {metric.value}
                </p>
              </div>
            ))}
          </div>

          {status && (
            <p className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
              {status}
            </p>
          )}

          {error && (
            <p className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <form
            onSubmit={saveCategory}
            className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft"
          >
            <h2 className="font-display text-2xl text-slate-900">
              Create Category
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Add a new collection for the storefront navigation and filters.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Code
                <input
                  name="code"
                  value={categoryForm.code}
                  onChange={handleCategoryChange}
                  placeholder="fresh-produce"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Name
                <input
                  name="name"
                  value={categoryForm.name}
                  onChange={handleCategoryChange}
                  placeholder="Fresh Produce"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={isSaving}
              className="mt-5 rounded-xl bg-emerald-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:bg-emerald-400"
            >
              Save Category
            </button>
          </form>

          <form
            onSubmit={saveProduct}
            className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft"
          >
            <h2 className="font-display text-2xl text-slate-900">
              Create Product
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Publish a new product to the API-backed catalog.
            </p>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm font-medium text-slate-700">
                Legacy ID
                <input
                  name="legacyId"
                  value={productForm.legacyId}
                  onChange={handleProductChange}
                  placeholder="7"
                  type="number"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Name
                <input
                  name="name"
                  value={productForm.name}
                  onChange={handleProductChange}
                  placeholder="Organic Spinach"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                Category codes
                <input
                  name="categoryCodes"
                  value={productForm.categoryCodes}
                  onChange={handleProductChange}
                  placeholder="veg, staples"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Unit
                <input
                  name="unit"
                  value={productForm.unit}
                  onChange={handleProductChange}
                  placeholder="500 g"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Price
                <input
                  name="price"
                  value={productForm.price}
                  onChange={handleProductChange}
                  placeholder="120"
                  type="number"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                MRP
                <input
                  name="mrp"
                  value={productForm.mrp}
                  onChange={handleProductChange}
                  placeholder="150"
                  type="number"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                Description
                <textarea
                  name="description"
                  value={productForm.description}
                  onChange={handleProductChange}
                  placeholder="Short product summary"
                  rows="3"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                  required
                />
              </label>
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                Highlights, comma separated
                <input
                  name="highlights"
                  value={productForm.highlights}
                  onChange={handleProductChange}
                  placeholder="Fresh, Local, High Protein"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="text-sm font-medium text-slate-700 sm:col-span-2">
                Specifications JSON
                <textarea
                  name="specifications"
                  value={productForm.specifications}
                  onChange={handleProductChange}
                  placeholder='[{"label":"Origin","value":"Local Farm"}]'
                  rows="3"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Badge
                <input
                  name="badge"
                  value={productForm.badge}
                  onChange={handleProductChange}
                  placeholder="New"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Palette
                <input
                  name="palette"
                  value={productForm.palette}
                  onChange={handleProductChange}
                  placeholder="from-emerald-100 to-lime-100"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <input
                  name="inStock"
                  type="checkbox"
                  checked={productForm.inStock}
                  onChange={handleProductChange}
                  className="h-4 w-4 rounded border-slate-300 text-emerald-700 focus:ring-emerald-500"
                />
                In stock
              </label>
              <label className="text-sm font-medium text-slate-700">
                Rating
                <input
                  name="rating"
                  value={productForm.rating}
                  onChange={handleProductChange}
                  placeholder="4.6"
                  type="number"
                  step="0.1"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
              </label>
              <label className="text-sm font-medium text-slate-700">
                Reviews
                <input
                  name="reviews"
                  value={productForm.reviews}
                  onChange={handleProductChange}
                  placeholder="0"
                  type="number"
                  className="mt-1.5 w-full rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200"
                />
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={isSaving}
                className="rounded-xl bg-brand-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-800 disabled:cursor-not-allowed disabled:bg-brand-400"
              >
                Save Product
              </button>
            </div>
          </form>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft">
            <h2 className="font-display text-2xl text-slate-900">
              Current Categories
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {catalog.categories.map((category) => (
                <span
                  key={category.id}
                  className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-800"
                >
                  {category.name}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-brand-100 bg-white p-6 shadow-soft">
            <h2 className="font-display text-2xl text-slate-900">
              Current Products
            </h2>
            <div className="mt-4 grid gap-3">
              {catalog.allProducts.slice(0, 6).map((product) => (
                <div
                  key={product.id}
                  className="rounded-2xl border border-slate-200 px-4 py-3"
                >
                  <p className="font-semibold text-slate-900">{product.name}</p>
                  <p className="text-xs text-slate-500">
                    {product.unit} · Rs. {product.price}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AdminPage;
