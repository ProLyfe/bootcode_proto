import Head from 'next/head'
import { useState } from 'react';
import jwt from 'jsonwebtoken';
import Header from '../components/Header';
import styles from '../styles/upload2.module.css';
import CustomInput from '../components/CustomInput'
import CustomTextArea from '../components/CustomTextArea';
import Button from '../components/Button';
import htmlBeautify from 'html-beautify'
import { Prism     as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import cssbeautify from 'cssbeautify';
import { useEffect } from 'react/cjs/react.development';

const Upload = () => {

    const [isSelected, setIsSelected] = useState(true);
    const [isSelected2, setIsSelected2] = useState(false);
    const [isSelected3, setIsSelected3] = useState(false);

    const [author, setAuthor] = useState('');
 

    // console.log('data :', data)

    const handleSelection = (order) => {

        if (order === 'first') {
            setIsSelected(true);
            setIsSelected2(false);
            setIsSelected3(false);
        } else if (order === 'second') {
            setIsSelected(false);
            setIsSelected2(true);
            setIsSelected3(false);
        } else if (order === 'third') {
            setIsSelected(false);
            setIsSelected2(false);
            setIsSelected3(true);
        }

    };

    const activated = isSelected === true ? '#9390C1' : '#EAE8FB'
    const activated2 = isSelected2 === true ? '#9390C1' : '#EAE8FB'
    const activated3 = isSelected3 === true ? '#9390C1' : '#EAE8FB'
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [javascript, setJavascript] = useState('');

    const [addTag, setAddTag] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const filteredTags = Array.from(new Set(addTag));
        console.log(filteredTags)
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
        console.log('decryptedTokenId :', decryptedTokenId)
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
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <Header />
            <h1>Envoi du code</h1>
            <div className={styles.back}><p className={styles.backPara}>Retour</p></div>
            

            <form className={styles.bootcodeContainer} onSubmit={handleSubmit}>
                <div className={styles.bootcodeRender}>
                     {/* <iframe src={`./frame/${data._id}`} title="description" scrolling="no" className={styles.iframe}></iframe> */}
                    <h1 className={styles.desc}>Donnez un nom à votre BootCode</h1>
                        <input 
                            type="text" 
                            style={{ height: '2.75rem' }} 
                            className={styles.customInput} 
                            placeholder='Title'
                            onChange={e => setTitle(e.target.value)}
                        />
                    <h1 className={styles.desc}>Sélectionnez 3 catégories</h1>
                    <div className={styles.cardCategoriesContainer}>
                        {/* <p className={styles.cardCategorie}>NAV</p>
                        <p className={styles.cardCategorie}>FLAT DESIGN</p> */}
                        <p className={styles.cardCategorie} onClick={() => setAddTag(prev => [...prev, 'MATERIAL'])}>MATERIAL UI</p>
                        <p className={styles.cardCategorie} onClick={() => setAddTag(prev => [...prev, 'ELEGENT'])}>ELEGENT</p>
                        <p className={styles.cardCategorie} onClick={() => setAddTag(prev => [...prev, 'FLAT DESIGN'])}>FLAT DESGIN</p>
                        <p className={styles.cardCategorie} onClick={() => setAddTag(prev => [...prev, 'ORIGINAL'])}>ORIGINAL</p>
                        <p className={styles.cardCategorie} onClick={() => setAddTag(prev => [...prev, 'MODERN'])}>MODERN</p>
                    </div>
                    <br />
                    <Button title="ENVOYER SON BOOTCODE"/>
                </div>
                <div className={styles.bootcodeCode}>
                    <div className={styles.bootcodeCodeSnippetContainer}>
                          {/* <SyntaxHighlighter language="css" style={darcula}>
                            {data.css}
                        </SyntaxHighlighter> */}
                        <div className={styles.langugageSelection}>
                            <div className={styles.langugage} style={{ backgroundColor: activated }} onClick={() => handleSelection('first')}>HTML</div>
                            <div className={styles.langugage} style={{ backgroundColor: activated2 }} onClick={() => handleSelection('second')}>CSS</div>
                            <div className={styles.langugage} style={{ backgroundColor: activated3 }} onClick={() => handleSelection('third')}>JS</div>
                        </div>
                        { isSelected ? <textarea className={styles.snippet} placeholder="Collez votre code HTML"value={html} onChange={e => setHtml(e.target.value)}></textarea>

                        : isSelected2 ? <textarea className={styles.snippet} placeholder="Collez votre code CSS"value={css} onChange={e => setCss(e.target.value)}></textarea>

                        : <textarea className={styles.snippet} placeholder="Collez votre code JavaScript"value={javascript} onChange={e => setJavascript(e.target.value)}></textarea>
                        }
                    </div>
                </div>
            </form>
            {/* <form className={styles.customInputContainer} onSubmit={handleSubmit}>
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
                <Button title="Envoyer"/>
            </form> */}
      </div>
    );
};

export default Upload;

