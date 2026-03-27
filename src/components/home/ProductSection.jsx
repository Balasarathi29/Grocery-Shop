import Container from "../layout/Container";
import SectionTitle from "../ui/SectionTitle";
import ProductCard from "../product/ProductCard";

function ProductSection({ products, onAddToCart }) {
  return (
    <section className="py-10">
      <Container>
        <SectionTitle
          eyebrow="Featured"
          title="Popular Picks This Week"
          subtitle="High-demand products with fresh stock and smart prices."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

export default ProductSection;
