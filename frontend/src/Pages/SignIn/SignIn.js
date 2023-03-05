import React, { useState } from "react";
import './SignIn.css';
import { useNavigate } from "react-router-dom";

function SignIn() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const ENDPOINT = 'http://127.0.0.1:8000/server/authors/'

    const checkAuth = (userData) => {
        if (inputs.username == userData.username && inputs.password == userData.password) {
            navigate("/home");
        } else {
            alert("Incorrect username/password, please try again");
        }
    }; 

    // handle changes in the input box
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };
    
    // handle the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(JSON.stringify(inputs)); // check input

        fetch(ENDPOINT, {
            headers: { "Accept": "application/json" },
            method: "GET"
        }).then(response => response.json()).then(data => {
            console.log(data.items); 
            var result = data.items.find(item => item.username === inputs.username);
            if (result) {
                console.log(result.username); 
                console.log(result.password); 
                checkAuth(result); 
            }
        })
        .catch((error) => {
            alert(error);
            // console.error('Error:', error);
        });
    };

    return (
        <div className="signIn">
            <h1>Welcome!</h1>
            <div className="container">
                <h2 className="signInTitle">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" placeholder="Username" value={inputs.username || ""} onChange={handleChange} required/>
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Password" value={inputs.password || ""} onChange={handleChange} required/>
                    </label>
                    <div className="alert">
                        <p>* couldn't be empty.</p>
                    </div>
                    <br />
                    <button type="submit">Sign In</button>
                    <br />
                    <div className="noAccount">
                        <p> No Account? <a href="./signup"> Create an account </a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<SignIn/>);
export default SignIn;