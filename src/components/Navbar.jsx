import React from 'react'
import { Link, useLocation, useNavigate } from "react-router-dom";
import '../Home.css';

const Navbar = (props) => {
  let location = useLocation();
  let history = useNavigate();
  const handleLogout = () =>{
    localStorage.removeItem('token');
    history("/login");
  } 
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{position: "fixed", zIndex: "10", width: "100%", top: "0"}}>
        <div className="container-fluid">
          <Link className="navbar-brand" to="/"><span style={{color: "#9C27B0", fontWeight: "bold"}}>i</span>Notebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/"? "active": ""}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === "/about"? "active": ""}`} to="/about">About</Link>
              </li>
              <li className="nav-item" hidden>
                <Link className={`nav-link ${location.pathname === "/create"? "active": ""}`} to="/create">Create</Link>
              </li>
            </ul>

           <button className='mx-4' style={{border: 'none', backgroundColor: "transparent"}}><i className="fa-solid fa-circle-half-stroke nav-icon" style={{color: "#151515", fontSize: "1.5rem"}} onClick={props.toggleDarkMode}></i></button>

            {!localStorage.getItem('token')?<form className="d-flex flex-row" role="search">
              <Link className="btn btn-primary" to="/login" role="button" style={{backgroundColor: "#8a0c8ae8", border: "none"}}><i className="fa-solid fa-arrow-right-to-bracket" style={{color: "white"}}></i> Log In</Link>
            </form>: <i className="fa-solid fa-arrow-right-from-bracket nav-icon" onClick={handleLogout} style={{color: "#151515", fontSize: "1.35rem", marginRight: "1rem"}}></i>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
