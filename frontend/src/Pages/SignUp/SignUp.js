import React, { useEffect, useCallback, useState } from "react";
import { useDropzone } from 'react-dropzone';
import { useNavigate } from "react-router-dom";
import './SignUp.css';

import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'

function SignUp() {
    const [inputs, setInputs] = useState({});
    const [image, setImage] = useState(null);
    const [passwordMatch, setPassWordMatch] = useState(true);
    const app_url = localStorage.getItem('url'); 

    const theme = createTheme();

    const navigate = useNavigate();
    const SIGNUP_ENDPOINT = 'http://' + app_url + '/signup/'; 
    const AUTHORS_ENDPOINT = 'http://' + app_url + '/server/authors/'; 

    // handle changes in the input box
    const handleChange = (event) => {
        const { name, value } = event.target;
        setInputs((prevInputs) => ({ ...prevInputs, [name]: value }));
    };

    // handle dragging and dropping
    const { getRootProps, getInputProps, acceptedFiles, isDragActive } = useDropzone({ onDrop: handleUpload });
    async function handleUpload (acceptedFiles) {
        const file = acceptedFiles.map((file) => (
          <li key={file.path}>
            {file.path} - {file.size} bytes
          </li>
        ));
        // console.log(file);
        alert("upload successfully");
        setImage(URL.createObjectURL(file[0]));
    }
      
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
        <ThemeProvider theme={ theme }>
            <Container component="main" maxWidth="xs">
                <CssBaseline />

                <Box sx={{
                        mt: 8, 
                        mb: 8, 
                        display: 'flex', 
                        flexDirection: 'column', 
                        alignItems: 'center',}} >

                    <Avatar sx={{ m: 1, 
                                bgcolor: 'primary.main' }}>
                        <FontAwesomeIcon icon={faUser} />
                    </Avatar>

                    <Typography 
                        component="h1" 
                        variant="h5" 
                        align="center">
                            Sign up
                    </Typography>

                    <Box 
                        component="form" 
                        noValidate 
                        onSubmit={handleSubmit} 
                        sx={{ mt: 2 }}>

                        <TextField 
                            required 
                            autoFocus 
                            fullWidth 
                            name="username" 
                            id="user" 
                            label="Username" 
                            autoComplete="username" 
                            onChange={handleChange} 
                            sx={{ mt: 2 }}/>
                        
                        <TextField 
                            required 
                            autoFocus 
                            fullWidth 
                            name="displayname" 
                            id="display" 
                            label="Display Name" 
                            autoComplete="displayname" 
                            onChange={handleChange} 
                            sx={{ mt: 2 }}/>

                        <TextField 
                            required 
                            fullWidth 
                            id="email" 
                            label="Email Address" 
                            name="email" 
                            autoComplete="email" 
                            onChange={handleChange} 
                            sx={{ mt: 2 }} />

                        <TextField 
                            required 
                            fullWidth 
                            name="password" 
                            id="password" 
                            label="Password" 
                            type="password"
                            onChange={handleChange} 
                            sx={{ mt: 2 }} />

                        <TextField 
                            required 
                            fullWidth 
                            name="password2" 
                            id="password2" 
                            label="Confirm Password" 
                            type="password"
                            onChange={handleChange} 
                            sx={{ mt: 2 }} />

                        <TextField 
                            required 
                            fullWidth 
                            name="githuburl" 
                            id="github" 
                            label="GitHub URL" 
                            onChange={handleChange} 
                            sx={{ mt: 2 }} />

                        <Box sx={{ mt: 2 }}>

                            <Typography 
                                variant="h7" 
                                margin="normal">
                                    Upload Profile Image:
                            </Typography>

                            {(  
                                <div 
                                    {...getRootProps()} 
                                    style={{ width: '100%', 
                                            height: '180px', 
                                            border: 'dashed 2px #999', 
                                            display: 'flex', 
                                            justifyContent: 'center', 
                                            alignItems: 'center' }}>

                                    <input {...getInputProps()} />

                                    {isDragActive ? ( 

                                        <p>Drop the image here ...</p>

                                        ) : (

                                        <div align="center">

                                            {acceptedFiles.length > 0 ? (

                                            <div>
                                                <h4>Uploaded Files:</h4>
                                                <ul>
                                                {acceptedFiles.map((file) => (
                                                    <li key={file.path}>
                                                    {file.path} - {file.size} bytes
                                                    </li>
                                                ))}
                                                </ul>
                                            </div>

                                            ) : (
                                            <>
                                                <div style={{ display: image ? 
                                                                    'none' :
                                                                    'block' }}>
                                                                        Drag &amp; drop an image here
                                                </div>
                                                <div style={{ display: image ? 
                                                                    'none' :
                                                                    'block' }}>
                                                                        OR
                                                </div>
                                                <div style={{ display: image ? 
                                                                    'none' :
                                                                    'block' }}>
                                                                        Click to select an image
                                                </div>
                                            </>
                                            )}
                                            {image && <img src={image} alt="preview" />}
                                        </div>
                                    )}
                                </div>
                            )}
                        </Box>

                        <Button 
                            type="submit" 
                            fullWidth 
                            variant="contained" 
                            sx={{ mt: 3, mb: 2 }}>
                                Sign Up
                        </Button>

                        <Grid 
                            container 
                            justifyContent="flex-end">

                            <Grid item>
                                <Link 
                                    href="./signin" 
                                    variant="body1">
                                        Already have an account? Sign in
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    );

}

export default SignUp;