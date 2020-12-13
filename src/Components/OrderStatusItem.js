import React from 'react'
import { getBasketItemsTotal } from './reducer';
import { useStateValue } from "./StateProvider.js";
import "./Home.css";

function OrderStatusItem({ order_id, product_id, customer_id, price, quantity, cart_id, status, total }) {

    const [{ basket, user, orders }, dispatch] = useStateValue();
    return (
        <div className="home__col" >
            <table>
                <thead>
                    <tr>
                        <th>Order # </th>
                        <th>Customer_id</th>
                        <th>Cart_id</th>
                        <th>Product_id</th>
                        <th>Quantity</th>

                        <th>Status</th>




                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>{order_id}</td>
                        <td>{customer_id}</td>
                        <td>{cart_id}</td>


                        <td>{product_id}</td>

                        <td>{quantity}</td>

                        <td>{status}</td>

                    </tr>
                </tbody>


            </table>
        </div >
    )
}

export default OrderStatusItem;
