import React from 'react'
import "../about.css"
import { Link } from "react-router-dom";

function About() {
    return (
        <div>
            <div className="text-white aboutImg text-center">
                <div className="note-img">
                    <h1 className="display-4">Empowering  Students</h1>
                    <p>An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee</p>
                </div>
            </div>

            <div className="container mt-5 ">
                <div className="row mt-5 mb-5 p-5 text-wrapper">
                    <div className="col-md-6 d-flex flex-column" style={{width: "100%"}}>
                        <h2 className="mb-3" style={{ fontWeight: "Bold" }}>Make something <span style={{ color: "#9C27B0" }}>Awesome</span> </h2>
                        <p>iNotebook is made from the pain of writing all the things in notebook which is very hectic, So we mad an online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbances.You can also access your notes anywhere in your world, at anytime time. So don't forget to Create note because creating anything is always important
                        </p>
                        <div className="d-flex justify-content-center mt-3">
                            <Link to="/create" role="button" style={{ color: "White", textDecoration: "none", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem", backgroundColor: "#9C27B0", padding: "5px 15px", borderRadius: "8px", border: "none", boxShadow: "0px 0px 10px #6b6b6b" }}>Create New Note</Link>
                        </div>
                    </div>
                    <div className="col-md-6" style={{width: "100%", textAlign: "center"}}>
                    <img className="img-fluid awesome" src='src\assets\about - awesome.svg'alt="about-awesome" style={{maxWidth: "370px"}}/>
                    </div>
                </div>

                <div className="row login mt-5 mb-5 p-5 text-wrapper">
                    <div className="col-md-6" style={{width: "100%", textAlign: "center"}}>
                    <img className="img-fluid awesome" src='src\assets\about - awesome.svg' alt="about-awesome" style={{maxWidth: "370px"}}/>
                    </div>
                    <div className="col-md-6 d-flex flex-column" style={{width: "100%"}}>
                        <h2 className="mb-3" style={{ fontWeight: "Bold" }}>Powering the <span style={{ color: "#9C27B0" }}>internet's visuals</span> </h2>
                        <p>
                            How we started? The concept was simple. iNotebook was born from the pain of writing all the things in notebook which is very hectic. An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbances.
                        </p>
                        <div className="d-flex justify-content-center mt-3">
                            <Link to="/login" role="button" style={{ color: "White", textDecoration: "none", textTransform: "none", fontFamily: "'Poppins', sans-serif", fontSize: "1.3rem", backgroundColor: "#9C27B0", padding: "5px 15px", borderRadius: "8px", border: "none", boxShadow: "0px 0px 10px #6b6b6b" }}>Sign up now</Link>
                        </div>
                    </div>
                </div>
            </div>

            <footer>
                <div className="content">
                    <div className="top">
                        <div className="logo-details">
                            <span className="logo_name"><span style={{ color: "#9C27B0" }}>i</span>Notebook</span>
                        </div>
                        <div className="media-icons">
                            <Link to="https://www.facebook.com/NewarSumit.07" target='_blank'><i className="fab fa-facebook-f"></i></Link>
                            <Link to="https://twitter.com/Sumitkatila006" target='_blank'><i className="fab fa-x-twitter"></i></Link>
                            <Link to="https://www.instagram.com/sumitkatila_007/" target='_blank'><i className="fab fa-instagram"></i></Link>
                            <Link to="https://www.linkedin.com/in/sumit-katila-384182291/" target='_blank'><i className="fab fa-linkedin-in"></i></Link>
                            <Link to="https://github.com/Sumit12007" target='_blank'><i className="fab fa-github"></i></Link>
                        </div>
                    </div>
                    <div className="link-boxes">
                        <ul className="box">
                            <li className="link_name">Company</li>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/create">New Notes</Link></li>
                            <li><Link to="/about">About us</Link></li>
                            <li><Link to="/">Get started</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Services</li>
                            <li><Link to="/">Your Notes</Link></li>
                            <li><Link to="/create">New Note</Link></li>
                        </ul>
                        <ul className="box">
                            <li className="link_name">Account</li>
                            <li><Link to="/login">Sign-in</Link></li>
                            <li><Link to="/login">Join Free</Link></li>
                        </ul>
                        <ul className="box input-box">
                            <li className="link_name">About iNotebook</li>
                            <li style={{color: "#F7FFFF"}}>
                            An online web platform where you can create, edit, upload, delete your notes/information privately and securely without any disturbancee
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="bottom-details">
                    <div className="bottom_text">
                        <span className="copyright_text">Copyright &#169; 2023 <Link to="/">iNotebook</Link>All rights reserved</span>
                        <span className="policy_terms">
                            <Link to="/">Privacy policy</Link>
                            <Link to="/">Terms & condition</Link>
                        </span>
                    </div>
                </div>
            </footer>

        </div>
    )
}

export default About
