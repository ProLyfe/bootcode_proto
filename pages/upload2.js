import Head from 'next/head'
import { useState, useContext } from 'react';
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
import Router from 'next/router';
import Link from 'next/link';
import Confetti from 'react-confetti'
// import { useRouter } from 'next/router'
import { BootCodeContext } from '../pages/_app'; 

const Upload = () => {

    const [isSelected, setIsSelected] = useState(true);
    const [isSelected2, setIsSelected2] = useState(false);
    const [isSelected3, setIsSelected3] = useState(false);

    const [author, setAuthor] = useState('');
    
    const [isSuccess, setIsSuccess] = useState(false);

    const { setBootCodePreview, bootCodePreview } = useContext(BootCodeContext)

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

    const activated = isSelected === true ? '#9390C1' : '#EAE8FB';
    const activated2 = isSelected2 === true ? '#9390C1' : '#EAE8FB';
    const activated3 = isSelected3 === true ? '#9390C1' : '#EAE8FB';
    
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [html, setHtml] = useState('');
    const [css, setCss] = useState('');
    const [javascript, setJavascript] = useState('');

    const [addTag, setAddTag] = useState([]);

    const [tag1, setTag1] = useState(false);
    const [tag2, setTag2] = useState(false);
    const [tag3, setTag3] = useState(false);
    const [tag4, setTag4] = useState(false);
    const [tag5, setTag5] = useState(false);

    const tag1Style = tag1 ? { backgroundColor: '#2B2B2B', color: 'white' } : { backgroundColor: '#9390C1 '} 
    const tag2Style = tag2 ? { backgroundColor: '#2B2B2B', color: 'white' } : { backgroundColor: '#9390C1 '} 
    const tag3Style = tag3 ? { backgroundColor: '#2B2B2B', color: 'white' } : { backgroundColor: '#9390C1 '} 
    const tag4Style = tag4 ? { backgroundColor: '#2B2B2B', color: 'white' } : { backgroundColor: '#9390C1 '} 
    const tag5Style = tag5 ? { backgroundColor: '#2B2B2B', color: 'white' } : { backgroundColor: '#9390C1 '} 

    const handleTag1 = () => {
        setAddTag(prev => [...prev, 'MATERIAL']);
        setTag1(prevState => !prevState);
    };

    const handleTag2 = () => {
        setAddTag(prev => [...prev, 'ELEGENT']);
        setTag2(prevState => !prevState);
    };

    const handleTag3 = () => {
        setAddTag(prev => [...prev, 'FLAT DESIGN']);
        setTag3(prevState => !prevState);
    };

    const handleTag4 = () => {
        setAddTag(prev => [...prev, 'ORIGINAL']);
        setTag4(prevState => !prevState);
    };

    const handleTag5 = () => {
        setAddTag(prev => [...prev, 'MODERN']);
        setTag5(prevState => !prevState);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        setIsSuccess(true);
        const filteredTags = Array.from(new Set(addTag));
        console.log(filteredTags)
        const code = {
            title,
            desc,
            html,
            css,
            javascript,
            tags: filteredTags
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
    };

    const formatBootCode = () => {
        const bootCodeSended = {
            html,
            css, 
            javascript,
        };
        setBootCodePreview(bootCodeSended);
        localStorage.setItem("previewCode", bootCodeSended);
        localStorage.setItem("html", html);
        localStorage.setItem("css", css);
        localStorage.setItem("js", javascript);
    };

    return (
        <div className={styles.container}>
            <Head>
                <title>BootCode</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <Header />
            <h1>Envoi du code</h1>
            {/* <h1 className={styles.titlePage}>HOME</h1> */}
            <div className={styles.back} onClick={Router.back}><p className={styles.backPara}>Retour</p></div>
            
            {isSuccess ? (
                <div className={styles.successUpload}>
                    <p>Félicitation ! Votre BootCode a été publié : <Link href="/profile"><span className={styles.successUploadSpan}>Voir mes récents BootCodes :</span></Link></p>
                    <Confetti />
                </div>
            ) : null}

            <form className={styles.bootcodeContainer} onSubmit={handleSubmit}>
                <div className={styles.bootcodeRender}>
                     {/* <iframe src={`./frame/${data._id}`} title="description" scrolling="no" className={styles.iframe}></iframe> */}
                    {/* <h1 className={styles.desc}>Donnez un nom à votre BootCode</h1> */}
                        <input 
                            type="text" 
                            style={{ height: '2.75rem' }} 
                            className={styles.customInput} 
                            placeholder='Donnez un nom à votre Bootcode'
                            onChange={e => setTitle(e.target.value)}
                        />

                    <iframe style={{ backgroundColor: 'white'}} src={`./communitybootcode/frame/upload_preview`} title="description" scrolling="no" className={styles.iframe}></iframe>

                    {/* <h1 className={styles.desc}>Sélectionnez 3 catégories</h1> */}
                    <div className={styles.cardCategoriesContainer}>
                        {/* <p className={styles.cardCategorie}>NAV</p>
                        <p className={styles.cardCategorie}>FLAT DESIGN</p> */}
                        <p className={styles.cardCategorie} style={tag1Style} onClick={handleTag1}>MATERIAL UI</p>
                        <p className={styles.cardCategorie} style={tag2Style} onClick={handleTag2}>ELEGENT</p>
                        <p className={styles.cardCategorie} style={tag3Style} onClick={handleTag3}>FLAT DESGIN</p>
                        <p className={styles.cardCategorie} style={tag4Style} onClick={handleTag4}>ORIGINAL</p>
                        <p className={styles.cardCategorie} style={tag5Style} onClick={handleTag5}>MODERN</p>
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
                        { isSelected ? <textarea className={styles.snippet} placeholder="Collez votre code HTML" value={html} onChange={e => {setHtml(() => e.target.value);}} onKeyUp={formatBootCode}></textarea>

                        : isSelected2 ? <textarea className={styles.snippet} placeholder="Collez votre code CSS" value={css} onChange={e => {setCss(() => e.target.value);}} onKeyUp={formatBootCode}></textarea>

                        : <textarea className={styles.snippet} placeholder="Collez votre code JavaScript" value={javascript} onChange={e => {setJavascript(() => e.target.value);}} onKeyUp={formatBootCode}></textarea>
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

