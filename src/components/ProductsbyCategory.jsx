import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Endpoints from "../api/endpoints";
import { useParams } from "react-router";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cart-action";
import { addToWishlist } from "../redux/actions/wishlist-action";

const ProductsbyCategory = () => {
  const [productsByCategory, getProductsByCategory] = useState([]);
  const { title } = useParams();
  const dispatch = useDispatch();

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
                      className="btn btn-outline-danger btn-lg"
                      onClick={wishlistHandler(product)}
                    >
                      <i
                        className="bi bi-heart"
                        style={{ fontSize: 20, marginRight: 15 }}
                      ></i>
                      Add to Wishlist
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
