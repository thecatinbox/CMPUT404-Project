import React, { useEffect, useState } from "react";
import Dropzone from 'react-dropzone';
// import './SignUp.css';

function SignUp() {
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState(null);
    const [passwordMatch, setPassWordMatch] = useState(true);

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
    const handleSubmit = (event) => {
        event.preventDefault();
        alert(JSON.stringify(inputs)); // check input

        // check if the password and confirmed password equal.
        if (inputs.password === inputs.password2) {
            setPassWordMatch(true);
            // Send form data to server
            fetch('/api/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: inputs.username,
                    password: inputs.password,
                    displayname: inputs.displayName,
                    githuburl: inputs.githubURL,
                    img: image
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
                    <label>
                        Display Name: <br />
                        <input type="text" name="displayname" placeholder="Display Name" value={inputs.displayName || ""} onChange={handleChange} required />
                    </label>
                    <br />
                    <label>
                        GitHub URL: <br />
                        <input type="url" name="githuburl" placeholder="GitHub URL: https://github.com/...." value={inputs.githubURL || ""} onChange={handleChange} required />
                    </label>
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