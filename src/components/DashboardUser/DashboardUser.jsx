import React, { useState, useEffect } from "react";
import { Typography, Box, Container, useTheme } from "@mui/material";
import Switch from '../Switch/Switch';
import logoUnitbv from './logoUnitbv.png';
import logoUnitbvDark2 from './logoUnitbvDark2.png';
import logoUnitbvWhite from './logoUnitbvWhite.png';

function DashboardUser({ darkMode, handleThemeChange }) {
    const [user, setUser] = useState(null);
    const [code, setCode] = useState('');
    const [validCode, setValidCode] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        const email = JSON.parse(localStorage.getItem('user')).email;
        console.log('Email:', email);
        fetch(`http://localhost:8080/student/get?email=${email}`)
        .then(response => {
            console.log('Răspuns:', response.ok, 'Status:', response.status);
            if (!response.ok) {
                if (response.status === 404) {
                    console.error('Nu există niciun student cu adresa de email specificată');
                } else {
                    throw new Error('Eroare la încărcarea datelor utilizatorului');
                }
            } else {
                return response.text(); // Get the response body as text
            }
        })
        .then(data => {
            const parsedData = JSON.parse(data);
            setUser(parsedData); // Set the user state with the fetched data
        })
        .catch(error => console.error('Eroare la încărcarea datelor utilizatorului:', error));
    }, []);

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleCodeSubmit = (event) => {
        event.preventDefault();
        console.log('handleCodeSubmit called');
        console.log('Code to be submitted:', code); // Loghează codul introdus de student

        // Face cererea pentru a verifica codul introdus
        fetch(`http://localhost:8080/admin/checkCode`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code: code }),
            })
            .then(response => response.json()) // Parse the response body
            .then(data => {
                if (data) { // Check the result
                    // The code is valid
                    setValidCode(true);
                    fetch(`http://localhost:8080/student/incrementAttendance/${user.email}`, {
                        method: 'POST',
                    })
                    .then(response => response.json())
                    .then(data => {
                        // Handle the response
                        console.log(data);
                })
                .catch(error => console.error('Error:', error));
                } else {
                    // The code is not valid
                    setValidCode(false);
                    alert('The code you entered is not valid. Please try again.');
                }
            })
            .catch(error => console.error('Error:', error));
        };
    return (
        <Box className="dashboardUser" sx={{ display: 'flex', flexDirection: 'column',gap: '1rem' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', padding: '1rem',
            [theme.breakpoints.down('sm')]: {
                backgroundImage: `url(${darkMode ? logoUnitbvWhite : logoUnitbvDark2})`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'contain',
            }
                }}>
                <Switch checked={darkMode} onChange={handleThemeChange} />
            </Box>
            <Container sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1rem',
                [theme.breakpoints.down('sm')]: {
                    display: 'flex',
                    width: '100%',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                }
        }}>
                <Box className="navbar" sx={{ display: 'flex', flexDirection: 'row', gap: '1rem', alignItems: 'center', justifyContent: 'center' }}>
                    <Box className="navbar-logo"
                        sx={{
                            backgroundImage: `url(${darkMode ? logoUnitbvWhite : logoUnitbvDark2})`,
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            backgroundSize: 'contain',
                            height: '50px',
                            width: '50px',
                            [theme.breakpoints.down('sm')]: {
                                display: 'none',
                            }
                        }}
                    ></Box>
                    <Typography variant="h4" color="primary" style={{
                        [theme.breakpoints.down('sm')]: {
                            variant: 'h4',
                            fontSize: '1.2rem',
                        }
                    }}>
                        Salut, {user ? user.firstName + ' ' + user.lastName : 'Utilizator'}!
                    </Typography>
                </Box>
                <Box className="checkCode" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem', alignItems: 'center' }}>
                    <form onSubmit={handleCodeSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem',
                        [theme.breakpoints.down('sm')]: {
                            flexDirection: 'column',
                            alignItems: 'center',
                        }
                    }}>
                        <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'center' }}>
                            <Typography variant="h5" color="secondary" style={{
                                fontSize: '1.2rem',
                                [theme.breakpoints.down('sm')]: {
                                    fontSize: '1rem',
                                }
                            }}>
                                Introdu codul:
                            </Typography>
                            <input
                                type="text"
                                value={code}
                                onChange={handleCodeChange}
                                style={{
                                    fontSize: '1.2rem',
                                    [theme.breakpoints.down('sm')]: {
                                        fontSize: '1rem',
                                        width: '100%',
                                        padding: '0.5rem',
                                    }
                                }}
                            />
                        </label>
                        <input type="submit" value="Submit" style={{
                            width: '100%',
                            padding: '0.5rem',
                            backgroundColor: 'green',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            [theme.breakpoints.down('sm')]: {
                                width: '100%',
                            }
                        }} />
                    </form>
                    <Box className="attendance">
                        <Typography variant="body1" color="secondary">
                            {user && user.prezente >= 5
                                ? "Ai atins numărul de prezențe"
                                : `Ai ${user ? user.prezente : 0} prezențe, îți mai trebuie ${5 - (user ? user.prezente : 0)} prezențe.`}
                        </Typography>
                    </Box>
                    {validCode && <p>Prezenta incrementata cu succes!</p>}
                </Box>
            </Container>
        </Box>
    );
}

export default DashboardUser;