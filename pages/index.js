import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react';
import BootCodeComponent from '../components/BootCodeCommponent';
import jwt from 'jsonwebtoken';
import { Prism     as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { dark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import cssbeautify from 'cssbeautify';
import Button from '../components/Button';
import CustomInput from '../components/CustomInput';
import Card from '../components/Card';
import ContentContainer from '../components/ContentContainer';
import Link from 'next/link';
import logobootcode from '../public/logo_bootcode.svg'
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function Home() {

  const [receiveBootcodes, setReceiveBootcodes] = useState('');
  const [user, setUser] = useState('');

  useEffect(() => {
      // window.localStorage.getItem('user');
      const token = window.localStorage.getItem('user');
      const decryptedToken = token ? jwt.decode(token) : 'rien';
      setUser(decryptedToken);
  }, []);

  useEffect(() => {
    fetch('https://bootcodedevlab.herokuapp.com/publication/all ')
      .then(res => res.json())
      .then(data => setReceiveBootcodes(data));
  }, []);

  return (
    <div className={styles.container}>
      <Header />
      <div style={{ backgroundColor: '#FBFAFE', display: 'flex', justifyContent: 'center'}}>
      <ContentContainer>
      <Head>
        <title>BootCode</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
        <h1 className={styles.titlePage}>HOME</h1>
       <div className={styles.cardContainer}>

        {receiveBootcodes ? receiveBootcodes.reverse().map(({ _id, creationDate, css, html, javascript, title, tags }) => (
          <Link href={`/communitybootcode/${_id}`} key={_id}>
            <a>
              <Card 
                creationDate={creationDate.split("T")[0]}
                css={css}
                html={html}
                javascript={javascript}
                title={title}
                _id={_id}
                tags={tags}
                />
            </a>
          </Link>
        )) : <h1>Chargement...</h1>}
       </div>
    </ContentContainer>
       </div>
    <Footer />
    </div>
  )
}

