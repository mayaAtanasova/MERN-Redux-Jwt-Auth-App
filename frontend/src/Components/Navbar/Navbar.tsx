import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navbar.module.css';

const Navbar = () => {

    return (
        <nav className={styles.nav}>
            <ul>
                <li>
                    <NavLink
                        className={({ isActive}) => isActive? styles.activeLink : styles.link}
                        to='/'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive}) => isActive? styles.activeLink : styles.link}
                        to='/login' >
                        Login
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive}) => isActive? styles.activeLink : styles.link}
                        to='/register'>
                        Register
                    </NavLink>
                </li>
                <li>
                    Logout
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;