import { useEffect, useState } from "react";
import store from "../redux/store";

function CartSummary() {
  const state = store.getState();

  let sum = 0;
  const tempLength = state.cart.length;

  for (let i = 0; i < state.cart.length; i++) {
    sum = Math.floor(sum + state.cart[i].price * state.cart[i].quantity);
  }

  let shippingEstimate = Math.floor((2 * sum) / 100);
  let taxEstimate = Math.floor((5 * sum) / 100);
  let orderTotal = Math.floor(sum + shippingEstimate + taxEstimate);

  return (
    <div>
      {state.cart.length === 0 ? (
        <div className="card" style={{ position: "fixed" }}>
          <div className="card-body">
            <h2 className="text-center">Order Summary</h2>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Subtotal
                <span className="badge bg-primary rounded-pill">&#8377;0</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Shipping Estimate(2%)
                <span className="badge bg-primary rounded-pill">&#8377;0</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Tax Estimate(5%)
                <span className="badge bg-primary rounded-pill">&#8377;0</span>
              </li>
              <strong>
                <li className="list-group-item d-flex justify-content-between align-items-center">
                  Order Total
                  <span className="badge bg-primary rounded-pill">
                    &#8377;0
                  </span>
                </li>
              </strong>
            </ul>
          </div>
        </div>
      ) : (
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
                Shipping Estimate(2%)
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
      )}
    </div>
  );
}

export default CartSummary;
