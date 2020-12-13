import React, { useEffect, useState } from "react";
import "./Home.css";
import banner from "../Images/banner.jpg";
import lipStick from "../Images/lipStick.jpg"
import productImage from "../Images/product.png";

import makeUp from "../Images/makeUp.jpg";
import Product from "./Product";
import { useStateValue } from "./StateProvider.js";
import Modal from 'react-bootstrap/Modal';
function Inventory() {

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

    const handleClose = () => { setClicked(false); };
    const handleShow = () => { setClicked(true); };
    const add2Inventory = () => {
        const product = { "name": productName, "id": productID, "brand": brandName, "brand_id": brandID, "image": image, "stock": stock, "price": price, "quantity": 1 }

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
        <div>
            <div className="home__row">
                <button onClick={handleShow}>
                    Add New Product
            </button>
                <p>Please do not refresh the page or manually change urls. You must navigate to another tab (tabs include : Check my orders, Your Prime etc) or logout and login again to see changes for some use cases like update price, update order status ,update stock</p>

                {
                    clicked === true ? (


                        <form >

                            <h1>Product Name</h1>
                            <input placeholder="Enter Product name" value={productName} onChange={(event) => setProductName(event.target.value)} type="text"></input>
                            <h1>Product ID</h1>
                            <input placeholder="Enter Product ID" value={productID} onChange={(event) => setProductID(event.target.value)} type="text"></input>
                            <h1>Product Price</h1>
                            <input placeholder="Enter Product Price" value={price} onChange={(event) => setPrice(event.target.value)} type="text"></input>
                            <h1>Stock</h1>
                            <input placeholder="Enter Product Stock" value={stock} onChange={(event) => setStock(event.target.value)} type="text"></input>
                            <h1>Brand Name</h1>
                            <input placeholder="Enter Brand Name" value={brandName} onChange={(event) => setBrandName(event.target.value)} type="text"></input>
                            <h1>Brand ID</h1>
                            <input placeholder="Enter Brand ID" value={brandID} onChange={(event) => setBrandID(event.target.value)} type="text"></input>
                            <h1>Image</h1>
                            <input placeholder="Upload Image" onChange={(event) => setImage(event.target.files[0])} type="file"></input>
                            <input onClick={add2Inventory} type="submit" />
                            <button onClick={handleClose} >close</button>






                        </form>




                    ) : (

                            <div>
                                <p></p>
                            </div>
                        )
                }


            </div>




            {
                products?.length === 0 ? (
                    <p>Sorry we have no products available</p>

                ) : (
                        products?.map((item, i) => (

                            <div className="home__row">
                                <Product
                                    key={i}
                                    id={item.product_id}
                                    name={item.name}
                                    price={item.price}
                                    brand_id={item.brand_id}
                                    brand_name={item.brand_name}
                                    stock={item.stock}
                                    image={productImage}
                                    button_type={"Remove"}
                                ></Product>
                            </div>





                        ))

                    )


            }


        </div>
    )
}

export default Inventory
