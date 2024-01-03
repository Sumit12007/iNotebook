import React, {useState, useEffect} from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from "./components/home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import AddNotes from "./components/AddNotes";
import Login from "./components/Login";
import Alert from "./components/Alert";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 1500);
  }

  const storedTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(storedTheme === 'dark');
    useEffect(() => {
        // Apply the theme when the component mounts or when the theme changes
        applyTheme();
    }, [isDarkMode]);

    const toggleDarkMode = () => {
        // Toggle between dark and light mode
        setIsDarkMode(prev => !prev);
    };

    const applyTheme = () => {
        // Apply the selected theme
        const body = document.body;
        body.classList.toggle('dark-mode', isDarkMode);
        // Save the theme preference to localStorage
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    };

  return (
    <>
    <NoteState>
     <BrowserRouter>
        <Navbar toggleDarkMode={toggleDarkMode} />
        <Alert alert={alert} />
          <Routes>
            <Route exact path="/" element={<Home showAlert={showAlert} />}></Route>
            <Route exact path="/about" element={<About/>}></Route>
            <Route exact path="/create" element={<AddNotes showAlert={showAlert} />}></Route>
            <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
          </Routes>
     </BrowserRouter>
    </NoteState>
    </>
  )
}

export default App
