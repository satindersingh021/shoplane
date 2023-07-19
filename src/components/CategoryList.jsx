import axios from "axios";
import { useEffect, useState } from "react";
import Endpoints from "../api/endpoints";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [Category, getCategory] = useState([]);

  const fetchData = () => {
    axios
      .get(Endpoints.CATEGORY_URL)
      .then((response) => {
        getCategory(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  });

  return (
    <div>
      <ul className="nav justify-content-center">
        <li className="nav-item lead">
          <Link
            className="nav-link"
            aria-current="page"
            to={"/wishlist"}
            style={{ textTransform: "uppercase", paddingRight: "100px" }}
          >
            WISHLIST
          </Link>
          <Link
            className="nav-link"
            aria-current="page"
            to={"/cart"}
            style={{ textTransform: "uppercase", paddingRight: "100px" }}
          >
            CART
          </Link>
          <Link
            className="nav-link"
            aria-current="page"
            to={"/"}
            style={{ textTransform: "uppercase", paddingRight: "100px" }}
          >
            ALL
          </Link>
        </li>
        {Category.map((category) => (
          <li className="nav-item lead">
            <Link
              className="nav-link active"
              aria-current="page"
              to={"/category/" + category}
              style={{ textTransform: "uppercase", paddingRight: "100px" }}
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
