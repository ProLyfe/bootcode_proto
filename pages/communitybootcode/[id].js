import Header from "../../components/Header";
import styles from '../../styles/bootcodepage.module.css';
import { Prism     as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import cssbeautify from 'cssbeautify';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import htmlBeautify from 'html-beautify'
import Router from 'next/router';
import jwt from 'jsonwebtoken';
import Button from "../../components/Button";

const BootCodeDetails = ({ data }) => {
    
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

    const [decryptedTokenId, setDecryptedTokenId] = useState();

    useEffect(() => {
        const token = window.localStorage.getItem('user');
        const decryptedToken = token ? jwt.decode(token) : 'rien';
        setDecryptedTokenId(decryptedToken._id);
    
        fetch(`https://bootcodedevlab.herokuapp.com/auth/${data.author}`)
            .then(res => res.json())
            .then(bootcodeAuthor => setAuthor(bootcodeAuthor.username))
    }, []);

    // const token = window.localStorage.getItem('user');
    // const decryptedToken = token ? jwt.decode(token) : 'rien';
    // const decryptedTokenId = decryptedToken._id

    const handleLike = (tokenId) => {
        fetch(`https://bootcodedevlab.herokuapp.com/publication/${tokenId}/${data._id}/like`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => location.reload());
    };

    const handleUnLike = (tokenId) => {
        fetch(`https://bootcodedevlab.herokuapp.com/publication/${tokenId}/${data._id}/unlike`, {
            method: 'DELETE',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(() => location.reload());
    }

    const [bootCodeComment, setBootCodeComment] = useState('');

    const handleComments = (message, tokenId) => {
        fetch(`https://bootcodedevlab.herokuapp.com/comment/${tokenId}/${data._id}/post`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message }),
        }).then(() => console.log('comment send')).catch(err => console.log(err));
    };

    console.log('DATA :', data);
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.back} onClick={Router.back}><p className={styles.backPara}>Retour</p></div>
            <div className={styles.bootcodeContainer}>
                <div className={styles.bootcodeRender}>
                    <p className={styles.date}>
                        {/* 01.01.2022 */}
                        {data.creationDate ? data.creationDate.split('')[8] : ''}
                        {data.creationDate ? data.creationDate.split('')[9] : ''}
                        .
                        {data.creationDate ? data.creationDate.split('')[5] : ''}
                        {data.creationDate ? data.creationDate.split('')[6] : ''}
                        .
                        {data.creationDate ? data.creationDate.split('')[0] : ''}
                        {data.creationDate ? data.creationDate.split('')[1] : ''}
                        {data.creationDate ? data.creationDate.split('')[2] : ''}
                        {data.creationDate ? data.creationDate.split('')[3] : ''}
                    </p>
                    <p className={styles.desc}>{data.title} par {author}</p>
                     <iframe style={{ backgroundColor: 'white'}} src={`./frame/${data._id}`} title="description" scrolling="no" className={styles.iframe}></iframe>
                    <div className={styles.cardCategoriesContainer}>
                        {/* <p className={styles.cardCategorie}>NAV</p>
                        <p className={styles.cardCategorie}>FLAT DESIGN</p> */}
                        <div className={styles.tagContainer}>
                            {data.tags.map(tag => <p key={Math.random()} className={styles.cardCategorie}>{tag.toUpperCase()}</p>)}
                        </div>
                        
                        <div className={styles.coeurContainer}>
                            {
                                data.likes.includes(decryptedTokenId) ? 
                                <button className={styles.coeurButton} onClick={() => handleUnLike(decryptedTokenId)}><img src="/coeur.png" className={styles.coeur}/></button>  :
                                <button className={styles.coeurButton} onClick={() => handleLike(decryptedTokenId)}><img src="/coeurvide.png" className={styles.coeur}/></button>
                            }
                        </div>
                    </div>
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
                        { isSelected ? <SyntaxHighlighter 
                            className={styles.snippet}
                            language="html" 
                            style={darcula}
                            wrapLines={true}
                            showLineNumbers={true}
                            lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-line'}}}   
                        >
                            {htmlBeautify(data.html)}
                        </SyntaxHighlighter> 
                        // console.log(prettify(html));

                        : 

                        isSelected2 ? 
                        
                        <SyntaxHighlighter 
                            className={styles.snippet}
                            language="css" 
                            style={darcula}
                            wrapLines={true}
                            showLineNumbers={true}
                            lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-line'}}}   
                        >
                            {cssbeautify(data.css, {
                            indent: '  ',
                            openbrace: 'separate-line',
                            autosemicolon: true })}
                        </SyntaxHighlighter>

                        : 

                        <SyntaxHighlighter 
                            className={styles.snippet}
                            language="css" 
                            style={darcula}
                            wrapLines={true}
                            showLineNumbers={true}
                            lineProps={{style: {wordBreak: 'break-all', whiteSpace: 'pre-line'}}}   
                        >
                            {cssbeautify(data.javascript, {
                            indent: '  ',
                            openbrace: 'separate-line',
                            autosemicolon: true })}
                        </SyntaxHighlighter>


}
                    </div>
                    <ul className={styles.commentsListContainer}>
                        {data.comment.map((singleComment, index) => (
                            <li className={styles.singleComment} key={index}>{singleComment.author.username} | {singleComment.message}</li>
                        ))}
                    </ul>
                </div>
            </div>
            
            <div className={styles.bootcodeContainer2}>
                <textarea className={styles.commentTextArea} placeholder="Envoyer un commentaire" onChange={e => setBootCodeComment(e.target.value)}></textarea>
                <button className={styles.commentButton} onClick={() => handleComments(bootCodeComment, decryptedTokenId)}>Envoyer</button>
            </div>
        </div>
    );
};

export default BootCodeDetails;

export async function getServerSideProps(context) {
    const { params } = context;
    const { id } = params;

    const res = await fetch(`https://bootcodedevlab.herokuapp.com/publication/${id}`);
    const data = await res.json();
    // console.log('single data :', data)
 
    return {
        props: {
            data: data
        }
    };
};

