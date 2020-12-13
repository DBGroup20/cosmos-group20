import React, { useState } from 'react';
import { useStateValue } from "./StateProvider.js";
import "./CheckoutProduct.css";
function InventoryProduct({ id, name, image, price, stock, disabled, brand_id, quantity, button_type }) {
    const [{ basket }, dispatch] = useStateValue();
    const [removeDisabled, setRemoveDisabled] = useState(disabled);
    const removeFromInventory = () => {
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
                <p className="checkoutProduct__name">Name: {name}</p>
                <p className="checkoutProduct__brand_id">Brand_id :{brand_id}</p>
                <p className="checkoutProduct__price">
                    <small>Rs</small>
                    <strong>{price}</strong>
                </p>
                <p className="checkoutProduct__price">
                    Quantity: {quantity}

                </p>
                <button disabled={removeDisabled} className="checkoutProduct__removeButton" onClick={removeFromInventory} >Remove from inventory</button>

            </div>

        </div>
    )
}


export default InventoryProduct
