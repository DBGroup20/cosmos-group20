export const initialState = {
    basket: [],
    orders: [],
    user: null

};
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.quantity * item.price + amount, 0);
export const getBasketItemsTotal = (basket) =>
    basket?.reduce((amount, item) => item.quantity + amount, 0);

function reducer(state, action) {

    console.log(action);
    switch (action.type) {
        case 'ADD_TO_BASKET':
            let copy_basket = [...state.basket];
            const old_index = state.basket.findIndex((basketItem) => basketItem.id === action.item.id)
            if (old_index >= 0) {
                copy_basket.splice(old_index, 1);
            }
            state.basket = copy_basket;
            return {
                ...state,
                basket: [...state.basket, action.item]
            }
            break;
        case 'REMOVE_FROM_BASKET':
            let new_basket = [...state.basket];
            const index = state.basket.findIndex((basketItem) => basketItem.id === action.id)
            if (index >= 0) {

                new_basket[index].quantity = new_basket[index].quantity - 1;
                if (new_basket[index].quantity == 0) {
                    new_basket.splice(index, 1);
                }
            }
            else {
                console.warn("can't remove product (id: ${action.id})");
            }
            return { ...state, basket: new_basket }
            break
        case 'SET_USER':

            return { ...state, user: action.user }
            break
        case 'PLACE_ORDER':
            return {
                ...state,
                orders: [...state.orders, action.order]
            }
        case 'CLEAR_BASKET':
            return { ...state, basket: [] }
            break


        default:
            return state;

    }
}
export default reducer;