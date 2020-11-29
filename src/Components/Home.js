import React, { useEffect, useState } from "react";
import "./Home.css";
import banner from "../Images/banner.jpg";
import lipStick from "../Images/lipStick.jpg"
import productImage from "../Images/product.png";

import makeUp from "../Images/makeUp.jpg";
import Product from "./Product";
import { useStateValue } from "./StateProvider.js";


function Home() {
  const [{ basket, products, user }, dispatch] = useStateValue();
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
      <img src={banner} className="home__banner"></img>
      <div className="home__row">

        {
          products?.length == 0 ? (
            <p>Sorry we have no products available</p>

          ) : (
              products?.map((item, i) => (


                <Product
                  key={i}
                  id={item.product_id}
                  name={item.name}
                  price={item.price}
                  brand_id={item.brand_id}
                  brand_name={item.brand_name}
                  stock={item.stock}
                  image={productImage}
                ></Product>





              ))

            )


        }
      </div>
    </div>
  );
}

export default Home;
