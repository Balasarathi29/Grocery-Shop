import Container from "./Container";

function Footer() {
  return (
    <footer className="mt-16 border-t border-brand-100 bg-white/70 py-10">
      <Container className="flex flex-col items-start justify-between gap-4 text-sm text-slate-600 sm:flex-row sm:items-center">
        <p className="font-semibold text-slate-700">Jothi Grocery</p>
        <p>Open daily 6:00 AM - 10:00 PM | Free delivery above Rs. 499</p>
      </Container>
    </footer>
  );
}

export default Footer;
