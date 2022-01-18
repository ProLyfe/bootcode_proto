import logobootcode from '../public/logo_bootcode.svg'
import burger from '../public/menu-icon.svg'
import icon from '../public/icon.svg'
import Image from 'next/image';
import styles from '../styles/header.module.css';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Router from 'next/router'


const Header = () => {

    const [isMenuToggled, setIsMenuToggled] = useState(false);
    const [decryptedTokenState, setDecryptedToken] = useState('');
    const [decryptedTokenStateName, setDecryptedTokenName] = useState('');

    const toggleMenu = () => {
        setIsMenuToggled(prev => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem('user');
        window.location.pathname === '/' ? Router.reload(window.location.pathname) : Router.push('/')
    };

    useEffect(() => {
        // window.localStorage.getItem('user');
        const token = window.localStorage.getItem('user');
        const decryptedToken = token ? jwt.decode(token) : 'rien';
        // setUser(decryptedToken)
        setDecryptedToken(decryptedToken)
        decryptedToken && setDecryptedTokenName(decryptedToken.username)
        console.log('TU VEUX QUOI ?', decryptedToken)
  
    }, []);

    return (
        <>
        <div className={styles.header}>
            <Link href="/">
                <div className={styles.imageContainer}>
                    <Image src={logobootcode} height={180} width={180} className={styles.logoboot}/>
                </div>
            </Link>
            {/* <div className={styles.burgerContainer}>
                <Image src={burger} height={30} width={30} color='black'/>
            </div> */}
            <input type="text" className={styles.input} placeholder="Rechercher"/>
            <ul className={styles.login}>
                {decryptedTokenStateName ? 
                <>
                    <Link href="/profile"><a className={styles.loginElementProfile}>Bonjour {decryptedTokenState.username} !</a></Link>
                    <Link href="/"><a onClick={handleLogout} className={styles.loginElementProfile}>Déconnexion</a></Link>
                </>
                 :
                 <>
                    <Link href="/login"><a className={styles.loginElement}>SE CONNECTER</a></Link>
                    <Link href="/register"><a className={styles.loginElement}>S'INSCRIRE</a></Link>
                </>
                }
            <div className={styles.loginElement}>
                <Image src={icon} height={30} width={30}/>
            </div>
            </ul>
        </div>
        
        {/* MOBILE HEADER */}
        
        <div className={styles.firstMobileHeader}>
            <Link href="/">
                <div className={styles.imageContainer}>
                    <Image src={logobootcode} height={120} width={120} className={styles.logoboot}/>
                </div>
            </Link>
            <div className={styles.burgerContainer} onClick={toggleMenu}>
                <Image src={burger} height={30} width={30} color='black'/>
            </div>
        </div>

        {isMenuToggled ? <div className={styles.header2}>
            <div className={styles.secondMobileHeader}>
                <div className={styles.secondMobileHeaderAuth}>
                    {decryptedTokenState.username ? 
                    <>
                        <Link href="/profile"><a className={styles.loginElementProfile}>Bonjour {decryptedTokenState.username} !</a></Link>
                        <Link href="/"><a className={styles.loginElementProfile}>Déconnexion</a></Link>
                    </>
                    :
                    <>
                        <Link href="/login"><a className={styles.loginElement}>SE CONNECTER</a></Link>
                        <Link href="/register"><a className={styles.loginElement}>S'INSCRIRE</a></Link>
                    </>
                    }
                </div>
            </div>
            <div className={styles.mobileInputContainer}>
                <input type="text" className={styles.mobileInput} placeholder="Rechercher"/>
            </div>
            <div className={styles.navbarContainer}>
                <Link href="/"><a><h1 className={styles.titlePage}>HOME</h1></a></Link>
                <Link href="/contact"><a><h1 className={styles.titlePage}>NOUS CONTACTER</h1></a></Link>
            </div>
        </div> : <span></span>}
        {/* <div className={styles.header2}>
            <div className={styles.secondMobileHeader}>
                <div className={styles.secondMobileHeaderAuth}>
                    <Link href="./"><a className={styles.loginElement}>SE CONNECTER</a></Link>
                    <Link href="./eze"><a className={styles.loginElement}>S'INSCRIRE</a></Link>
                </div>
            </div>
            <div className={styles.mobileInputContainer}>
                <input type="text" className={styles.mobileInput} placeholder="Rechercher"/>
            </div>
            <div className={styles.navbarContainer}>
                <h1 className={styles.titlePage}>HOME</h1>
                <h1 className={styles.titlePage}>NOUS CONTACTER</h1>
            </div>
        </div> */}
        </>
    );
};

export default Header;