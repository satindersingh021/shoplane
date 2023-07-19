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
            to={"/"}
            style={{
              textTransform: "uppercase",
              paddingRight: "70px",
              color: "black",
            }}
          >
            <strong>ALL</strong>
          </Link>
        </li>
        {Category.map((category) => (
          <li className="nav-item lead">
            <Link
              className="nav-link active"
              aria-current="page"
              to={"/category/" + category}
              style={{
                textTransform: "uppercase",
                paddingRight: "70px",
                color: "black",
              }}
            >
              <strong>{category}</strong>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
