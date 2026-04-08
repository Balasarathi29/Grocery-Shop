import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";
import { requestJson } from "../../utils/api";
import AdminHero from "../admin/AdminHero";
import AdminStats from "../admin/AdminStats";
import ProductEditorCard from "../admin/ProductEditorCard";
import ProductLibrary from "../admin/ProductLibrary";
import { createEmptyProductForm, productToForm } from "../admin/adminFormState";

function AdminPage() {
  const navigate = useNavigate();
  const { auth, catalog, actions } = useStorefront();
  const [productForm, setProductForm] = useState(createEmptyProductForm());
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const featuredProducts = useMemo(
    () =>
      catalog.allProducts
        .filter((product) => product.featuredOffer)
        .sort((a, b) => (b.offerPriority || 0) - (a.offerPriority || 0)),
    [catalog.allProducts],
  );

  const stats = useMemo(
    () => [
      {
        label: "Products",
        value: catalog.allProducts.length,
        helpText: "Editable catalog items",
      },
      {
        label: "Featured Offers",
        value: featuredProducts.length,
        helpText: "Shown on Offers page",
      },
      {
        label: "Current Admin",
        value: auth.user?.email || "Unknown",
        helpText: "Backend-authenticated",
      },
    ],
    [auth.user?.email, catalog.allProducts.length, featuredProducts.length],
  );

  const clearEditor = () => {
    setProductForm(createEmptyProductForm());
    setSelectedProductId(null);
    setStatus("");
    setError("");
  };

  const syncEditorFromProduct = (product) => {
    setSelectedProductId(product.id);
    setProductForm(productToForm(product));
    setStatus(`Editing ${product.name}`);
    setError("");
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setProductForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const parseSpecifications = (value) =>
    String(value || "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .map((line) => {
        const separatorIndex = line.indexOf(":");

        if (separatorIndex === -1) {
          return null;
        }

        const label = line.slice(0, separatorIndex).trim();
        const specificationValue = line.slice(separatorIndex + 1).trim();

        if (!label || !specificationValue) {
          return null;
        }

        return {
          label,
          value: specificationValue,
        };
      })
      .filter(Boolean);

  const saveProduct = async (event) => {
    event.preventDefault();
    setIsSaving(true);
    setError("");

    try {
      const payload = {
        name: productForm.name,
        categoryCodes: productForm.categoryCodes,
        unit: productForm.unit,
        price: Number(productForm.price),
        mrp: Number(productForm.mrp),
        description: productForm.description,
        badge: productForm.badge,
        imageUrl: productForm.imageUrl,
        inStock: productForm.inStock,
        highlights: productForm.highlights,
        specifications: parseSpecifications(productForm.specifications),
        featuredOffer: productForm.featuredOffer,
      };

      const result = selectedProductId
        ? await requestJson(`/api/products/${selectedProductId}`, {
            method: "PATCH",
            body: payload,
          })
        : await requestJson("/api/products", {
            method: "POST",
            body: payload,
          });

      await actions.onRefreshCatalog();
      clearEditor();
      setStatus(`${result.name} saved successfully.`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const deleteProduct = async (product) => {
    const confirmed = window.confirm(
      `Delete ${product.name}? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsSaving(true);
      setError("");
      await requestJson(`/api/products/${product.id}`, { method: "DELETE" });
      await actions.onRefreshCatalog();

      if (selectedProductId === product.id) {
        clearEditor();
      }

      setStatus(`${product.name} deleted.`);
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleFeatured = async (product) => {
    try {
      setIsSaving(true);
      setError("");
      await requestJson(`/api/products/${product.id}`, {
        method: "PATCH",
        body: {
          featuredOffer: !product.featuredOffer,
          offerPriority: product.featuredOffer ? 0 : 1,
        },
      });
      await actions.onRefreshCatalog();
      setStatus(
        product.featuredOffer
          ? `${product.name} removed from spotlight.`
          : `${product.name} added to spotlight.`,
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  const toggleDeal = async (product) => {
    try {
      setIsSaving(true);
      setError("");
      await requestJson(`/api/products/${product.id}`, {
        method: "PATCH",
        body: {
          featuredDeal: !product.featuredDeal,
        },
      });
      await actions.onRefreshCatalog();
      setStatus(
        product.featuredDeal
          ? `${product.name} removed from Deals For You.`
          : `${product.name} added to Deals For You.`,
      );
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="relative overflow-hidden py-10 sm:py-12">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.14),_transparent_30%),linear-gradient(180deg,_#f8fafc_0%,_#eef2ff_100%)]" />
      <Container>
        <AdminHero
          userEmail={auth.user?.email || "Unknown"}
          onBack={() => navigate(APP_ROUTES.ACCOUNT)}
        />

        <div className="mt-6 rounded-[2rem] border border-emerald-200 bg-emerald-50/80 p-5 shadow-soft">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
            Where to add products
          </p>
          <p className="mt-2 text-sm text-slate-700">
            Use the Add / Edit Product card below to create a new product, or
            click Edit in the Product Library to modify an existing one.
          </p>
        </div>

        <div className="mt-6">
          <AdminStats stats={stats} />
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

        <div className="mt-6 grid gap-6">
          <ProductEditorCard
            form={productForm}
            onChange={handleChange}
            onSubmit={saveProduct}
            onReset={clearEditor}
            onSwitchToCreate={clearEditor}
            isSaving={isSaving}
            isEditing={Boolean(selectedProductId)}
          />
        </div>

        <div className="mt-6">
          <ProductLibrary
            products={catalog.allProducts}
            onEdit={syncEditorFromProduct}
            onDelete={deleteProduct}
            onToggleFeatured={toggleFeatured}
            onToggleDeal={toggleDeal}
          />
        </div>
      </Container>
    </section>
  );
}

export default AdminPage;
