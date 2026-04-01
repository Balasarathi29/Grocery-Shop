import Container from "../layout/Container";
import CartHeader from "./CartHeader";
import EmptyCartState from "./EmptyCartState";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";
import { useStorefront } from "../../context/useStorefront";

function CartPage() {
  const { cart, actions } = useStorefront();
  const { cartItems } = cart;

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const originalTotal = cartItems.reduce(
    (total, item) => total + item.mrp * item.quantity,
    0,
  );

  const savings = originalTotal - subtotal;
  const deliveryFee = subtotal === 0 || subtotal >= 499 ? 0 : 39;
  const total = subtotal + deliveryFee;

  return (
    <section className="py-10 sm:py-12">
      <Container>
        <CartHeader />

        {cartItems.length === 0 ? (
          <EmptyCartState />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncreaseQuantity={actions.onIncreaseQuantity}
                  onDecreaseQuantity={actions.onDecreaseQuantity}
                  onRemoveItem={actions.onRemoveItem}
                />
              ))}

              <button
                onClick={actions.onClearCart}
                className="text-sm font-semibold text-slate-500 transition hover:text-slate-700"
              >
                Clear entire cart
              </button>
            </div>

            <CartSummary
              subtotal={subtotal}
              savings={savings}
              deliveryFee={deliveryFee}
              total={total}
            />
          </div>
        )}
      </Container>
    </section>
  );
}

export default CartPage;
