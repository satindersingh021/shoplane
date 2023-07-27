import { useEffect, useState } from "react";
import store from "../redux/store";
import { useNavigate } from "react-router";

function CartSummary() {
  const state = store.getState();
  const navigate = useNavigate();

  // const [cartSummary, setCartSummary] = useState(state.cart.length);

  // const tempLength = state.cart.length;

  useEffect(() => {
    // setCartSummary(state.cart.length);
    navigate("/cart");
  }, [state.cart.length]);

  let sum = 0;
  for (let i = 0; i < state.cart.length; i++) {
    sum = Math.round(sum + state.cart[i].price * state.cart[i].quantity);
  }

  let shippingEstimate = (2 * sum) / 100;
  let taxEstimate = (5 * sum) / 100;
  let orderTotal = Math.round(sum + shippingEstimate + taxEstimate);

  return (
    <div>
      {/* {cartSummary > 0 ? ( */}
      <div className="card" style={{ position: "fixed" }}>
        <div className="card-body">
          <h2 className="text-center">Order Summary</h2>
          <ul className="list-group">
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Subtotal
              <span className="badge bg-primary rounded-pill">
                &#8377;{sum}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Shipping(2%)
              <span className="badge bg-primary rounded-pill">
                &#8377;{shippingEstimate}
              </span>
            </li>
            <li className="list-group-item d-flex justify-content-between align-items-center">
              Tax Estimate(5%)
              <span className="badge bg-primary rounded-pill">
                &#8377;{taxEstimate}
              </span>
            </li>
            <strong>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Order Total
                <span className="badge bg-primary rounded-pill">
                  &#8377;{orderTotal}
                </span>
              </li>
            </strong>
          </ul>
        </div>
      </div>
      {/* ) : null} */}
    </div>
  );
}

export default CartSummary;
