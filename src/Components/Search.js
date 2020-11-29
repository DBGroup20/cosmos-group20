import React from 'react';
import { useStateValue } from "./StateProvider.js";

function Search() {
    const [{ search_query, user, orders }, dispatch] = useStateValue();

    return (
        <div>
            <h1>You searched for {search_query}</h1>

        </div>
    )
}

export default Search
