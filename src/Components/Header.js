import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import cosmos_logo from "../Images/cosmos_logo.png";
import SearchIcon from "@material-ui/icons/Search";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { getBasketTotal, getBasketItemsTotal } from './reducer.js';

import { useStateValue } from "./StateProvider.js";
const amazon_logo = "http://pngimg.com/uploads/amazon/amazon_PNG11.png";
function Header() {
  const [{ basket, user }] = useStateValue();

  return (
    <nav className="header">
      <Link to="/">
        <img
          className="header__logo"
          src={cosmos_logo}
        ></img>
      </Link>
      <div className="header__search">
        <input type="text" className="header__searchinput"></input>
        <SearchIcon className="header__searchicon"></SearchIcon>
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
        <Link to="/" className="header__link">
          <div className="header__option">
            <span className="header__option__line1">Returns</span>
            <span className="header__option__line2"> & Orders</span>
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
