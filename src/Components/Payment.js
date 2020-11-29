import React, { useState } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { getBasketTotal, getBasketItemsTotal } from './reducer.js';
import { useStateValue } from "./StateProvider.js";
function Payment() {
    const [{ basket, user, orders }, dispatch] = useStateValue();
    const [balance, setBalance] = useState(user?.balance);
    const history = useHistory();
    const makePayment = () => {
        const payAPI = "/api/payment/balance=" + balance + "bill =" + getBasketTotal(basket);
        history.push("/payment-confirmed");
        user.balance = balance - getBasketTotal(basket);
        dispatch(
            {
                type: 'MAKE_PAYMENT',
                user: user

            }
        )
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
