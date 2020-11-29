import React from 'react'
import { getBasketItemsTotal } from './reducer';
import { useStateValue } from "./StateProvider.js";
function OrderStatusItem({ order_id, id, price, quantity, cart_id, status, total }) {

    const [{ basket, user, orders }, dispatch] = useStateValue();
    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Order # </th>
                        <th>Cart_id</th>
                        <th>Product_id</th>
                        <th>Price</th>
                        <th>Quantity</th>

                        <th>Status</th>
                        <th>Item Total</th>



                    </tr>
                </thead>
                <tbody>
                    <tr>

                        <td>{orders?.length}</td>
                        <td>{cart_id}</td>
                        <td>{id}</td>
                        <td>{price}</td>
                        <td>{quantity}</td>

                        <td>{status}</td>
                        <td>{price * quantity}</td>
                    </tr>
                </tbody>


            </table>
        </div>
    )
}

export default OrderStatusItem;
