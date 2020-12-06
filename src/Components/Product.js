import React, { useState, useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider.js";

function Product({ id, name, image, price, stock, brand_id, brand_name, button_type }) {
  const [{ basket }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(1);

  const add2basket = () => {
    setQuantity(quantity + 1);
    //    '/api/add2cart/cid=<int:cart_id>&cuid=<int:customer_id>&pid=<int:product_id>&did=<int:details_id>&quantity=&cart_status=False'

    dispatch(
      {
        type: 'ADD_TO_BASKET',
        item: {
          id: id,
          name: name,
          image: image,
          price: price,
          quantity: quantity,
          stock: stock,
          brand_id: brand_id,
          brand_name: brand_name,
        }
      }
    )


  }

  const removeFromInventory = () => {
    // @app.route('/api/products/delete/name=<string:name>&brand=<string:brand>')

    const removeAPI = "/api/products/delete/pname=" + name + "&pid=" + id;
    fetch(removeAPI)
      .then((response) => response.json())
      .then(
        (data) => {

          dispatch(
            {
              type: 'REMOVE_FROM_BASKET',
              id: id,
            }
          )


          console.log(data);



        })
  }





  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">{name}</p>
        <p className="product__brand">{brand_name}</p>
        <p className="product__price">
          <small>Rs</small>
          <strong>{price}</strong>
        </p>
        <p className="product__id">Product id :{id}</p>


      </div>

      <img className="product__image" src={image}></img>
      <div className="product__rating">
        <p>Stock : {stock}</p>

      </div>
      {
        button_type === "Remove" ? (
          <button onClick={removeFromInventory} className="product__button">{button_type}</button>

        )
          : button_type === "Add to basket" ?
            (<button onClick={add2basket} className="product__button">{button_type}</button>)
            : button_type === "Add to Inventory Search" ?
              (<button disabled={true} className="product__button">Product is in inventory</button>) :
              (<button onClick={add2basket} className="product__button">{button_type}</button>)



      }




    </div>
  );
}

export default Product;
