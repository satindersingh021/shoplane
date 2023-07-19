import CartDetails from "../components/CartDetails";
import CartSummary from "../components/CartSummary";
import Navbar from "../components/Navbar";
import store from "../redux/store";

function CartPage() {
  const state = store.getState();

  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="row">
          <div className="col-md-9">
            {state.cart.length ? (
              <CartDetails />
            ) : (
              <h1 className="text-center">Cart is Empty&#128580;</h1>
            )}
          </div>

          <div className="col-md-3">
            <CartSummary />
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
