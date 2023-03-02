import React from "react";
import './style.css';

function SignUp() {
    return (
        <div className="signUn">
            <h2 className="signUnTitle">Sign In</h2>
            <div className="container">
                <form action="./index" method="POST">
                    <input type="text" name="username" placeholder="Username"></input>
                    <input type="email" name="email" placeholder="Email"></input>
                    <input type="password" name="password" placeholder="Password"></input>
                    <input type="password" name="password2" placeholder="Confirm Password"></input>
                    <button type="submit">Sign Up</button>
                    <div class="haveAccount">
                        <p> Already have an account? <a href="./signin"> Sign in here </a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;