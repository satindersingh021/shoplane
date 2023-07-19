import { render } from "@testing-library/react";
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
        <div
          className="container-fluid "
          style={{ borderRadius: 15, backgroundColor: "#e7fafe" }}
        >
          <h1 className="display-4 text-center">Cart</h1>
        </div>
        <br />
        <div className="row">
          <div className="col-md-9">
            <CartDetails />
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
