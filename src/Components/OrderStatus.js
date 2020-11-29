import React from 'react';
import { useStateValue } from "./StateProvider.js";
import OrderStatusItem from './OrderStatusItem.js';
function OrderStatus() {
    const [{ basket, orders, order_ids, cart_ids, total, order_status }, dispatch] = useStateValue();

    return (
        <div className="orderStatus">
            <div className="orderStatus__left">

                {basket?.length === 0 ? (
                    <div>
                        <p>You have not placed any Orders</p>
                    </div>
                ) :
                    (
                        <div>
                            <h1>Order Status</h1>
                            {

                                basket.map((item, i) => (


                                    <OrderStatusItem
                                        key={i}
                                        id={item.id}
                                        name={item.name}
                                        total={total}
                                        cart_id={cart_ids[i]}
                                        order_id={order_ids[i]}
                                        price={item.price}
                                        quantity={item.quantity}
                                        status={order_status[i]} />
                                )
                                )



                            }
                            <p>Grand Total for Order : {total}</p>
                        </div>



                    )}
            </div>

        </div>

    )
}


export default OrderStatus;
