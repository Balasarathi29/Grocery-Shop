function AdminStats({ stats }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-3xl border border-slate-200 bg-white px-5 py-4 shadow-soft"
        >
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700">
            {stat.label}
          </p>
          <p className="mt-2 text-xl font-bold text-slate-900">{stat.value}</p>
          {stat.helpText && (
            <p className="mt-1 text-xs text-slate-500">{stat.helpText}</p>
          )}
        </div>
      ))}
    </div>
  );
}

export default AdminStats;
