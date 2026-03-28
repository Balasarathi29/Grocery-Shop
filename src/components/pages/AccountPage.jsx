import PageShell from "./PageShell";

function AccountPage() {
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
      title="Account Dashboard"
      subtitle="Manage your profile, orders, delivery addresses, and payment methods from one modern dashboard."
      gradient="from-violet-100 via-white to-indigo-100"
      cards={cards}
    />
  );
}

export default AccountPage;
