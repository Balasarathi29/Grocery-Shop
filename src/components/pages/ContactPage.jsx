import PageShell from "./PageShell";

function ContactPage() {
  const cards = [
    {
      kicker: "Customer Care",
      title: "+91 98765 43210",
      description:
        "Call us daily between 6:00 AM and 10:00 PM for order support and quick help.",
    },
    {
      kicker: "Email",
      title: "support@freshshelf.in",
      description:
        "Share feedback, order issues, and business enquiries anytime.",
    },
    {
      kicker: "Store Address",
      title: "FreshShelf Hub, Chennai",
      description:
        "Visit our store for direct pickup, partner registration, and local promotions.",
    },
  ];

  return (
    <PageShell
      eyebrow="Support"
      title="Contact FreshShelf"
      subtitle="We are here to help with orders, delivery updates, and account questions through phone, email, and in-store support."
      gradient="from-cyan-100 via-white to-sky-100"
      cards={cards}
    />
  );
}

export default ContactPage;
