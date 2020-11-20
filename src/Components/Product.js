import React, { useState, useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider.js";

function Product({ id, name, image, price, stock, brand_id }) {
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
          brand_id: brand_id
        }
      }
    )


  }

  return (
    <div className="product">
      <div className="product__info">
        <p className="product__title">{name}</p>
        <p className="product__brand">Brand : {brand_id}</p>
        <p className="product__price">
          <small>Rs</small>
          <strong>{price}</strong>
        </p>

      </div>

      <img className="product__image" src={image}></img>
      <div className="product__rating">
        <p>Stock : {stock}</p>

      </div>
      <button onClick={add2basket} className="product__button">Add to Basket</button>
    </div>
  );
}

export default Product;
