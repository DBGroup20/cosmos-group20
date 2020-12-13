import React, { useState } from 'react';
import { useStateValue } from "./StateProvider.js";
import InventoryProduct from "./InventoryProduct.js";
import { Link, useHistory } from 'react-router-dom';

import Subtotal from "./Subtotal.js";
import "./Checkout.css";

function AdminCheckout() {
    const [{ basket }] = useStateValue();
    const history = useHistory();
    const [adminBasket, setadminBasket] = useState([]);

    return (
        <div className="checkout">
            <div className="checkout__left">

                {adminBasket?.length === 0 ? (
                    <div>
                        <h2>Inventory Cart is Empty</h2>
                        <img className="checkout__ad" src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg" ></img>
                    </div>
                ) :
                    (
                        <div>
                            <h2>Inventory Cart is Not Empty</h2>
                            <img className="checkout__ad" src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg" ></img>
                            {

                                basket.map((item, i) => (


                                    <InventoryProduct
                                        key={i}
                                        id={item.id}
                                        name={item.name}
                                        image={item.image}
                                        price={item.price}
                                        disabled={false}
                                        quantity={item.quantity}
                                        stock={item.stock}
                                        brand_id={item.brand_id} />
                                )
                                )

                            }
                        </div>


                    )}
            </div>
            {basket.length > 0 && (
                <div className="checkout__right">
                    <Subtotal user_type={"admin"} />
                </div>

            )}
        </div>

    )
}

export default AdminCheckout
