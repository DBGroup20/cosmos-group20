import React, { useState } from 'react';
import './Payment.css';
import CurrencyFormat from "react-currency-format";

import { Link, useHistory } from 'react-router-dom';
import { getBasketTotal } from './reducer.js';

import { useStateValue } from "./StateProvider.js";
import CheckoutProduct from "./CheckoutProduct.js";
import Subtotal from "./Subtotal.js";


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const [balance, setBalance] = useState(user?.balance);
    console.log("user.username", user?.balance);

    return (
        <div className="payment">
            <h1>
                Checkout(<Link to="/checkout">{basket?.length} items</Link>)
            </h1>
            <div className="payment__container">
                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Delivery Address</h3>

                    </div>
                    <div className="payment__address">
                        <p>{user?.username}</p>
                    </div>

                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <h3>Review Items</h3>

                    </div>
                    <div className="payment__items">
                        {

                            basket.map(

                                (item, i) => (


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

                </div>

                <div className="payment__section">
                    <div className="payment__title">
                        <CurrencyFormat

                            renderText={(value) => (

                                <>
                                    <p>
                                        Subtotal ({basket.length} items): <strong>{`${value}`}</strong>
                                    </p>


                                </>
                            )}
                            decimalScale={2}
                            value={getBasketTotal(basket)}
                            displayType={"text"}
                            thousandSeparator={true}
                            prefix={"Rs"}
                        />


                    </div>
                    <div className="payment__details">
                        <p>{user?.username} Remaining Balance {balance - getBasketTotal(basket)}</p>
                        <button className="payment_button">Place Order</button>
                    </div>


                </div>


            </div>

        </div>
    )
}

export default Payment
