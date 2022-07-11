import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import styles from './Navbar.module.css';

import { useMyDispatch, useMySelector } from '../../hooks/useReduxHooks';
import { logout } from '../../store/authSlice';
import { clearMessage } from '../../store/messageSlice';

const Navbar = () => {
    const [showMessage, setShowMessage ] = useState(false);

    const { loading, isAuthenticated, isAdmin } = useMySelector((state: any) => state.auth);
    const { message } = useMySelector((state: any) => state.message);
    const dispatch = useMyDispatch();

    useEffect(() => {
        if (message) {
            setShowMessage(true);
            setTimeout(() => {
                dispatch(clearMessage());
                setShowMessage(false);
            }, 5000);
        }
    }, [message]);
    const onLogout = () => {
        dispatch(logout());
    }

    return (
        <nav className={styles.nav}>
            {message && (
                <div className={styles.infoMessage}>
                    {message}
                </div>
            )}
            <ul>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                        to='/'>
                        Home
                    </NavLink>
                </li>
                <li>
                    <NavLink
                        className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                        to='/profile'>
                        Profile
                    </NavLink>
                </li>
                {!isAuthenticated && (
                    <>
                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                                to='/login' >
                                Login
                            </NavLink>
                        </li>

                        <li>
                            <NavLink
                                className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                                to='/register'>
                                Register
                            </NavLink>
                        </li>
                    </>
                )}
                {isAdmin && (

                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                            to='/admin'>
                            Admin
                        </NavLink>
                    </li>
                )}
                {isAuthenticated && (
                    <li>
                        <NavLink
                            className={({ isActive }) => isActive ? styles.activeLink : styles.link}
                            to='/logout'
                            onClick={onLogout}>
                            Logout
                        </NavLink>
                    </li>
                )}


            </ul>
        </nav>
    );
};

export default Navbar;