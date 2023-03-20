import React, { useEffect, useState } from "react";
import Dropzone from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import './SignUp.css';

function SignUp() {
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState(null);
    const [passwordMatch, setPassWordMatch] = useState(true);

    const navigate = useNavigate();
    const SIGNUP_ENDPOINT = 'http://localhost:8000/signup/'
    const AUTHORS_ENDPOINT = 'http://127.0.0.1:8000/server/authors/'

    // handle changes in the input box
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    // handle dragging and dropping
    const handleUpload = async (acceptedFiles) => {
        const file = acceptedFiles[0];
        // console.log(file);
        alert("upload successfully");
        setImage(URL.createObjectURL(file));
      };
    
      
    // handle the submit of the form
    const userNotExist = () => {
        fetch(AUTHORS_ENDPOINT, {
            headers: { "Accept": "application/json" },
            method: "GET"
        }).then(response => response.json()).then(data => {
            console.log(data.items); 
            var result = data.items.find(item => item.username === inputs.username);
            if (result) {
                alert("Username already exists. "); 
                return false; 
            } 
        })
        .catch((error) => {
            alert(error);
        });

        return true; 
    };

    // handle the submit of the form
    const handleSubmit = (event) => {
        event.preventDefault();
        if (inputs.password != inputs.password2) {
            alert("Password does not match. ");
        }
        else if (userNotExist()) {
            console.log("creating user")

            const header = {
                "Content-Type": 'application/json',
                "Accept": 'application/json', 
                "Origin": 'http://localhost:3000', 
            }
          
            console.log(inputs); 
          
            const body = JSON.stringify({
                "username": inputs.username, 
                "password": inputs.password, 
                "displayName": inputs.displayname, 
                "github": inputs.githuburl
            }); 
            console.log(body); 

            fetch(SIGNUP_ENDPOINT, {
                headers: header,
                body: body, 
                method: "POST"
                }).then((response) => {
                console.log(response.status); 
                if(!response.ok) throw new Error(response.status);
                else return response.json();
            })
            .then((data) => {
                console.log(data);
                navigate("/signin");
            })
            .catch((error) => {
                console.log('error: ' + error);
            }); 
        } 
    };
    

    return (
        <div className="signUp">
            <div className="container">
                <h2 className="signUnTitle">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <label>Username: <br /></label>
                    <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
                    
                    <br />
                    <label>Password: <br /></label>
                    <input type="password" name="password" placeholder="Password" onChange={handleChange} required />

                    <br />
                    <label>Confirm Password: <br /></label>
                    <input type="password" name="password2" placeholder="Confirm Password" onChange={handleChange} required />

                    <br />
                    <label>Display Name: <br /></label>
                    <input type="text" name="displayname" placeholder="Display Name" onChange={handleChange} required />
                    
                    <br />
                    <label>GitHub URL: <br /></label>
                    <input type="url" name="githuburl" placeholder="GitHub URL: https://github.com/...." onChange={handleChange} required />
                    
                    <br />
                    <label>
                        Upload Profile Image: <br />
                        <Dropzone onDrop={handleUpload}>
                            {({getRootProps, getInputProps}) => (
                                <div {...getRootProps()} style={{ width: '100%', height: '200px', border: 'dashed 2px #999', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                    <input {...getInputProps()} />
                                    <p>Drag and drop an image here or click to select a file</p>
                                </div>
                            )}
                        </Dropzone>
                    </label>
                    <br />
                    <button type="submit" onClick={handleSubmit}>Sign Up</button>
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