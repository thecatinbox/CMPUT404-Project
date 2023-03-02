import React from "react";
import { useState } from "react";
// import ReactDOM from "react-dom/client";
import './style.css';

function SignIn() {
    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const username = event.target.username;
        const password = event.target.password;
        setInputs(values => ({...values, [username]: password}))
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(inputs);
    }
    

    return (
        <div className="signIn">
            <h1>Welcome!</h1>
            <div className="container">
                <h2 className="signInTitle">Sign In</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" name="username" placeholder="Username" value={inputs.username || ""} onChange={handleChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" name="password" placeholder="Password" value={inputs.password || ""} onChange={handleChange} />
                    </label>
                    <br />
                    <button type="submit">Sign In</button>
                    <br />
                    <div class="noAccount">
                        <p> No Account? <a href="./signup"> Create a account </a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<SignIn/>);
export default SignIn;