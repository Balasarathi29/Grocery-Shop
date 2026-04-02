function NavOptionCard({ item, onSelect }) {
  return (
    <button
      onClick={() => onSelect(item.path)}
      className="flex flex-col items-start gap-2 rounded-2xl border border-brand-100 bg-white p-4 text-left transition hover:border-brand-300 hover:bg-brand-50"
    >
      <div className="text-3xl">{item.icon}</div>
      <div>
        <h4 className="font-bold text-slate-900">{item.label}</h4>
        <p className="text-xs text-slate-500">{item.description}</p>
      </div>
    </button>
  );
}

export default NavOptionCard;
