import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import { Box, Paper, Button, Typography, useTheme } from '@mui/material';
import logoUnitbvDark2 from './logoUnitbvDark2.png';
import logoUnitbvWhite from './logoUnitbvWhite.png';
import Switch from '../Switch/Switch';


const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'password', headerName: 'Password', width: 200 },
  { field: 'prezente', headerName: 'Prezente', width: 200 },
];

export default function Admin({ darkMode, handleThemeChange }) {
  const [students, setStudents] = useState([]);
  const [code, setCode] = useState(null);
  const theme = useTheme();

  // Function to fetch the student data
  const fetchStudents = () => {
    fetch('http://localhost:8080/student/getAll')
      .then(response => response.json())
      .then(data => {
        const formattedData = data
          .filter(student => student.email !== 'admin@unitbv.ro') // exclude admin account
          .map((student, index) => ({
            ...student,
            id: index + 1,
          }));
        setStudents(formattedData);
      });
  };

  // Fetch the student data when the component is first rendered
  useEffect(() => {
    fetchStudents();
  }, []);

  const generateCode = () => {
    fetch('http://localhost:8080/admin/generateCode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ adminId: 'admin@unitbv.ro' }),
    })
      .then(response => response.text())
      .then(code => {
        setCode(code);
        // Fetch the student data again after the code is generated
        fetchStudents();
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <>
      <Box sx={{padding: '1rem',
      backgroundImage: `url(${darkMode ? logoUnitbvWhite : logoUnitbvDark2})`,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundSize: 'contain',
    }}>
        <Switch checked={darkMode} onChange={handleThemeChange} />
      </Box>

        <Box sx={{ display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          height: '20%',
          width: '100%',
          textAlign: 'center',
        }}>
            <Typography variant="h5" color="primary"
              sx={{
                [theme.breakpoints.down('sm')]: {
                  fontSize: '1.2rem',
                  textAlign: 'center',
                },
                [theme.breakpoints.down('md')]: {
                  fontSize: '1.4rem',
                  textAlign: 'center',
                }
              }}
            >
                Salut, Admin! Pentru a genera un cod de incrementare prezente, apasa pe butonul de mai jos.
            </Typography>
              <Button onClick={generateCode}
                sx={{marginTop: '1rem'}}
              >Generate Code</Button>
              {code && <p>Code: {code}</p>}
        </Box>
        <Box style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', padding: '2em',  height: '50%', width: '100%' }}>
            <Paper elevation={3} sx={{ width: '65%', overflow: 'hidden',
            [theme.breakpoints.down('sm')]: {
              width: '100%',
            }
          }}>
              <DataGrid
                rows={students}
                columns={columns}
                checkboxSelection
                pagination={false}
              />
            </Paper>
          </Box>
    </>
  );
}