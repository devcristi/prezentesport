import React, { useState } from "react";
import './Style.css';
import { Link } from "react-router-dom";
import { Button, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import { TextField } from "@mui/material";
import { Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';

function Signup() {


    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [isFirstNameValid, setIsFirstNameValid] = useState(true);
    const [isLastNameValid, setIsLastNameValid] = useState(true);
    const handleFirstNameChange = (event) => {
        setFirstName(event.target.value);
    };

    const handleLastNameChange = (event) => {
        setLastName(event.target.value);
    };

    const theme = useTheme();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isEmailValid, setIsEmailValid] = useState(true);
    const [isPasswordValid, setIsPasswordValid] = useState(true);
    const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        setIsEmailValid(true);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        setIsPasswordValid(true);
    };

    const handleConfirmPasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        setIsConfirmPasswordValid(true);
    };

    const validateForm = () => {
        const isFirstNameValid = validateName(firstName);
        const isLastNameValid = validateName(lastName);
        const isEmailValid = validateEmail(email);
        const isPasswordValid = validatePassword(password);
        const isConfirmPasswordValid = password === confirmPassword;
        setIsFirstNameValid(isFirstNameValid);
        setIsLastNameValid(isLastNameValid);
        setIsEmailValid(isEmailValid);
        setIsPasswordValid(isPasswordValid);
        setIsConfirmPasswordValid(isConfirmPasswordValid);
        return isEmailValid && isPasswordValid && isConfirmPasswordValid && isFirstNameValid && isLastNameValid;
    };

    const validateName = (name) => {
        const re = /^[a-zA-Z-]+$/;
        return re.test(name);
    };

    const validateEmail = (email) => {
        const re = /^([a-zA-Z0-9._%+-]+@(unitbv\.ro|student\.unitbv\.ro|gmail\.com))$/;
        return re.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 8;
    };

    const HoverButton = styled(Button)({
        '&:hover': {
          backgroundColor: '#757ce8',
          color: '#fff',
        },
    });
    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            const formData = {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            };

            console.log(formData);
        }
    };
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
                    Creare cont nou
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
                        label="Nume"
                        variant="outlined"
                        value={lastName}
                        onChange={handleLastNameChange}
                        required
                        error={!isLastNameValid}
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
                        label="Prenume"
                        variant="outlined"
                        value={firstName}
                        onChange={handleFirstNameChange}
                        required
                        error={!isFirstNameValid}
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

                    <TextField
                        id="outlined-basic"
                        label="Confirmare Parola"
                        variant="outlined"
                        type="password"
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                        required
                        error={!isConfirmPasswordValid}
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
                        <Button variant="contained" onClick={handleSubmit} color="primary">Creare cont</Button>
                    </Box>
                    <Typography variant="h6" color="initial">
                        Ai deja un cont?
                    </Typography>
                    <Link to="/login">
                        <HoverButton variant="outlined" color="secondary">Autentificare</HoverButton>
                    </Link>
                </Box>
                {!isFirstNameValid && <p className="error">Prenumele poate contine doar litere.</p>}
                {!isLastNameValid && <p className="error">Numele poate contine doar litere.</p>}
                {!isEmailValid && <p className="error">Emailul introdus nu este valid.</p>}
                {!isPasswordValid && <p className="error">Parola trebuie să conțină cel puțin 8 caractere.</p>}
                {!isConfirmPasswordValid && <p className="error">Parolele nu se potrivesc.</p>}
            </Box>
            <div className="imagine"></div>
        </Box>
    );
}

export default Signup;