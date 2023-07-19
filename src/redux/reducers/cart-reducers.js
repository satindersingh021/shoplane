import { ActionTypes } from "../constants/action-type"

const initialState = {
    NumberCart: 0,
    cart: [],
    wishlist: []
}

// console.log(initialState)
export const cartReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case ActionTypes.GET_NUMBER_CART:
            return {
                ...state.NumberCart
            };
        case ActionTypes.ADD_TO_CART:
            if (state.NumberCart === 0) {
                let item = {
                    ...payload,
                    quantity: 1
                }
                state.cart.push(item);
            }
            else {
                let verify = false;
                state.cart.map((item, index) => {
                    if (item.id === payload.id) {
                        state.cart[index].quantity++
                        verify = true;
                    }
                })
                if (!verify) {
                    let item = {
                        ...payload,
                        quantity: 1
                    }
                    state.cart.push(item);
                }
            }
            return {
                ...state,
                NumberCart: state.NumberCart + 1
            }
        case ActionTypes.DELETE_FROM_CART:
            if (state.cart.find(item => item.id === payload.id)) {

                const index = state.cart.findIndex(item => item.id === payload.id);

                state.cart.splice(index, 1)
            }
            return {
                ...state,
                NumberCart: state.NumberCart + 1
            }
        case ActionTypes.ADD_TO_WISHLIST:

            if (state.wishlist.find(item => item.id === payload.id)) {
                const index = state.wishlist.findIndex(item => item.id === payload.id);

                state.wishlist.splice(index, 1)
                state.isLiked = false;
            }
            else {
                let item = {
                    ...payload,
                    isLiked: true
                }
                state.wishlist.push(item)
            }
            return {
                ...state,
                NumberCart: state.NumberCart + 1
            }
        default:
            return state;
    }
}