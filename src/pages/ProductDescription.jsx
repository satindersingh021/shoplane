import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useParams } from "react-router";
import axios from "axios";
import Endpoints from "../api/endpoints";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cart-action";
import { addToWishlist } from "../redux/actions/wishlist-action";

function ProductDescription() {
  const dispatch = useDispatch();
  const [product, getProduct] = useState({});
  const { id } = useParams();

  const fetchData = () => {
    axios
      .get(Endpoints.ALL_PRODUCTS + id)
      .then((response) => {
        getProduct(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  });

  const onClickHandler = () => {
    dispatch(addToCart(product));
  };

  const wishlistHandler = () => {
    dispatch(addToWishlist(product));
  };

  return (
    <div>
      <div className="container">
        <Navbar />
        <div
          className="container-fluid "
          style={{ borderRadius: 15, backgroundColor: "#e7fafe" }}
        >
          <h1 className="display-4 text-center">Product Description</h1>
        </div>
        <div className="wrapper">
          <div className="row">
            <div className="col-md-6">
              <img className="img-fluid" src={product.image} alt="" />
            </div>
            <div className="col-md-6">
              <h2 className="display-4">{product.title}</h2>
              <br />
              <p className="lead">{product.description}</p>
              <br />
              {/* <p>{rating}</p> */}
              <h2 className="display-5 text-secondary">
                <span>&#8377;</span>
                {product.price}
              </h2>
              <br />
              <button
                style={{ marginRight: 20 }}
                className="btn btn-primary btn-lg"
                onClick={onClickHandler}
              >
                <span style={{ marginRight: 10 }} class="bi bi-cart3"></span>
                Add to Cart
              </button>
              <button
                className="btn btn-outline-danger btn-lg"
                onClick={wishlistHandler}
              >
                <span style={{ marginRight: 10 }} class="bi bi-heart"></span>
                Add to Wishlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDescription;
