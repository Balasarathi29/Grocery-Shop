import Container from "../layout/Container";
import OfferHeroBanner from "../offers/OfferHeroBanner";
import OfferDealCard from "../offers/OfferDealCard";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";

function OffersPage() {
  const navigate = useNavigate();
  const { auth, catalog, actions } = useStorefront();

  const dealCards = [...catalog.allProducts]
    .filter((product) => product.featuredOffer || product.mrp > product.price)
    .map((product) => {
      const savings = product.mrp - product.price;
      const discount = Math.round((savings / product.mrp) * 100);

      return {
        id: product.id,
        product,
        savings,
        discount,
      };
    })
    .sort((a, b) => {
      const featuredScoreA = Number(Boolean(a.product.featuredOffer));
      const featuredScoreB = Number(Boolean(b.product.featuredOffer));

      if (featuredScoreA !== featuredScoreB) {
        return featuredScoreB - featuredScoreA;
      }

      if (b.product.offerPriority !== a.product.offerPriority) {
        return b.product.offerPriority - a.product.offerPriority;
      }

      return b.savings - a.savings;
    })
    .slice(0, 6);

  const spotlightDeals = dealCards.slice(0, 2);

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <button
          onClick={() => navigate(APP_ROUTES.HOME)}
          className="mb-6 flex items-center gap-2 text-sm font-semibold text-brand-700 transition hover:text-brand-800"
        >
          ← Back to Home
        </button>

        <OfferHeroBanner dealCount={dealCards.length} />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          {spotlightDeals.map((deal) => (
            <button
              key={`spotlight-${deal.id}`}
              onClick={() =>
                navigate(APP_ROUTES.productDetail(deal.product.id))
              }
              className="rounded-2xl border border-orange-200 bg-gradient-to-r from-white to-orange-50 p-5 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-orange-300"
            >
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-orange-700">
                Spotlight Offer
              </p>
              <h2 className="mt-2 text-xl font-bold text-slate-900">
                {deal.product.name}
              </h2>
              <p className="mt-1 text-sm text-slate-600">{deal.product.unit}</p>
              <p className="mt-3 text-sm font-semibold text-emerald-700">
                Save Rs. {deal.savings} today
              </p>
            </button>
          ))}
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {dealCards.map((deal) => (
            <OfferDealCard
              key={deal.id}
              deal={deal}
              onAddToCart={actions.onAddToCart}
              isAuthenticated={auth.isAuthenticated}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default OffersPage;
