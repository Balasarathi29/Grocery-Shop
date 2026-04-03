function AdminHero({ userEmail, onBack }) {
  return (
    <div className="overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.28),_transparent_32%),linear-gradient(135deg,_#08111f_0%,_#0f172a_55%,_#14213d_100%)] p-6 text-white shadow-2xl sm:p-10">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="inline-flex rounded-full border border-emerald-400/30 bg-white/5 px-3 py-1 text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">
            Admin Access
          </p>
          <h1 className="mt-4 font-display text-3xl text-white sm:text-5xl">
            Grocery Shop Control Center
          </h1>
          <p className="mt-4 max-w-2xl text-sm text-slate-300 sm:text-base">
            Add products, update pricing, remove old items, and control what
            appears on the Offers page from one backend-powered workspace.
          </p>
          <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-emerald-300">
            Signed in as {userEmail}
          </p>
        </div>

        <button
          onClick={onBack}
          className="w-fit rounded-xl border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/15"
        >
          Back to Account
        </button>
      </div>
    </div>
  );
}

export default AdminHero;
