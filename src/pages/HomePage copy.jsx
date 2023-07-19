import { useCallback, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import Endpoints from "../api/endpoints";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cart-action";
import { addToWishlist } from "../redux/actions/wishlist-action";
import store from "../redux/store";

function HomePage() {
  const [products, getProducts] = useState([]);
  const dispatch = useDispatch();
  const state = store.getState();

  console.log(state.wishlist);
  // const [isLiked, getLiked] = useState(state);

  const fetchData = () => {
    axios
      .get(Endpoints.ALL_PRODUCTS)
      .then((response) => {
        getProducts(response.data);
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
    console.log(` Product Data - ${product.id}`);
    dispatch(addToWishlist(product));
  });

  return (
    <div>
      <div className="container">
        <Navbar />
        <div className="row">
          {products.map((product) => (
            <div className="col-md-3">
              <div className="card">
                <div className="card-body">
                  <Link onClick={wishlistHandler(product)}>
                    {state.wishlist.map((items) => {
                      items.isLiked ? (
                        <span class="d-flex justify-content-end">
                          <i
                            className="bi bi-heart-fill text-danger"
                            style={{ fontSize: "25px", marginRight: "15px" }}
                          ></i>
                        </span>
                      ) : (
                        <span class="d-flex justify-content-end">
                          <i
                            className="bi bi-heart text-danger"
                            style={{ fontSize: "25px", marginRight: "15px" }}
                          ></i>
                        </span>
                      );
                    })}
                  </Link>
                  <Link to={"/product/" + product.id}>
                    <img
                      src={product.image}
                      className="card-img-top"
                      alt="..."
                    />
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
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
