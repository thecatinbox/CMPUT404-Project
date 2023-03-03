import React, { useEffect, useState } from "react";
import './style.css';

function SignUp() {
    const [inputs, setInputs] = useState({});
    const [passwordMatch, setPassWordMatch] = useState(true);

    // handle changes in the input box
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };
    
    // handle the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        // alert(JSON.stringify(inputs)); // check input

        // check if the password and confirmed password equal.
        if (inputs.password === inputs.password2) {
            setPassWordMatch(true);
            // Send form data to server
            fetch('/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputs.username,
                    email: inputs.email,
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
        }
        else {
            setPassWordMatch(false);
        }
    }

    

    return (
        <div className="signUp">
            <div className="container">
                <h2 className="signUnTitle">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username: <br />
                        <input type="text" name="username" placeholder="Username" value={inputs.username || ""} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Email: <br />
                        <input type="email" name="email" placeholder="Email" value={inputs.email || ""} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Password: <br />
                        <input type="password" name="password" placeholder="Password" value={inputs.password || ""} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        Confirm Password: <br />
                        <input type="password" name="password2" placeholder="Confirm Password" value={inputs.password2 || ""} onChange={handleChange} required />
                    </label>
                    {!passwordMatch && (
                        <p style={{ color: 'red' }}>Passwords do not match.</p>
                    )}
                    <br />
                    <button type="submit">Sign Up</button>
                    <br />
                    <div className="haveAccount">
                        <p> Already have an account? <a href="./signin"> Sign in here </a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;