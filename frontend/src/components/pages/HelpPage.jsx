import PageShell from "./PageShell";

function HelpPage() {
  const cards = [
    {
      kicker: "FAQ",
      title: "Common Questions",
      description:
        "Find instant answers for delivery timings, refunds, and order changes.",
    },
    {
      kicker: "Live Support",
      title: "Chat Assistance",
      description:
        "Connect with an agent for urgent issues and real-time order updates.",
    },
    {
      kicker: "Policies",
      title: "Returns & Refunds",
      description:
        "Read clear guidelines for damaged items, replacements, and refund timelines.",
    },
  ];

  return (
    <PageShell
      eyebrow="Help Center"
      title="Support & FAQs"
      subtitle="Need help with orders, payments, or returns? Get quick support and clear policy guidance."
      gradient="from-teal-100 via-white to-emerald-100"
      cards={cards}
    />
  );
}

export default HelpPage;
