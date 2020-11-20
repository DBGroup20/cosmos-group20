import React from 'react';
import { useStateValue } from "./StateProvider.js";
import "./CheckoutProduct.css";


function CheckoutProduct({ id, name, image, price, stock, brand_id, quantity }) {
    const [{ basket }, dispatch] = useStateValue();
    const removeFromBasket = () => {
        dispatch(
            {
                type: 'REMOVE_FROM_BASKET',
                id: id,

            })
    }
    return (
        <div className="checkoutProduct">
            <img className="checkoutProduct__image" src={image} alt=""></img>
            <div className="checkoutProduct__info">
                <p className="checkoutProduct__name">{name}</p>
                <p className="checkoutProduct__price">
                    <small>Rs</small>
                    <strong>{price}</strong>
                </p>
                <button onClick={removeFromBasket} >Remove from basket</button>

            </div>

        </div>
    )
}

export default CheckoutProduct
