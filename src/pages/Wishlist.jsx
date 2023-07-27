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
  });

  return (
    <div className="container">
      <Navbar />

      {state.wishlist.length === 0 ? (
        <div>
          <h1 className="text-center">Your Wishlist is Empty&#128517;</h1>
        </div>
      ) : (
        <div className="row">
          {state.wishlist.map((product) => (
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className=" text-end">
                    <span className="wish-icon">
                      <Link>
                        <i
                          className="bi bi-heart-fill text-danger "
                          style={{ fontSize: 30 }}
                          onClick={wishlistHandler(product)}
                        ></i>
                      </Link>
                    </span>
                  </div>
                  <Link className="nav-link" to={"/product/" + product.id}>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt="..."
                      style={{ width: "100%", height: 300 }}
                    />
                    <h5
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingBottom: 10,
                      }}
                      className="card-title"
                    >
                      {product.title}
                    </h5>
                  </Link>
                  <p className="card-text">
                    {product.rating.rate}
                    <i className="bi bi-star-fill text-warning"></i>
                    &nbsp;&nbsp;(
                    {product.rating.count})
                  </p>
                  <h3 className="card-text text-secondary">
                    &#8377;{product.price}
                  </h3>
                  <div className="d-grid gap-2">
                    <Link
                      className="btn btn-primary btn-lg"
                      onClick={onClickHandler(product)}
                    >
                      <i
                        className="bi bi-cart"
                        style={{ fontSize: 20, marginRight: 15 }}
                      ></i>
                      Add to Cart
                    </Link>
                    <Link
                      className="btn btn-lg text-bg-danger"
                      onClick={wishlistHandler(product)}
                    >
                      <i
                        className="bi bi-heart"
                        style={{ fontSize: 20, marginRight: 15 }}
                      ></i>
                      Remove from Wishlist
                    </Link>
                  </div>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;
