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
  const [displayProducts, setDisplayProducts] = useState([]);
  useEffect(() => {
    const productsAPI = "/api/products";
    fetch(productsAPI)
      .then((response) => response.json())
      .then(
        (data) => {
          setDisplayProducts(data.slice(0, 50));
          console.log("display products", data.slice(0, 50));
          dispatch(
            {
              type: 'ADD_PRODUCTS',
              products: data
            }
          )

          console.log("fetched_data", data.length);



        })


  }, []);




  return (
    <div className="home">
      <img src={banner} className="home__banner"></img>
      <p>Please do not refresh the page or manually change urls. You must navigate to another tab (tabs include : Check my orders, Balance etc) or logout and login again to see changes for some use cases like update price, update order status ,update stock</p>


      {
        displayProducts?.length == 0 ? (
          <p>Sorry we have no products available</p>

        ) : (
            displayProducts?.map((item, i) => (
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
                  button_type={"Add to basket"}
                ></Product>
              </div>





            ))

          )


      }

    </div>
  );
}

export default Home;
