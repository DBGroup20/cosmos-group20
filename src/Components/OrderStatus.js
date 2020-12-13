import React, { useEffect, useState } from 'react';
import { useStateValue } from "./StateProvider.js";
import OrderStatusItem from './OrderStatusItem.js';
function OrderStatus() {
    const [{ basket, orders, user, order_ids, cart_ids, total, order_status }, dispatch] = useStateValue();
    const [userOrders, setUserOrders] = useState([]);
    useEffect(() => {

        console.log("fetching order details");
        const userOrderAPI = "/api/orders/uid=" + user?.username;
        fetch(userOrderAPI)
            .then((response => response.json()))
            .then(
                (data) => {
                    console.log("order_details:", data);
                    setUserOrders(data);
                })
    }, [])





    //@app.route("/api/orders/oid=<int:order_id>&uid=<string:user_id>")
    return (
        <div className="orderStatus">
            <div className="orderStatus__left">

                {userOrders?.length === 0 ? (
                    <div>
                        <p>You have not placed any Orders</p>
                    </div>
                ) :
                    (
                        <div>
                            <h1>Order Status</h1>
                            {

                                userOrders.map((item, i) => (


                                    <p> Order_id: {item[0]} User_id:{item[1]}     Cart_id:{item[2]}       Product_id:{item[3]} Quantity:{item[4]}    Status:{item[5]}</p>
                                )
                                )



                            }

                        </div>



                    )}
            </div>

        </div>

    )
}


export default OrderStatus;
