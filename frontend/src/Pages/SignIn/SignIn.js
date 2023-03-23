import React, { useState } from "react";
import './SignIn.css';
import { useNavigate } from "react-router-dom";

import { createTheme, ThemeProvider } from '@mui/material/styles'
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import Image from './UA_Logo_Green_RGB.png';
import Avatar from '@mui/material/Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRightToBracket } from '@fortawesome/free-solid-svg-icons'


function SignIn() {
    const [inputs, setInputs] = useState({});
    const navigate = useNavigate();
    const app_url = localStorage.getItem('url'); 

    const ENDPOINT = 'http://' + app_url + '/server/authors/'; 
    
    const theme = createTheme();

    const checkAuth = (userData) => {
        if (inputs.username === userData.username && inputs.password === userData.password) {
            localStorage.setItem('uuid', userData.uuid); 
            navigate("/home");
        } else {
            alert("Incorrect password, please try again. ");
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
                // console.log(result.username); 
                // console.log(result.password); 
                checkAuth(result); 
            } else {
                alert("User does not exist. ");
            }
        })
        .catch((error) => {
            alert(error);
            // console.error('Error:', error);
        });
    };

    return (
        <ThemeProvider theme={ theme }>
            <Grid 
                container 
                component="main" 
                sx={{ height: "100vh", position: "center"}}>

                <CssBaseline />

                <Grid 
                    item 
                    alignContent="center" 
                    xs={false} 
                    md={7}>

                    <Box sx={{ display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', mt:2}}>

                        <Typography 
                            variant="h3" 
                            fontFamily="Monospace" 
                            color="#007c41">
                                Winter 2023
                        </Typography>

                        <Typography 
                            variant="h3" 
                            fontFamily="Monospace" 
                            color="#007c41">
                                CMPUT404 Group12
                        </Typography>

                        <Box 
                            component="img" 
                            sx={{height: "auto", 
                                width: "90%", 
                                position: "center", 
                                mt: 5, 
                                mb:2}}   
                            alt="UA LOGO" 
                            src={Image} />
                        </Box>
                </Grid>

                <Grid 
                    item 
                    alignContent="center" 
                    xs={12} 
                    md={5} 
                    margin="normal" 
                    component={Paper} 
                    elevation={6}>

                    <Box sx={{ display: 'flex', 
                                flexDirection: 'column', 
                                alignItems: 'center', 
                                mt: 8, 
                                mb: 15, 
                                mx: 5, 
                                my: 5}}>

                        <Avatar sx={{ m: 1, 
                                    bgcolor: 'secondary.main' }}>
                            <FontAwesomeIcon icon={faArrowRightToBracket} />
                        </Avatar>

                        <Typography 
                            component="h1"
                            variant="h5">
                                Sign in
                        </Typography>

                        <Box 
                            component="form" 
                            onSubmit={handleSubmit} 
                            margin="normal">

                            <TextField 
                                required 
                                autoFocus 
                                fullWidth 
                                name="username" 
                                id="user" 
                                label="Username" 
                                autoComplete="username" 
                                margin="normal" />

                            <TextField 
                                required 
                                fullWidth 
                                name="password" 
                                id="password" 
                                label="Password" 
                                autoComplete="current-password" 
                                margin="normal" />

                            <Button 
                                type="submit" 
                                fullWidth 
                                variant="contained" 
                                sx={{ mt: 3, mb: 2 }}>
                                    Sign In
                            </Button>

                            <Grid 
                                container 
                                justifyContent="flex-end">
                                
                                <Grid item>
                                    <Link 
                                        href="./signup" 
                                        variant="body1" 
                                        margin="normal" >
                                            Do not have an Account? Sign up
                                    </Link>
                                </Grid>
                            </Grid>
                        </Box>
                    </Box>

                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(<SignIn/>);
export default SignIn;