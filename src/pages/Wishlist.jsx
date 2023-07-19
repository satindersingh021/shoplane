import { Link, useNavigate } from "react-router-dom";
import store from "../redux/store";
import { useDispatch } from "react-redux";
import { useCallback } from "react";
import { addToWishlist } from "../redux/actions/wishlist-action";
import { addToCart } from "../redux/actions/cart-action";
import Navbar from "../components/Navbar";

function Wishlist() {
  const state = store.getState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickHandler = useCallback((product) => () => {
    dispatch(addToCart(product));
  });

  const wishlistHandler = useCallback((product) => () => {
    dispatch(addToWishlist(product));
    navigate("/");
    navigate("/wishlist");
  });

  return (
    <div className="container">
      <Navbar />
      <div className="row">
        {state.wishlist.map((product) => (
          <div className="col-md-3">
            <div className="card">
              <div className="card-body">
                <Link to={"/product/" + product.id}>
                  <img src={product.image} className="card-img-top" alt="..." />
                  <h5 className="card-title">{product.title}</h5>
                </Link>
                <p className="card-text">
                  {product.rating.rate}({product.rating.count})
                </p>
                <p className="card-text">{product.price}</p>
                <Link
                  className="btn btn-primary"
                  onClick={onClickHandler(product)}
                >
                  Add to Cart
                </Link>
                <Link
                  className="btn btn-primary"
                  onClick={wishlistHandler(product)}
                >
                  Remove from Wishlist
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
