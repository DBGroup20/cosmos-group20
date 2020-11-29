export const initialState = {
    basket: [],
    orders: [],
    order_status: [],
    totals: 0.0,
    order_ids: [],
    cart_ids: [],
    products: [],
    search_query: "",
    product_ids: [],
    product_quantity: [],
    product_price: [],
    user: null

};
export const getBasketTotal = (basket) =>
    basket?.reduce((amount, item) => item.quantity * item.price + amount, 0);
export const getBasketItemsTotal = (basket) =>
    basket?.reduce((amount, item) => item.quantity + amount, 0);

function reducer(state, action) {

    console.log(action);
    switch (action.type) {
        case 'SET_SEARCH_QUERY':
            return { ...state, search_query: action.search_query }
            break

        case 'ADD_PRODUCTS':
            return { ...state, products: action.products }
            break
        case 'REMOVE_PRODUCTS':
            return { ...state, products: action.products }
            break
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
                orders: [...state.orders, action.order],
                cart_ids: action.cart_ids,
                order_ids: action.order_ids,
                product_ids: action.product_ids,
                product_price: action.product_price,
                product_quantity: action.product_quantity,
                order_status: action.order_status,
                total: action.total


            }
        case 'MAKE_PAYMENT':
            return {
                ...state,
                user: action.user
            }
        case 'CLEAR_BASKET':
            return { ...state, basket: [] }
            break


        default:
            return state;

    }
}
export default reducer;