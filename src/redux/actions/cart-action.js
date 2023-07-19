import { ActionTypes } from "../constants/action-type"

export const addToCart = (product) => ({
    type: ActionTypes.ADD_TO_CART,
    payload: product
}
)

export const deleteFromCart = (product) => ({
    type: ActionTypes.DELETE_FROM_CART,
    payload: product
}
)