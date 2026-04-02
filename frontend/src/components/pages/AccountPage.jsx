import PageShell from "./PageShell";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES } from "../../constants/navigation";
import { useStorefront } from "../../context/useStorefront";

function AccountPage() {
  const navigate = useNavigate();
  const { auth, actions } = useStorefront();

  const handleLogout = () => {
    actions.onLogout();
    navigate(APP_ROUTES.HOME);
  };

  if (!auth.isAuthenticated) {
    return (
      <PageShell
        eyebrow="Member Access"
        title="Login to Access Account"
        subtitle="Create an account or sign in to view orders, save addresses, and unlock cart checkout."
        gradient="from-amber-100 via-white to-orange-100"
        cards={[
          {
            kicker: "Login Required",
            title: "Only logged-in users can add products to cart",
            description:
              "Sign in to continue shopping with cart, checkout, and order tracking.",
          },
        ]}
        primaryAction={{
          label: "Login",
          onClick: () => navigate(APP_ROUTES.LOGIN),
        }}
        secondaryAction={{
          label: "Register",
          onClick: () => navigate(APP_ROUTES.REGISTER),
        }}
      />
    );
  }

  const cards = [
    {
      kicker: "Orders",
      title: "Track Deliveries",
      description:
        "View live order status, delivery ETA, and complete order history.",
    },
    {
      kicker: "Addresses",
      title: "Manage Locations",
      description:
        "Save multiple delivery addresses for home, office, and family.",
    },
    {
      kicker: "Payments",
      title: "Secure Methods",
      description:
        "Use UPI, cards, wallets, and cash on delivery with protected checkout.",
    },
  ];

  return (
    <PageShell
      eyebrow="Profile"
      title={`Welcome, ${auth.user?.fullName || "Member"}`}
      subtitle="Manage your profile, orders, delivery addresses, and payment methods from one modern dashboard."
      gradient="from-violet-100 via-white to-indigo-100"
      cards={cards}
      secondaryAction={{ label: "Logout", onClick: handleLogout }}
    />
  );
}

export default AccountPage;
