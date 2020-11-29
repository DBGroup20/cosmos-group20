import React, { useState } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import cosmos_logo from "../Images/cosmos_logo.png";
import SearchIcon from "@material-ui/icons/Search";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import searchButton from "../Images/searchButton.png";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { getBasketTotal, getBasketItemsTotal } from './reducer.js';
import { useStateValue } from "./StateProvider.js";


const amazon_logo = "http://pngimg.com/uploads/amazon/amazon_PNG11.png";


function Header() {
  const [{ basket, user }] = useStateValue();
  const [{ search_query }, dispatch] = useStateValue();
  const history = useHistory();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchQueryPrice, setSearchQueryPrice] = useState(-1.0);
  const [searchQueryType, setSearchQueryType] = useState("name");

  const [Click, setClick] = useState(false);

  const setQueryType = (queryType) => {
    setSearchQueryType(queryType);
    console.log("qt", queryType);

  }
  const setSearchClick = () => {
    setClick(true);

    console.log("sq", searchQuery);
    dispatch(
      {
        type: 'SET_SEARCH_QUERY',
        search_query: {
          "query": searchQuery,
          "price": searchQueryPrice,
          "type": searchQueryType
        }
      }
    )
    history.push('/search');

  }
  const search = (e) => {
    setSearchQuery(e.target.value);





  }

  return (
    <nav className="header">
      <Link to="/">
        <img
          className="header__logo"
          src={cosmos_logo}
        ></img>
      </Link>
      <div className="header__search">
        <input onChange={search} type="text" className="header__searchinput"></input>
        <DropdownButton id="dropdown-item-button" title="Filter">
          <Dropdown.Item onClick={() => setQueryType("name")} as="button">by name</Dropdown.Item>
          <Dropdown.Item onClick={() => setQueryType("brand")} as="button">by brand</Dropdown.Item>
          <DropdownButton id="dropdown-item-button_price" title="by price" onClick={() => setQueryType("price")}>

            <Dropdown.Item onClick={() => setSearchQueryPrice(100.0)} as="button">100</Dropdown.Item>
            <Dropdown.Item onClick={() => setSearchQueryPrice(500.0)} as="button">500</Dropdown.Item>
            <Dropdown.Item onClick={() => setSearchQueryPrice(1000.0)} as="button">1000</Dropdown.Item>
            <Dropdown.Item onClick={() => setSearchQueryPrice(2000.0)} as="button">2000</Dropdown.Item>
            <Dropdown.Item onClick={() => setSearchQueryPrice(3000.0)} as="button">3000</Dropdown.Item>


          </DropdownButton>
        </DropdownButton>
        <input type="image" src={searchButton} onClick={setSearchClick} className="header__searchicon"></input>

      </div>
      <div className="header__nav">
        {
          user?.username ? (
            <Link to="/signout" className="header__link">
              <div className="header__option">
                <span className="header__option__line1">Hello {user?.username}</span>
                <span className="header__option__line2"> Sign Out</span>

              </div>
            </Link>) : (
              <Link to="/login" className="header__link">
                <div className="header__option">
                  <span className="header__option__line1">Hello Guest</span>
                  <span className="header__option__line2"> Sign In</span>
                </div>
              </Link>
            )
        }
        <Link to="/order-status" className="header__link">
          <div className="header__option">
            <span className="header__option__line1">Check</span>
            <span className="header__option__line2"> Orders</span>
          </div>
        </Link>
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__option__line1">Your</span>
            <span className="header__option__line2">Prime</span>
          </div>
        </Link>
        <Link className="header__link" to="/checkout">
          <div className="header__option__basket">
            <ShoppingBasketIcon></ShoppingBasketIcon>
            <span className="header__option__line2 header__option__basketcount">
              {

                getBasketItemsTotal(basket)
              }
            </span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
