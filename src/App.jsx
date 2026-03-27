import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import HeroSection from "./components/home/HeroSection";
import CategorySection from "./components/home/CategorySection";
import ProductSection from "./components/home/ProductSection";
import { categories, featuredProducts } from "./data/storeData";

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-slate-900">
      <Navbar />
      <main>
        <HeroSection />
        <CategorySection categories={categories} />
        <ProductSection products={featuredProducts} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
