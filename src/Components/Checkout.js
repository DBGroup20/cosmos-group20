import React from 'react';
import { useStateValue } from "./StateProvider.js";
import CheckoutProduct from "./CheckoutProduct.js";

import Subtotal from "./Subtotal.js";
import "./Checkout.css";

function Checkout() {
    const [{ basket }] = useStateValue();


    return (
        <div className="checkout">
            <div className="checkout__left">

                {basket?.length === 0 ? (
                    <div>
                        <h2>Shopping Cart is Empty</h2>
                        <img className="checkout__ad" src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg" ></img>
                    </div>
                ) :
                    (
                        <div>
                            <h2>Shopping Cart is Not Empty</h2>
                            <img className="checkout__ad" src="https://m.media-amazon.com/images/G/01/cart/empty/kettle-desaturated._CB445243794_.svg" ></img>
                            {

                                basket.map((item, i) => (


                                    <CheckoutProduct
                                        key={i}
                                        id={item.id}
                                        name={item.name}
                                        image={item.image}
                                        price={item.price}
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
                    <Subtotal />
                </div>

            )}
        </div>

    )
}

export default Checkout
