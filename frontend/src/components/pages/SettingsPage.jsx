import PageShell from "./PageShell";

function SettingsPage() {
  const cards = [
    {
      kicker: "Notifications",
      title: "Alerts & Reminders",
      description:
        "Configure delivery alerts, deal updates, and account activity notifications.",
    },
    {
      kicker: "Privacy",
      title: "Data Controls",
      description:
        "Control visibility, data permissions, and account security preferences.",
    },
    {
      kicker: "App Experience",
      title: "Display & Language",
      description:
        "Adjust language, regional format, and interface preferences.",
    },
  ];

  return (
    <PageShell
      eyebrow="Preferences"
      title="Application Settings"
      subtitle="Personalize notifications, privacy options, and app experience with easy controls."
      gradient="from-slate-200 via-white to-zinc-100"
      cards={cards}
    />
  );
}

export default SettingsPage;
