import { ActionTypes } from "../constants/action-type"

export const addToWishlist = (product) => ({

    type: ActionTypes.ADD_TO_WISHLIST,
    payload: product

})