import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Modificare aici
import { Button, TextField, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";
import Switch from '../Switch/Switch';
import { useTheme } from '@mui/material/styles';
import logoUnitbvWhite from './logoUnitbvWhite.png';
import logoUnitbvDark2 from './logoUnitbvDark2.png';

const HoverButton = styled(Button)({
  '&:hover': {
    backgroundColor: '#757ce8',
    color: '#fff',
  },
});

function Login({ darkMode, handleThemeChange }) {
  const theme = useTheme();
  const navigate = useNavigate(); // Modificare aici

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsEmailValid(true);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setIsPasswordValid(true);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validare formular
    const isFormValid = validateForm();
    if (!isFormValid) {
      return;
    }

    const formData = {
      email: email,
      password: password
    };

    try {
      const response = await fetch('http://localhost:8080/student/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const text = await response.text();
        console.log(text); // Afișăm răspunsul primit de la server în consolă
        if (text.includes("Autentificare reușită")) {
            localStorage.setItem('user', JSON.stringify({ email }));
            if(email === 'admin@unitbv.ro')
              navigate('/Admin', { state: { email } });
            else
              navigate('/DashboardUser', { state: { email } }); // Navigăm către pagina DashboardUser dacă autentificarea este reușită
        } else {
            alert('Răspuns neașteptat de la server.'); // Tratăm cazul în care primim un răspuns neașteptat
        }
    } else {
        alert('Autentificare eșuată. Te rog încearcă din nou.');
    }

    } catch (error) {
      console.error('Eroare în timpul autentificării:', error);
      alert('Eroare în timpul autentificării. Te rog încearcă din nou mai târziu.');
    }
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
    return password.length >= 8;
  };

    return (
        <>
            <Box sx={{display: 'flex', flexDirection: 'row', width:'100%', height:'100%'}}>
                <Box sx={{
                    marginTop: '1rem',
                }}>
                    <Switch checked={darkMode} onChange={handleThemeChange} />
                </Box>
                <Box className="info" sx={{
                    flex: '1',
                    width: '60%',
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
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
                        color: darkMode ? 'white' : 'black',
                        fontSize: '3em',
                        [theme.breakpoints.down('sm')]:{
                            fontSize: '1.7em',
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
                        <Typography variant="h6" color="initial" sx={{
                            color: darkMode ? 'white' : 'black',
                        }}>
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
        </>
    );
}

export default Login;
