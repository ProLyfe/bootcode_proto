import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import styles2 from '../styles/login.module.css'
import Button from '../components/Button';
import Header from '../components/Header';
import Router from 'next/router';
import Footer from '../components/Footer';

const Register = () => {

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const profile = {
            email,
            username,
            password
        };

        fetch('https://bootcodedevlab.herokuapp.com/auth/register', {
            method: 'POST',
            // mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(profile)
        }).then(res => res.json()).then(data => {
                // localStorage.removeItem('user');
                // window.localStorage.setItem('user', data.user);
                Router.push('/login');
        });
        // .then(data => window.localStorage.setItem('user', data.user))

        console.log(profile)
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>BootCode</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <Header />
            <h1 className={styles.titlePage}>INSCRIPTION</h1>
            <form onSubmit={handleSubmit} className={styles2.formContainer}>
                <input type="text" placeholder="Email" className={styles2.customInput} style={{ height: '2.75rem' }} onChange={(e) => setEmail(e.target.value)}/><br />
                <input type="text" placeholder="Username" className={styles2.customInput} style={{ height: '2.75rem' }} onChange={(e) => setUsername(e.target.value)}/><br />
                <input type="password" placeholder="Mot de passe" className={styles2.customInput} style={{ height: '2.75rem' }} onChange={(e) => setPassword(e.target.value)}/><br />
                {/* <button>Valider</button> */}
                <Button title="S'inscrire"/>
            </form>
            <Footer />
      </div>
    );
};

// export async function getServerSideProps() {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
//     const data = await res.json();
    
//     return { props: { todo: data }}
// };


export default Register;