import Constants from "./constants";

const Endpoints = {
    CATEGORY_URL: `${Constants.BASE_URL}products/categories/`,
    PRODUCTS_IN_CATEGORY: `${Constants.BASE_URL}products/category/`,
    ALL_PRODUCTS: `${Constants.BASE_URL}products/`,
    REGISTER_URL: `${Constants.BASE_URL}users/`,
    LOGIN_URL: `${Constants.BASE_URL}auth/login`
}

export default Endpoints