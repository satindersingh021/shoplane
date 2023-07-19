import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import CategoryList from "./CategoryList";
import store from "../redux/store";

function Navbar() {
  const [loginStatus, setLoginStatus] = useState(false);

  const state = store.getState();
  let cartItem = "";
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setLoginStatus(true);
    } else {
      setLoginStatus(false);
    }
  }, [loginStatus]);

  const onLogoutHandler = () => {
    localStorage.clear();
    setLoginStatus(false);
  };
  if (state.cart.length === 0) {
    cartItem = 0;
  } else {
    cartItem = state.cart.length;
  }
  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <Link className="nav-link" to={"/"}>
            <b>
              <h3>
                <span
                  className="text-info display-5"
                  style={{ fontWeight: "inherit" }}
                >
                  SHOP
                </span>
                <span className="display-5" style={{ fontWeight: "inherit" }}>
                  LANE
                </span>
              </h3>
            </b>
          </Link>
          <div className="d-flex align-items-center">
            <div>
              <Link to={"/wishlist"}>
                <i
                  className="bi bi-heart-fill text-danger"
                  style={{ fontSize: "25px", marginRight: "15px" }}
                ></i>
              </Link>
              <Link to={"/cart"}>
                <i
                  className="bi bi-cart-check-fill"
                  style={{ fontSize: "25px", marginRight: "15px" }}
                >
                  <small style={{ fontSize: "initial" }}>
                    <span className="position-absolute top-10 start-10 translate-middle badge rounded-pill bg-danger">
                      {cartItem}
                      <span className="visually-hidden">Cart Items</span>
                    </span>
                  </small>
                </i>
              </Link>
            </div>
            <div>
              {loginStatus ? (
                <Link
                  onClick={onLogoutHandler}
                  className="btn btn-danger"
                >
                  Logout
                </Link>
              ) : (
                <Link className="btn btn-outline-success" to={"/login"}>
                  Login{" "}
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
      <hr />
      <CategoryList />
      <hr />
      <br />
      <br />
    </div>
  );
}

export default Navbar;
