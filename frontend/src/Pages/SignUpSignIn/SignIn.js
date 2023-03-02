import React from "react";
import './style.css';

function SignIn() {
    return (
        <div className="signIn">
            <h2 className="signInTitle">Sign In</h2>
            <div className="container">
                <form action="./index" method="POST">
                    <input type="text" name="username" placeholder="Username"></input>
                    <input type="password" name="password" placeholder="Password"></input>
                    <button type="submit">Sign In</button>
                    <div class="noAccount">
                        <p> No Account? <a href="./signup"> Create a account </a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignIn;