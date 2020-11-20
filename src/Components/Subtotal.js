import React from 'react';
import CurrencyFormat from "react-currency-format";
import { useStateValue } from "./StateProvider.js";
import { getBasketTotal } from './reducer.js';


function Subtotal() {
    const [{ basket }, dispatch] = useStateValue();
    return (
        <div className="subtotal">
            <CurrencyFormat

                renderText={(value) => (

                    <>
                        <p>
                            Subtotal ({basket.length} items): <strong>{`${value}`}</strong>
                        </p>


                    </>
                )}
                decimalScale={2}
                value={getBasketTotal(basket)}
                displayType={"text"}
                thousandSeparator={true}
                prefix={"Rs"}
            />
            <button>Proceed to checkout</button>

        </div>
    )
}

export default Subtotal
