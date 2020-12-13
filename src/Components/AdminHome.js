import React, { useEffect, useState } from "react";
import "./Home.css";
import banner from "../Images/banner.jpg";
import lipStick from "../Images/lipStick.jpg"
import productImage from "../Images/product.png";

import makeUp from "../Images/makeUp.jpg";
import Product from "./Product";
import { useStateValue } from "./StateProvider.js";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form'

function AdminHome() {
    const [{ basket, products, user }, dispatch] = useStateValue();


    const [productName, setProductName] = useState("");
    const [productID, setProductID] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [stock, setStock] = useState(0);
    const [brandName, setBrandName] = useState("");
    const [brandID, setBrandID] = useState("");
    const [image, setImage] = useState("");
    const [formedFilled, setFormFilled] = useState(false);

    const [addedProducts, setAddedProducts] = useState([]);



    const [clicked, setClicked] = useState(false);
    const [show, setShow] = useState(false);

    const handleClose = () => { setShow(false); setClicked(false); };
    const handleShow = () => { setShow(true); setClicked(true); };
    const add2Inventory = () => {
        const product = { "name": productName, "id": productID, "brand": brandName, "brand_id": brandID, "image": image, "stock": stock, "price": price, "quantity": 1 }
        dispatch(
            {
                type: 'ADD_TO_BASKET',
                item: product

            }
        )
        setFormFilled(true);
        setClicked(false);
        //@app.route('/api/products/add/name=<string:name>&stock=<int:stock>&brand=<string:brand>&price=<int:price>')
        setAddedProducts([...addedProducts, product]);
        const addAPI = "/api/products/add/name=" + productName + "&pid=" + productID + "&bname=" + brandName + "&bid=" + brandID + "&stock=" + stock + "&price=" + price;
        const formData = new FormData();



        formData.append("file", image);

        fetch(addAPI, {
            method: 'POST',
            body: formData
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            .catch(error => {
                console.error('Error:', error);
            });

        console.log(addAPI);
        console.log(productName, productID, price, stock, brandName, brandID, image);
    }
    useEffect(() => {
        const productsAPI = "/api/products";
        fetch(productsAPI)
            .then((response) => response.json())
            .then(
                (data) => {
                    dispatch(
                        {
                            type: 'ADD_PRODUCTS',
                            products: data
                        }
                    )

                    console.log(data);



                })


    }, []);





    return (
        <div className="home">
            <p>Please do not refresh the page or manually change urls. You must navigate to another tab (tabs include : Check my orders, Your Prime etc) or logout and login again to see changes for some use cases like update price, update order status ,update stock</p>




        </div>
    );
}

export default AdminHome;

