import React, { useState, useEffect } from "react";
import { Link, useHistory } from 'react-router-dom';
import cosmos_logo from "../Images/cosmos_logo.png";

import { useStateValue } from "./StateProvider.js";
const backendAddr = "https://cosmos-app-group20.herokuapp.com";

function Signup() {
    const history = useHistory();
    const [{ user }, dispatch] = useStateValue();
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");
    const [role, setRole] = useState("role");
    const [address, setAddress] = useState("address");
    const [password, setPassword] = useState("");
    const [user_type, setUserType] = useState("");
    const [status, setStatus] = useState("");





    const register = (event) => {
        /* const requestOptions = {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ title: 'React POST Request Example' })
         };
         fetch('https://jsonplaceholder.typicode.com/posts', requestOptions)
             .then(response => response.json())
             .then(data => this.setState({ postId: data.id }));
     }*/
        event.preventDefault(); //prevents refresh after submitting form
        var roleAd = "";
        var addressAd = "";
        if (role.length === 0) {
            roleAd = "role";

        }
        else {
            roleAd = role;
        }
        if (address.length === 0) {
            addressAd = "address";

        }
        else {
            addressAd = address;
        }
        const signupAPI = "/api/signup/username=" + username + "&name=" + name + "&pwd=" + password + "&user_type=" + user_type + "&role=" + roleAd + "&contact=" + contact + "&address=" + addressAd + "&email=" + email + "&balance=" + "5000";
        console.log(signupAPI);

        fetch(signupAPI)
            .then((response) => response)
            .then((data) => {
                setStatus(data);
                console.log("you have signed up bro");
                if (user_type === "customer") {
                    history.push('/');
                }
                if (user_type === "admin") {
                    history.push("/admin-home");
                }

                dispatch(
                    {
                        type: 'SET_USER',
                        user: {
                            'username': username,
                            'name': name,
                            'user_type': user_type,
                            'password': password,
                            'email': email,
                            'role': role,
                            'address': address,
                            'contact': contact,
                            'balance': 5000
                        }
                    }
                )

            });




    };
    return (
        <div className="signup">
            <div className="signup__container">
                <Link to="/">
                    <img className="signup__logo"
                        src={cosmos_logo}
                        alt="" />
                </Link>
                <h2>Welcome to the signup Page</h2>
                <form >
                    <div className="signup__user_type">
                        <input type="checkbox" id="admin" name="admin" value="admin" onChange={(event) => setUserType(event.target.value)} />
                        <label htmlFor="admin">admin</label>
                        <input type="checkbox" id="customer" name="customer" value="customer" onChange={(event) => setUserType(event.target.value)} />
                        <label htmlFor="customer">customer</label>
                    </div>
                    <h5>Email</h5>
                    <input
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                        type="text"
                    ></input>
                    <h5>Name</h5>
                    <input
                        value={name}
                        onChange={(event) => setName(event.target.value)}
                        type="text"
                    ></input>
                    <h5>Username</h5>
                    <input
                        value={username}
                        onChange={(event) => setUsername(event.target.value)}
                        type="text"
                    ></input>

                    <h5>Password</h5>
                    <input
                        type="password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}

                    ></input>
                    <h5>Role (blank if customer)</h5>
                    <input
                        value={role}
                        onChange={(event) => setRole(event.target.value)}
                        type="text"
                    ></input>
                    <h5>Address(blank if admin)</h5>
                    <input
                        value={address}
                        onChange={(event) => setAddress(event.target.value)}
                        type="text"
                    ></input>
                    <h5>Contact</h5>
                    <input
                        value={contact}
                        onChange={(event) => setContact(event.target.value)}
                        type="text"
                    ></input>

                    <button onClick={register} type="submit">
                        Register
                        </button>

                </form>

            </div>
        </div >
    );
}

export default Signup;
