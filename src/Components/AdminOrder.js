import React, { useState, useEffect } from 'react';
import "./Home.css";
import OrderStatusItem from './OrderStatusItem.js';



function AdminOrder() {
    const [orders, setOrders] = useState([]);
    const [adminOrderStatus, setAdminOrderStatus] = useState("Placed");
    const [orderID, setOrderID] = useState(-1);
    const [orderDetails, setOrderDetails] = useState([]);
    const [orderPressed, setOrderPressed] = useState(false);

    useEffect(() => {

        const API = "/api/viewstatus/";
        const fetched = [];
        fetch(API)
            .then((response) => response.json())
            .then(
                (data) => {
                    console.log(data);
                    setOrders(data);

                }


            );

    }, [])
    const viewOrderDetails = (ord_id) => {

        //@app.route('/api/vieworderdetails/order_id=<int:order_id>')
        const orderAPI = "/api/vieworderdetails/order_id=" + ord_id;
        setOrderID(ord_id);
        fetch(orderAPI)
            .then((response) => response.json())
            .then(
                (data) => {
                    console.log(data);
                    setOrderDetails(data);
                    setOrderPressed(true);

                }


            );

    }
    const updateOrderStatus = (event, order_id) => {
        //@app.route('/api/order/update/status=<string:status>&order_id=<int:order_id>')
        event.preventDefault();
        const orderStatusAPI = "/api/order/update/status=" + adminOrderStatus + "&order_id=" + order_id;
        console.log("orderStatusAPI", orderStatusAPI);
        fetch(orderStatusAPI)
            .then((response) => response.json())
            .then(
                (data) => {
                    console.log("order status updated");
                })
    }
    return (
        <div>

            <p>Welcome to order status page </p>
            {
                orders?.length >= 0 ? (

                    orders.map((item, i) => (
                        <div key={i} className="home__row">
                            <p >Order ID : {item.order_id}</p>
                            <button key={i + orders.length} value={item.order_id} onClick={(event) => viewOrderDetails(event.target.value)}>View Order Details</button>
                            <form>
                                <label for="status">set a status:</label>
                                <select onChange={(event) => setAdminOrderStatus(event.target.value)} name="status__select" id="status">
                                    <option value="Placed">Placed</option>
                                    <option value="Delivered">Delivered</option>
                                    <option value="Invalid">Invalid</option>
                                </select>
                                <button onClick={(event) => { updateOrderStatus(event, item.order_id) }}>update</button>
                            </form>
                        </div>
                    ))


                )
                    :
                    (
                        <p>No orders to display</p>
                    )
            }
            <div className="home__row">
                {orderPressed === true ? (

                    <div className="home__row">
                        <OrderStatusItem
                            key={orderID}
                            product_id={orderDetails.product_id}
                            name={orderDetails.name}
                            customer_id={orderDetails.user_id}
                            total={orderDetails.total}
                            cart_id={orderDetails.cart_id}
                            order_id={orderDetails.order_id}
                            price={orderDetails.price}
                            quantity={orderDetails.quantity}
                            status={orderDetails.status} />
                    </div>

                ) :
                    (<> </>)
                }
            </div>
        </div>

    )
}

export default AdminOrder
