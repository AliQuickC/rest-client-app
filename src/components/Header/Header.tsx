'use client';

import s from './Header.module.sass';
import { useState, type JSX } from 'react';
import classNames from 'classnames';
import { NavLink } from 'react-router';
import { useAppState } from '../../redux/useAppSelector';
import { useActions } from '../../redux/useActions';
import { FormattedMessage } from 'react-intl';
import { auth } from '../../config/firebase';
import { signOut } from 'firebase/auth';

export function Header(): JSX.Element {
  const headerStyles = classNames('header ', s.header);
  const headerContainerStyles = classNames('container ', s.headerContainer);
  const [name, setName] = useState('unknown');

  const { isLogin } = useAppState();
  const { login, logout, switchLanguage } = useActions();

  auth.onAuthStateChanged((user) => {
    if (user) {
      if (!isLogin) {
        login();
      }
      setName(user?.email ? user.email : 'unknown');
    } else {
      setName('unknown');
      logout();
    }
  });

  const handleLogout = () => {
    signOut(auth);
    console.log('user signOut');
  };

  return (
    <header className={headerStyles}>
      <div className={headerContainerStyles}>
        <nav>
          <ul className={s.links}>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/rest">Rest</NavLink>
            </li>
            <li>
              <NavLink to="/variables">Variables</NavLink>
            </li>
            <li>
              <NavLink to="/history">History</NavLink>
            </li>
            <li>
              <NavLink to="/login">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/signIn">Sign In</NavLink>
            </li>
          </ul>
          <div>Logged as {name}</div>
        </nav>
        <label className={s.switch}>
          <input
            type="checkbox"
            className={s.switchBox}
            name=""
            id=""
            onChange={(event) => {
              switchLanguage(event.target.checked);
            }}
          />
          <span className={s.switchButton}>en/ru</span>
        </label>

        <button onClick={() => (isLogin ? handleLogout() : login())}>
          {isLogin ? (
            <FormattedMessage id="app.signOutButton" />
          ) : (
            <>
              <FormattedMessage id="app.signUpButton" />/
              <FormattedMessage id="app.signInButton" />
            </>
          )}
        </button>
      </div>
    </header>
  );
}
