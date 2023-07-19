import { useDispatch } from "react-redux";
import store from "../redux/store";
import Navbar from "./Navbar";
import { deleteFromCart } from "../redux/actions/cart-action";
import { useNavigate } from "react-router";
import { useState } from "react";

function CartDetails() {
  const state = store.getState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cartSummary, getCartSummary] = useState();

  const cartDeleteHandler = (item) => () => {
    dispatch(deleteFromCart(item));
    getCartSummary(null);
    navigate("/");
    navigate("/cart");
  };

  return (
    <div>
      {state.cart.map((item) => (
        <div className="card mb-3" style={{ maxWidth: "540px;" }}>
          <div className="row g-0">
            <div className="col-md-4">
              <img
                src={item.image}
                className="img-fluid rounded-start"
                alt="..."
              />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title display-5">{item.title}</h5>
                <p className="card-text">{item.description}</p>
                <h3 className="card-text text-danger">
                  &#8377;
                  {item.price} X {item.quantity}(Qty) = &#8377;
                  {item.price * item.quantity}
                </h3>
                <button
                  className="btn btn-primary"
                  onClick={cartDeleteHandler(item)}
                >
                  Delete Item
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartDetails;
