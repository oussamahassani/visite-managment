import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';

const Header = () => {
    return (
        <header id="site-header" className="fixed-top">
            <style>{`
                #site-header {
                    background-color: #000000; /* Add your desired background color here */
                    height: 130px; /* Adjust the height of the header */
                }
                
                .container {
                    width: 100%; /* Adjust the width of the container as needed */
                    margin: 0 auto; /* Center the container */
                    margin-left: 0%; /* Adjust the left margin to shift content to the left */
                }
                
                .navbar-brand {
                    display: flex;
                    align-items: center;
                }
                
                .logo {
                    width: 120px; /* Adjust the width of the logo as needed */
                     /* Adjust the margin as needed */
                }
                
                .navbar-nav {
                    flex-direction: row;
                }
            `}</style>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <Link className="navbar-brand" to="/">
                        <h1 style={{ color: 'red' }}>T </h1>visite Service

                    </Link>

                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item active">
                            <Link className="nav-link" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/auth/login">Login</Link>
                        </li>


                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
