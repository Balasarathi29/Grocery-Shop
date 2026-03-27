import Container from "../layout/Container";
import CartHeader from "./CartHeader";
import EmptyCartState from "./EmptyCartState";
import CartItemCard from "./CartItemCard";
import CartSummary from "./CartSummary";

function CartPage({
  cartItems,
  onContinueShopping,
  onIncreaseQuantity,
  onDecreaseQuantity,
  onRemoveItem,
  onClearCart,
}) {
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
        <CartHeader onContinueShopping={onContinueShopping} />

        {cartItems.length === 0 ? (
          <EmptyCartState onContinueShopping={onContinueShopping} />
        ) : (
          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <CartItemCard
                  key={item.id}
                  item={item}
                  onIncreaseQuantity={onIncreaseQuantity}
                  onDecreaseQuantity={onDecreaseQuantity}
                  onRemoveItem={onRemoveItem}
                />
              ))}

              <button
                onClick={onClearCart}
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
