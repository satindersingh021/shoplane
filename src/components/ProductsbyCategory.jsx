import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Endpoints from "../api/endpoints";
import { useParams } from "react-router";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cart-action";
import { addToWishlist } from "../redux/actions/wishlist-action";
import store from "../redux/store";
import Starrating from "./StarRating";

const ProductsbyCategory = () => {
  const [productsByCategory, getProductsByCategory] = useState([]);
  const { title } = useParams();
  const dispatch = useDispatch();

  const state = store.getState();

  const fetchData = () => {
    axios
      .get(Endpoints.PRODUCTS_IN_CATEGORY + title)
      .then((response) => {
        getProductsByCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  });

  const onClickHandler = useCallback((product) => () => {
    dispatch(addToCart(product));
  });

  const wishlistHandler = useCallback((product) => () => {
    dispatch(addToWishlist(product));
  });

  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="row">
          {productsByCategory.map((product) => (
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className=" text-end">
                    <span className="wish-icon">
                      <Link>
                        <i
                          className={
                            state.wishlist.some(
                              (wish) => wish.id === product.id
                            )
                              ? "bi bi-heart-fill text-danger"
                              : "bi bi-heart text-dark"
                          }
                          onClick={wishlistHandler(product)}
                          style={{ fontSize: 30 }}
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
                      className="card-title"
                      style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        paddingBottom: 10,
                      }}
                    >
                      {product.title}
                    </h5>
                  </Link>
                  <p className="card-text">
                    {product.rating.rate}
                    <Starrating data={product.rating.rate} />
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
                      className={
                        state.wishlist.some((wish) => wish.id === product.id)
                          ? "btn btn-outline-danger btn-lg"
                          : "btn btn-outline-dark btn-lg"
                      }
                      onClick={wishlistHandler(product)}
                    >
                      <i
                        className="bi bi-heart-fill"
                        style={{ fontSize: 20, marginRight: 15 }}
                      ></i>
                      {state.wishlist.some((wish) => wish.id === product.id)
                        ? "Remove from Wishlist"
                        : "Add to Wishlist"}
                    </Link>
                  </div>
                </div>
              </div>
              <br />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsbyCategory;
