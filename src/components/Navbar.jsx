import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import React from "react";
import CategoryList from "./CategoryList";

function Navbar() {
  const [loginStatus, setLoginStatus] = useState(false);

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

  return (
    <div>
      <nav className="navbar">
        <div className="container-fluid">
          <h3>
            <span className="text-info display-5">SHOP</span>
            <span className="display-5">LANE</span>
          </h3>
          <div className="d-flex align-items-center">
            <div>
              <Link>
                <i
                  className="bi bi-heart"
                  style={{ fontSize: "25px", marginRight: "15px" }}
                ></i>
              </Link>
              <Link>
                <i
                  className="bi bi-cart"
                  style={{ fontSize: "25px", marginRight: "15px" }}
                ></i>
              </Link>
            </div>
            <div>
              {loginStatus ? (
                <Link
                  onClick={onLogoutHandler}
                  className="btn btn-outline-danger"
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
