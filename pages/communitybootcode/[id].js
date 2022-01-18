import Header from "../../components/Header";
import styles from '../../styles/bootcodepage.module.css';
import { Prism     as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import cssbeautify from 'cssbeautify';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'
import htmlBeautify from 'html-beautify'

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


    useEffect(() => {
        fetch(`https://bootcodedevlab.herokuapp.com/auth/${data.author}`)
            .then(res => res.json())
            .then(bootcodeAuthor => setAuthor(bootcodeAuthor.username))
    }, []);


    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.back}><p className={styles.backPara}>Retour</p></div>
            <div className={styles.bootcodeContainer}>
                <div className={styles.bootcodeRender}>
                    <p className={styles.date}>01.01.2022</p>
                    <p className={styles.desc}>{data.title} par {author}</p>
                     <iframe src={`./frame/${data._id}`} title="description" scrolling="no" className={styles.iframe}></iframe>
                    <div className={styles.cardCategoriesContainer}>
                        {/* <p className={styles.cardCategorie}>NAV</p>
                        <p className={styles.cardCategorie}>FLAT DESIGN</p> */}
                        {data.tags.map(tag => <p key={Math.random()} className={styles.cardCategorie}>{tag.toUpperCase()}</p>)}
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
                </div>
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

