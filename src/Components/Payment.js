import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { getBasketTotal, getBasketItemsTotal } from './reducer.js';
import { useStateValue } from "./StateProvider.js";
function Payment() {
    const [{ basket, user, orders }, dispatch] = useStateValue();
    const [balance, setBalance] = useState(user?.balance);
    const [userOrders, setUserOrders] = useState([]);


    const history = useHistory();
    const makePayment = () => {

        history.push("/payment-confirmed");
        user.balance = balance - getBasketTotal(basket);
        dispatch(
            {
                type: 'MAKE_PAYMENT',
                user: user,

            }
        )
        const userOrderAPI = "/api/orders/uid=" + user?.username;
        console.log(userOrderAPI);
        fetch(userOrderAPI)
            .then((response => response.json()))
            .then(
                (data) => {
                    console.log("order_details:", data);
                    setUserOrders(data);
                    let fetched_my_order_ids = [];
                    data.map((item, i) => (
                        fetched_my_order_ids.push(item[0])
                    ))
                    console.log(fetched_my_order_ids, userOrders);
                    var max_order_id = Math.max.apply(Math, fetched_my_order_ids);
                    console.log("max_order_id", max_order_id);
                    const payAPI = "/api/payment/bill=" + getBasketTotal(basket) + "&order_id=" + max_order_id + "&customer_id=" + user?.username;
                    console.log(payAPI);
                    fetch(payAPI)
                        .then((response) => response.json())
                        .then(
                            (data) => {
                                console.log(data);


                            }
                        );

                })

    }
    return (
        <div>
            <h1>Welcome to the payment's page</h1>
            <p>Balance : {balance}</p>
            <p>Bill :{getBasketTotal(basket)}</p>
            <p>Remaining Balance {balance - getBasketTotal(basket)}</p>

            <button onClick={makePayment}>Pay</button>

        </div>
    )
}

export default Payment
