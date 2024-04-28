import React from 'react';
import { useTheme } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import './App.css';
import DashboardUser from './components/DashboardUser/DashboardUser';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Switch from './components/Switch/Switch';
import { useState } from 'react';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Admin from './components/Admin/Admin';
function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [userName, setUserName] = useState("");
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
    console.log(`Dark mode is now ${!darkMode ? "enabled" : "disabled"}`);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="App" style={{ height: '100vh', overflow: 'auto' }}>
          {/* <Switch checked={darkMode} onChange={handleThemeChange} /> */}
          <Routes>
            <Route path="*" element={<Login darkMode={darkMode} handleThemeChange={handleThemeChange} />} />
            <Route path="/signup" element={<Signup darkMode={darkMode} handleThemeChange={handleThemeChange} />} />
            <Route path="/DashboardUser" element={<DashboardUser darkMode={darkMode} handleThemeChange={handleThemeChange}  />} />
            <Route path="/Admin" element={<Admin darkMode={darkMode} handleThemeChange={handleThemeChange} />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
