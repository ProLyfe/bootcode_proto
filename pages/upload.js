import Head from 'next/head'
import { useState } from 'react';
import jwt from 'jsonwebtoken';
import Header from '../components/Header';
import styles from '../styles/upload.module.css';
import CustomInput from '../components/CustomInput'
import CustomTextArea from '../components/CustomTextArea';
import Button from '../components/Button';

const Upload = () => {

    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [javascript, setJavascript] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        const code = {
            title,
            desc,
            html,
            css,
            javascript,
            tags: ['Material UI', 'Flat Design', 'Modern']
        };

        const token = window.localStorage.getItem('user');
        const decryptedToken = token ? jwt.decode(token) : 'rien';
        const decryptedTokenId = decryptedToken._id
        fetch(`https://bootcodedevlab.herokuapp.com/publication/${decryptedTokenId}/post`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(code)
        })

        console.log(code)
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>BootCode</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <Header />
            <h1>Envoi du code</h1>
            <div className={styles.back}><p className={styles.backPara}>Retour</p></div>
            
            <form className={styles.customInputContainer} onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    style={{ height: '2.75rem' }} 
                    className={styles.customInput} 
                    placeholder='Title'
                    onChange={e => setTitle(e.target.value)}
                />
                
                <textarea 
                    type="text" 
                    style={{ height: '6rem' }} 
                    className={styles.customTextArea}
                    placeholder="HTML"
                    onChange={e => setHtml(e.target.value)}
                    ></textarea>

                <textarea 
                    type="text" 
                    style={{ height: '6rem' }} 
                    className={styles.customTextArea}
                    placeholder="CSS"
                    onChange={e => setCss(e.target.value)}
                    ></textarea>

                <textarea 
                    type="text" 
                    style={{ height: '6rem' }} 
                    className={styles.customTextArea}
                    placeholder="JavaScript"
                    onChange={e => setJavascript(e.target.value)}
                    ></textarea>


                {/* <CustomInput placeholder="title" height={'2.75rem'} setTitle={setTitle}/>
                <CustomTextArea placeholder="html" height={'6rem'} setHtml={setHtml}/>
                <CustomTextArea placeholder="css" height={'6rem'} setCss={setCss}/>
                <CustomTextArea placeholder="js" height={'6rem'} setJavascript={setJavascript}/> */}
                <Button title="Envoyer"/>
            </form>
             {/* <form onSubmit={handleSubmit}>
                 <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/><br />
                 <input type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)}/><br />
                 <input type="text" placeholder="HTML" onChange={(e) => setHtml(e.target.value)}/><br />
                 <input type="text" placeholder="CSS" onChange={(e) => setCss(e.target.value)}/><br />
                 <input type="text" placeholder="JS" onChange={(e) => setJavascript(e.target.value)}/><br />
                 <button>Valider</button>
             </form> */}
      </div>
    );
};

// export async function getServerSideProps() {
//     const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
//     const data = await res.json();
    
//     return { props: { todo: data }}
// };


export default Upload;






{/* <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}/><br />
                <input type="text" placeholder="Description" onChange={(e) => setDesc(e.target.value)}/><br />
                <input type="text" placeholder="HTML" onChange={(e) => setHtml(e.target.value)}/><br />
                <input type="text" placeholder="CSS" onChange={(e) => setCss(e.target.value)}/><br />
                <input type="text" placeholder="JS" onChange={(e) => setJavascript(e.target.value)}/><br />
                <button>Valider</button>
            </form> */}