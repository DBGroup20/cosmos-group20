import React, { useState, useEffect } from 'react';
import { useStateValue } from "./StateProvider.js";
import "./Search.css";
import productImage from "../Images/product.png";
import Product from "./Product";



function Search() {
    const [{ search_query, user, orders }, dispatch] = useStateValue();
    const [filteredProducts, setProduct] = useState([]);

    useEffect(() => {
        var productsAPI = "/api/searchbyname/name=";
        if (search_query["type"] == "name") {
            productsAPI = "/api/searchbyname/name=" + search_query["query"];

        }
        else if (search_query["type"] == "price") {
            productsAPI = "/api/ascendingprices/name=" + search_query["query"] + "&price=" + search_query["price"];


        }
        else {
            productsAPI = "/api/searchbybrand/name=" + search_query["query"];
        }
        console.log("productsAPI", productsAPI);

        fetch(productsAPI)
            .then((response) => response.json())
            .then(
                (data) => {


                    console.log("filtered products", data);
                    setProduct(data);



                })


    }, [search_query]);

    return (
        <div>
            <h1>You searched for {search_query["query"]} with a filter by {search_query["type"]} and price {search_query["price"]}</h1>
            <div className="home">
                <div className="home__row">

                    {
                        filteredProducts?.length == 0 ? (
                            <p>Sorry we have no products available with {search_query["query"]} keyword</p>

                        ) : (
                                filteredProducts?.map((item, i) => (


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

        </div>
    )
}

export default Search
