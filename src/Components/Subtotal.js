import React from 'react';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider.js";
import { getBasketTotal, getBasketItemsTotal } from './reducer.js';
import { Link, useHistory } from 'react-router-dom';


function Subtotal({ user_type }) {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();
    const add2db = () => {

        //    '/api/add2cart/cid=<int:cart_id>&pid=<int:product_id>&price=<float:price>&quantity=<int:quantity>'
        if (user_type === "customer") {
            basket.map((item, i) => {

                const cartAPI = "/api/add2cart/cart_id=" + i.toString() + "&cid=" + user?.username + "&pid=" + item.id + "&price=" + item.price + "&quantity=" + item.quantity;
                console.log(cartAPI);
                fetch(cartAPI)
                    .then((response) => response)
                    .then(
                        (data) => {
                            console.log(data);

                        })
            })
            history.push('/order');
        }
        if (user_type === "admin") {

            basket.map((item, i) => {
                //@app.route('/api/products/add/name=<string:name>&stock=<int:stock>&brand=<string:brand>&price=<float:price>')

                const inventoryAPI = "/api/products/name=" + item.name + "&stock=" + item.stock + "&brand=" + item.brand + "&price=" + item.price;
                console.log(inventoryAPI);
                fetch(inventoryAPI)
                    .then((response) => response)
                    .then(
                        (data) => {
                            console.log(data);

                        })
            })


        }







    }
    return (
        <div className="subtotal">
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
            {
                user_type === "customer" ? (<button onClick={add2db}>Proceed to checkout</button>)
                    :
                    (<button onClick={add2db}>Push to Inventory</button>)
            }
        </div>
    )
}

export default Subtotal
