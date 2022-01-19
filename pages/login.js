import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import Header from '../components/Header';
import styles2 from '../styles/login.module.css'
import Button from '../components/Button';
import Router from 'next/router';
import Footer from '../components/Footer';

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const profile = {
            email,
            password
        };

        fetch('https://bootcodedevlab.herokuapp.com/auth/login', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        }).then(res => res.json()).then(data => {
            window.localStorage.setItem('user', data.user);
            Router.push('/');
        })
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>BootCode</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <Header />
            <h1 className={styles.titlePage}>CONNEXION</h1>
            <form onSubmit={handleSubmit} className={styles2.formContainer}>
                <input type="text" placeholder="Email" style={{ height: '2.75rem' }} className={styles2.customInput} onChange={(e) => setEmail(e.target.value)}/><br />
                <input type="password" placeholder="Mot de passe" style={{ height: '2.75rem' }} className={styles2.customInput}  onChange={(e) => setPassword(e.target.value)}/><br />
                <Button title="Se connecter"/>
            </form>
            <Footer />
      </div>
    );
};

export default Login;