import React, { useState } from "react";
import './Style.css';
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';


function Login() {
    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsEmailValid(true); // Resetarea validării când utilizatorul începe să introducă din nou
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsPasswordValid(true); // Resetarea validării când utilizatorul începe să introducă din nou
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Validare completă a formularului
        const isFormValid = validateForm();
        if (!isFormValid) {
            return; // Nu continuăm dacă formularul nu este valid
        }
        // Restul logicii pentru trimiterea formularului
    };

    const validateForm = () => {
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        setIsEmailValid(isEmailValid);
        setIsPasswordValid(isPasswordValid);
        return isEmailValid && isPasswordValid;
    };

    const validateEmail = (email) => {
        const re = /^([a-zA-Z0-9._%+-]+@(unitbv\.ro|student\.unitbv\.ro|gmail\.com))$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        // Aici poți adăuga condițiile de validare pentru parolă
        // De exemplu, o lungime minimă sau o combinație de caractere
        return password.length >= 8; // Validează parola dacă are cel puțin 8 caractere
    };

    const HoverButton = styled(Button)({
        '&:hover': {
          backgroundColor: '#757ce8', // Schimbă culoarea de fundal la hover
          color: '#fff', // Schimbă culoarea textului la hover
        },
      });
    return(
        <Box sx={{display: 'flex', flexDirection: 'row', width:'100%', height:'100%'}}>
            <Box className="info" sx={{
                    width: '60%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    marginLeft: '50px',
                    [theme.breakpoints.down('md')]: {
                        width: '100%',
                        marginLeft: '0px'
                    },
                    [theme.breakpoints.down('lg')]: {
                        width: '100%',
                        marginLeft: '0px'
                    }
                }}>

                <Typography variant="h2" color="initial" sx={{
                    fontSize: '3em',
                    [theme.breakpoints.down('sm')]:{
                        fontSize: '1.8em',
                        marginLeft: '10%',
                        marginRight: '10%'
                    },
                    [theme.breakpoints.down('md')]: {
                        fontSize: '2em',
                        marginLeft: '10%',
                        marginRight: '10%'
                    },
                    [theme.breakpoints.down('lg')]: {
                        fontSize: '2em',
                        marginLeft: '10%',
                        marginRight: '10%'
                    }
                }}>
                    Autentificare platforma prezente sport
                </Typography>
                <Typography variant="h2" color="primary" sx={{
                    fontSize: '1.7em',
                    [theme.breakpoints.down('md')]: {
                        fontSize: '1.2em',
                        marginLeft: '10%',
                        marginRight: '10%'
                    },
                    [theme.breakpoints.down('lg')]: {
                        fontSize: '1.2em',
                        marginLeft: '10%',
                        marginRight: '10%'
                    }
                }}>
                    Gestionati-va prezentele la sport mult mai eficient si rapid
                </Typography>


                <Box sx={{ display: 'flex', flexDirection: 'column',justifyContent: 'center', marginLeft: '1em', marginTop: '1em', width: '30%', gap: '1em',
                    [theme.breakpoints.down('md')]: {
                        width: '80%',
                        marginLeft: '10%',
                        marginRight: '10%',
                    },
                    [theme.breakpoints.down('lg')]: {
                        width: '80%',
                        marginLeft: '10%',
                        marginRight: '10%',
                    }
                    }}>
                    <TextField
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        value={email}
                        onChange={handleEmailChange}
                        required
                        error={!isEmailValid}
                        sx={{
                            [theme.breakpoints.down('md')]: {
                                width: '70%'
                            },
                            [theme.breakpoints.between('900', '1200')]: {
                                width: '50%'
                            }
                        }}
                    />

                    <TextField
                        id="outlined-basic"
                        label="Parola"
                        variant="outlined"
                        type="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        error={!isPasswordValid}
                        sx={{
                            [theme.breakpoints.down('md')]: {
                                width: '70%'
                            },
                            [theme.breakpoints.between('900', '1200')]: {
                                width: '50%'
                            }
                        }}
                    />
                    <Box sx={{ width: '100%' }}>
                        <Button variant="contained" onClick={handleSubmit} color="primary">Autentificare</Button>
                    </Box>
                    <Typography variant="h6" color="initial">
                        Nu ai un cont?
                    </Typography>
                    <Link to="/signup">
                        <HoverButton variant="outlined" color="secondary">Creare cont</HoverButton>
                    </Link>
                </Box>
                {!isEmailValid && <p className="error">Emailul introdus nu este valid.</p>}
                {!isPasswordValid && <p className="error">Parola trebuie să conțină cel puțin 8 caractere.</p>}
            </Box>
            <div className="imagine"></div>
        </Box>
    );
}

export default Login;