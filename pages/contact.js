import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState } from 'react';
import Header from '../components/Header';
import styles2 from '../styles/contact.module.css'
import Button from '../components/Button';
import Router from 'next/router';

const Contact = () => {

    const [email, setEmail] = useState('');
    const [objet, setObjet] = useState('');
    const [message, setMessage] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const contactMessage = {
            mail: email,
            object: objet,
            message
        };

        console.log(contactMessage)

        fetch('https://bootcodedevlab.herokuapp.com/contact/post', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactMessage)
        }).then(res => console.log(res))
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <Header />
            <h1 className={styles.titlePage}>NOUS CONTACTER</h1>
            <form onSubmit={handleSubmit} className={styles2.formContainer}>
                <input type="text" placeholder="MAIL" style={{ height: '2.75rem' }} className={styles2.customInput} onChange={(e) => setEmail(e.target.value)}/><br />
                <input type="text" placeholder="OBJET" style={{ height: '2.75rem' }} className={styles2.customInput}  onChange={(e) => setObjet(e.target.value)}/><br />
                <textarea 
                    type="text" 
                    style={{ height: '6rem' }} 
                    className={styles2.customTextArea}
                    placeholder="MESSAGE"
                    onChange={e => setMessage(e.target.value)}
                    ></textarea>
                <Button title="Envoyer"/>
            </form>
      </div>
    );
};

export default Contact;