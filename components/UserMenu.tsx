import {User as UserIcon} from './icons';
import styles from '../styles/search.module.css';
import Link from 'next/link';
import React, {useCallback, useRef, useState} from 'react';
import {User} from '../lib/database';

type Props = {
  sessionToken?: string;
  userObject?: User;
};

export default function UserMenu(props: Props) {
  // console.log('UserMenu props', props);
  const userMenuRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState<boolean>(false);
  // const onClick = useCallback((event) => {
  //   if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
  //     const invertActive = !active;
  //     setActive(invertActive);
  //     // window.removeEventListener('click', onClick);
  //   }
  // }, []);

  const toggleActive = useCallback(() => {
    const invertActive = !active;
    setActive(invertActive);
    // window.addEventListener('click', toggleActive);
    // console.log('UserMenuProps toggleActive', props, active)
  }, [active]);
  // return props.isLoggedIn ? <UserIcon /> : <p>Login</p>;
  return (
    <li>
      <div onClick={toggleActive} className={styles.container} ref={userMenuRef}>
        <style jsx>{`
          div {
            margin-left: 0.5em;
          }
          ul {
            left: auto;
            background: #2e7d32;
          }
          li {
            padding: 0.2em 1em;
            white-space: nowrap;
          }
          a {
            color: white;
          }
        `}</style>
        <UserIcon className={styles.container} onMouseEnter={toggleActive}/>
        {active && (
          <ul className={styles.results}>
            {props.userObject && props.userObject.id ? (
              <>
                <li className={styles.result}>
                  <a href="/logout">{`Logout ${props.userObject.username.toUpperCase()}`}</a>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link href="/login" as="/login">
                    <a>Login</a>
                  </Link>
                </li>
                <li>
                  <Link href="/register" as="/register">
                    <a>Register</a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </div>
    </li>
  )
}
