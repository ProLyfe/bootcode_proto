import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useState, useEffect } from 'react';
import jwt from 'jsonwebtoken';
import Card from '../components/Card';
import AddCard from '../components/AddCard';
import Link from 'next/link';
import Header from '../components/Header';
import ContentContainer from '../components/ContentContainer';
import styles2 from '../styles/profile.module.css';

const Profile = () => {

    const [user, setUser] = useState('');
    const [userPosts, setUserPosts] = useState('');
    const [deletedId, setDeletedId] = useState('');


    const handleDelete = (id) => {
        // fetch(`https://bootcodedevlab.herokuapp.com/auth/${user}`)
        //     .then(res => res.json())
        //     .then(bootcodeAuthor => {

        //         const token = window.localStorage.getItem('user');
        //         const decryptedToken = token ? jwt.decode(token) : 'rien';
        //         console.log('Mon user local :', decryptedToken.email)
        //         console.log('Mon user remote :', user.email)
        //         // bootcodeAuthor.email
        //     })

        console.log('deletedId', id)

        fetch(`https://bootcodedevlab.herokuapp.com/publication/${id}`, {
            method: 'DELETE',
            // mode: 'cors',
            // headers: {
            //     'Content-Type': 'application/json'
            // },  
            // body: JSON.stringify(id)
        }).then(() => location.reload()) 
};


    useEffect(() => {
        // window.localStorage.getItem('user');
        const token = window.localStorage.getItem('user');
        const decryptedToken = token ? jwt.decode(token) : 'rien';
        console.log('Mon user', decryptedToken)

        decryptedToken && fetch(`https://bootcodedevlab.herokuapp.com/publication/${decryptedToken._id}/post`)
            .then(res => res.json())
            .then(data => setUserPosts(data))

        setUser(decryptedToken);
    }, []);

    useEffect(() => {
        // fetch('https://bootcodedevlab.herokuapp.com/publication/61e35519530c25c68dd85270/post')
        // fetch(`https://bootcodedevlab.herokuapp.com/publication/${user._id}/post`)
        //     .then(res => res.json())
        //     .then(data => setUserPosts(data))
    }, []);

    return (
        <div className={styles.container}>
            <Head>
                <title>BootCode</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            {/* <Confetti
                // width='100vw'
                // height={height}
                /> */}
            <Header />
            {/* <div style={{ backgroundColor: '#FBFAFE', display: 'flex', justifyContent: 'center'}}> */}
            <ContentContainer>

            <h1 className={styles.titlePage}>Profil</h1>
            <h1  className={styles2.titleBootCodes}>Mes BootCodes</h1>
            {/* <h2>{user && user.email}</h2>
            <h2>{user && user.username}</h2> */}

        <div className={styles.cardContainer}>
        <Link href="/upload2"><a><AddCard /></a></Link>
            {userPosts ? userPosts.map(({ _id, creationDate, css, html, javascript, title, tags }) => (
            <div className={styles2.cardAndSupprContainer} key={_id}>
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
                <button onClick={() => handleDelete(_id)} className={styles2.supprimer}>Supprimer</button>
                <button onClick={() => handleDelete(_id)} className={styles2.modifier}>Modifier</button>
            </div>
        )) : <h1>Chargement...</h1>}

        </div>



            {/* {userPosts ? userPosts.map(singlePost => (
                <Card 
                    creationDate={singlePost.creationDate.split("T")[0]}
                    css={singlePost.css}
                    html={singlePost.html}
                    javascript={singlePost.javascript}
                    title={singlePost.title}
                    _id={_id}
                />
            )) : <h1>Loading....</h1>} */}
            </ContentContainer>
            {/* </div> */}
      </div>
    );
};

export default Profile;