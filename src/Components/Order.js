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
        const total = getBasketTotal(basket) + 0.0;
        const order_ids = [];
        const cart_ids = [];
        const product_ids = [];
        const product_price = [];
        const product_quantity = [];
        const order_status = [];
        basket.map((item, i) => {
            const order_number = orders.length;
            console.log("order_number", order_number)
            const order_id = (order_number) * basket.length + i
            order_status.push("Order Placed")
            order_ids.push(order_id);
            product_ids.push(item.id);
            product_price.push(item.price);
            product_quantity.push(item.quantity);
            cart_ids.push(i);
            const orderAPI = "/api/place_order/order_id=" + order_id.toString() + "&cart_id=" + i.toString() + "&cid=" + user.username + "&pid=" + item.id + "&price=" + item.price + "&quantity=" + item.quantity + "&total=" + total.toString();
            console.log(orderAPI);
            fetch(orderAPI)
                .then((response) => response)
                .then(
                    (data) => {
                        console.log(data);

                    })
        })
        dispatch(
            {
                type: 'PLACE_ORDER',
                order: basket,
                order_ids: order_ids,
                product_ids: product_ids,
                product_quantity: product_quantity,
                product_price: product_price,
                cart_ids: cart_ids,
                total: total,
                order_status: order_status

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
