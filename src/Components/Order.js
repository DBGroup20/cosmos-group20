import React, { useState } from 'react';
import './Order.css';
import CurrencyFormat from "react-currency-format";

import { Link, useHistory } from 'react-router-dom';
import { getBasketTotal, getBasketItemsTotal } from './reducer.js';

import { useStateValue } from "./StateProvider.js";
import CheckoutProduct from "./CheckoutProduct.js";
import Subtotal from "./Subtotal.js";


function Order() {
    const [{ basket, user, orders }, dispatch] = useStateValue();
    const [balance, setBalance] = useState(user?.balance);
    const history = useHistory();
    console.log("user.username", user?.balance);
    const placeOrder = () => {
        dispatch(
            {
                type: 'PLACE_ORDER',
                order: basket,

            })
        const total = getBasketTotal(basket) + 0.0;

        basket.map((item, i) => {
            const order_number = orders.length;
            console.log("order_number", order_number)
            const order_id = (order_number) * basket.length + i
            const orderAPI = "/api/place_order/order_id=" + order_id.toString() + "&cart_id=" + i.toString() + "&cid=" + user.username + "&pid=" + item.id + "&price=" + item.price + "&quantity=" + item.quantity + "&total=" + total.toString();
            console.log(orderAPI);
            fetch(orderAPI)
                .then((response) => response)
                .then(
                    (data) => {
                        console.log(data);

                    })
        })
        history.push('/payment')

    }

    return (
        <div className="payment">
            <h1>
                Checkout(<Link to="/checkout">{getBasketItemsTotal(basket)} items</Link>)
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
                                        disabled={true}
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
                                        Subtotal ({getBasketItemsTotal(basket)} items): <strong>{`${value}`}</strong>
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
                        {
                            (balance - getBasketTotal(basket) > 0) ? (<button onClick={placeOrder} className="payment_button">Place Order</button>)
                                :
                                (<p>Cannot Place Order</p>)
                        }

                    </div>


                </div>


            </div>

        </div>
    )
}

export default Order
