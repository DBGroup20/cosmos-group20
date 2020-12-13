import React, { useState, useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider.js";

function Product({ id, name, image, price, stock, brand_id, brand_name, button_type }) {
  const [{ basket }, dispatch] = useStateValue();
  const [quantity, setQuantity] = useState(1);
  const [newPrice, setnewPrice] = useState(price);
  const [newStock, setnewStock] = useState(stock);
  const [editPriceClicked, setEditPriceClicked] = useState(false);
  const [editStockClicked, setEditStockClicked] = useState(false);
  const handlePriceClose = () => { setEditPriceClicked(false); };
  const handlePriceShow = () => { setEditPriceClicked(true); };
  const handleStockClose = () => { setEditStockClicked(false); };
  const handleStockShow = () => { setEditStockClicked(true); };
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
  const editPrice = (event) => {
    price = newPrice;
    //    @app.route('/api/products/update/name=<string:name>&brand=<string:brand>&new_price=<float:new_price>')
    event.preventDefault();
    const editPriceAPI = "/api/products/update/name=" + name + "&brand=" + brand_name + "&new_price=" + newPrice;
    console.log(editPriceAPI);
    fetch(editPriceAPI)
      .then((response) => response.json())
      .then(
        (data) => {
          console.log(data);


        }
      );
  }

  const editStock = (event) => {
    //@app.route('/api/stock/update/name=<string:name>&brand=<string:brand>&new_stock=<int:new_stock>')
    event.preventDefault();
    stock = newStock;
    const editStockAPI = "/api/stock/update/name=" + name + "&brand=" + brand_name + "&new_stock=" + newStock;
    console.log(editStockAPI);
    fetch(editStockAPI)
      .then((response) => response.json())
      .then(
        (data) => {
          console.log(data);


        }
      );
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
          <div>
            <button onClick={removeFromInventory} className="product__button">{button_type}</button>
            <button onClick={handlePriceShow} className="product__button">Update Price</button>
            <button onClick={handleStockShow} className="product__button">Update Stock</button>

            {editPriceClicked === true ? (
              <form >

                <h1>Product Price</h1>
                <input placeholder="Enter Product Price" value={newPrice} onChange={(event) => setnewPrice(event.target.value)} type="text"></input>
                <input onClick={(event) => { editPrice(event) }} type="submit" />
                <button onClick={handlePriceClose} >close</button>

              </form>
            ) :
              (
                <div> </div>
              )
            }
            {editStockClicked === true ? (
              <form >

                <h1>Product Stock</h1>
                <input placeholder="Enter Product Stock" value={newStock} onChange={(event) => setnewStock(event.target.value)} type="text"></input>
                <input onClick={(event) => { editStock(event) }} type="submit" />
                <button onClick={handleStockClose} >close</button>

              </form>
            ) :
              (
                <div> </div>
              )
            }

          </div>
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
