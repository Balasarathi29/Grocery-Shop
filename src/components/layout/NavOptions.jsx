import Container from "../layout/Container";
import NavOptionCard from "./NavOptionCard";
import { menuNavItems } from "../../constants/navigation";
import { useNavigate } from "react-router-dom";

function NavOptions({ onClose }) {
  const navigate = useNavigate();

  return (
    <section className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-sm">
      <Container className="py-8">
        <div className="rounded-3xl border border-brand-100 bg-white shadow-2xl">
          <div className="border-b border-brand-100 p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-3xl font-bold text-slate-900">
                Menu
              </h2>
              <button
                onClick={onClose}
                className="rounded-lg bg-brand-100 p-2 text-2xl transition hover:bg-brand-200"
              >
                ✕
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Quick navigation to all sections
            </p>
          </div>

          <div className="grid gap-3 p-6 sm:grid-cols-2 sm:p-8">
            {menuNavItems.map((item) => (
              <NavOptionCard
                key={item.path}
                item={item}
                onSelect={(path) => {
                  navigate(path);
                  onClose();
                }}
              />
            ))}
          </div>

          <div className="border-t border-brand-100 bg-brand-50 p-6 text-center sm:p-8">
            <p className="text-xs text-slate-600">
              FreshShelf - Your neighborhood grocery store
            </p>
            <p className="mt-2 text-xs text-slate-500">
              Open daily 6:00 AM - 10:00 PM | Free delivery above Rs. 499
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default NavOptions;
