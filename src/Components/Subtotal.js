import React from 'react';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider.js";
import { getBasketTotal } from './reducer.js';
import { Link, useHistory } from 'react-router-dom';


function Subtotal() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const add2cartdb = () => {

        //    '/api/add2cart/cid=<int:cart_id>&pid=<int:product_id>&price=<float:price>&quantity=<int:quantity>'
        basket.map((item, i) => {
            const cartAPI = "/api/add2cart/cart_id=" + "1" + "&cid=" + user.username + "&pid=" + item.id + "&price=" + item.price + ".0" + "&quantity=" + item.quantity;
            console.log(cartAPI);
            fetch(cartAPI)
                .then((response) => response)
                .then(
                    (data) => {
                        console.log(data);

                    })
        })

        history.push('/payment');





    }
    return (
        <div className="subtotal">
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
            <button onClick={add2cartdb}>Proceed to checkout</button>

        </div>
    )
}

export default Subtotal
