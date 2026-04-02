import PageShell from "./PageShell";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/navigation";

function WishlistPage() {
  const navigate = useNavigate();

  const cards = [
    {
      kicker: "Saved Items",
      title: "Quick Access",
      description:
        "Keep your favorite products ready for one-tap checkout during the next order.",
    },
    {
      kicker: "Price Watch",
      title: "Track Discounts",
      description:
        "Receive alerts when your saved items go on sale or return to stock.",
    },
    {
      kicker: "Weekly Picks",
      title: "Smart Recommendations",
      description:
        "Get personalized suggestions based on products you save frequently.",
    },
  ];

  return (
    <PageShell
      eyebrow="Personal"
      title="Your Wishlist"
      subtitle="Collect products you love and revisit them quickly with intelligent reminders and personalized offers."
      gradient="from-rose-100 via-white to-pink-100"
      cards={cards}
      primaryAction={{
        label: "Browse Products",
        onClick: () => navigate(APP_ROUTES.HOME),
      }}
    />
  );
}

export default WishlistPage;
