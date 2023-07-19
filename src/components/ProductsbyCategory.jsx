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
                  <Link
                    className="btn btn-primary"
                    onClick={wishlistHandler(product)}
                  >
                    Add to Wishlist
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsbyCategory;
