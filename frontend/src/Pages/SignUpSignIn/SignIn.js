import React, { useState } from "react";
import './style.css';

function SignIn() {
    const [inputs, setInputs] = useState({});

    // handle changes in the input box
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };
    
    // handle the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(JSON.stringify(inputs)); // check input

        // Send form data to server
        fetch('/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: inputs.username,
                password: inputs.password,
            }),
        })
        .then((response) => {
            // Handle server response
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