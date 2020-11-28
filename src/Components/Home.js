import React from "react";
import "./Home.css";
import banner from "../Images/banner.jpg";
import lipStick from "../Images/lipStick.jpg"
import makeUp from "../Images/makeUp.jpg";
import Product from "./Product";

function Home() {



  return (
    <div className="home">
      <img src={banner} className="home__banner"></img>
      <div className="home__row">
        <Product
          id="1"
          name="Perfume"
          price={2100.5}
          stock={4}
          image="https://images-na.ssl-images-amazon.com/images/I/41wI53OEpCL._SX332_BO1,204,203,200_.jpg"
        ></Product>
        <Product
          id="2"
          name="Lipstick"
          price={1000.1}
          stock={4}
          image={lipStick}
        ></Product>
        <Product
          id="3"
          name="Makeup"
          price={1500.2}
          stock={4}
          image={makeUp}
        ></Product>
      </div>
      <div className="home__row">
        <Product
          id="4"
          name="Facewash"
          price={700.50}
          stock={4}
          image="https://images-na.ssl-images-amazon.com/images/I/41wI53OEpCL._SX332_BO1,204,203,200_.jpg"
        ></Product>
        <Product
          id="5"
          name="Foundation"
          price={2000.20}
          stock={4}
          image="https://images-na.ssl-images-amazon.com/images/I/41wI53OEpCL._SX332_BO1,204,203,200_.jpg"
        ></Product>
      </div>
      <div className="home__row">
        <Product
          id="6"
          name="Nail Polish"
          price={500.25}
          stock={4}
          image="https://images-na.ssl-images-amazon.com/images/I/41wI53OEpCL._SX332_BO1,204,203,200_.jpg"
        ></Product>
      </div>
    </div>
  );
}

export default Home;
