import React from "react";
import './style.css';

function SignUp() {
    return (
        <div className="signUp">
            <div className="container">
                <h2 className="signUnTitle">Sign Up</h2>
                <form action="./index" method="POST">
                    <label>
                        Username: <br />
                        <input type="text" name="username" placeholder="Username"></input>
                    </label>
                    <br />
                    <label>
                        Email: <br />
                        <input type="email" name="email" placeholder="Email"></input>
                    </label>
                    <br />
                    <label>
                        Password: <br />
                        <input type="password" name="password" placeholder="Password"></input>
                    </label>
                    <br />
                    <label>
                        Confirm Password: <br />
                        <input type="password" name="password2" placeholder="Confirm Password"></input>
                    </label>
                    <br />
                    <button type="submit">Sign Up</button>
                    <br />
                    <div class="haveAccount">
                        <p> Already have an account? <a href="./signin"> Sign in here </a></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;