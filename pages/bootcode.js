import Head from 'next/head'
import BootCodeComponent from '../components/BootCodeCommponent';
import styles from '../styles/Home.module.css'

const BootCode = () => {

    const yanny = {
        name: 'Funky Button',
        html: `<button class="myButton">Valider</button>`,
        css: `.myButton {
            background-color: royalblue;
            height: 4rem;
            width: 10rem;
            border: none;
            color: wheat;
        }`
    };

    const codepen = {
        name: 'Codepen',
        html: `<nav class="dropdownmenu">
        <ul>
          <li><a href="http://www.jochaho.com/wordpress/">Home</a></li>
          <li><a href="http://www.jochaho.com/wordpress/about-pritesh-badge/">About Me</a></li>
          <li><a href="#">Articles on HTML5 & CSS3</a>
            <ul id="submenu">
              <li><a href="http://www.jochaho.com/wordpress/difference-between-svg-vs-canvas/">Difference between SVG vs. Canvas</a></li>
              <li><a href="http://www.jochaho.com/wordpress/new-features-in-html5/">New features in HTML5</a></li>
              <li><a href="http://www.jochaho.com/wordpress/creating-links-to-sections-within-a-webpage/">Creating links to sections within a webpage</a></li>
            </ul>
          </li>
          <li><a href="http://www.jochaho.com/wordpress/category/news/">News</a></li>
          <li><a href="http://www.jochaho.com/wordpress/about-pritesh-badge/">Contact Us</a></li>
        </ul>
      </nav>`,
      css: `.dropdownmenu ul, .dropdownmenu li {
        margin: 0;
        padding: 0;
    }
    .dropdownmenu ul {
        background: gray;
        list-style: none;
        width: 100%;
    }
    .dropdownmenu li {
        float: left;
        position: relative;
        width:auto;
    }
    .dropdownmenu a {
        background: #30A6E6;
        color: #FFFFFF;
        display: block;
        font: bold 12px/20px sans-serif;
        padding: 10px 25px;
        text-align: center;
        text-decoration: none;
        -webkit-transition: all .25s ease;
        -moz-transition: all .25s ease;
        -ms-transition: all .25s ease;
        -o-transition: all .25s ease;
        transition: all .25s ease;
    }
    .dropdownmenu li:hover a {
        background: #000000;
    }
    #submenu {
        left: 0;
        opacity: 0;
        position: absolute;
        top: 35px;
        visibility: hidden;
        z-index: 1;
    }
    li:hover ul#submenu {
        opacity: 1;
        top: 40px;	/* adjust this as per top nav padding top & bottom comes */
        visibility: visible;
    }
    #submenu li {
        float: none;
        width: 100%;
    }
    #submenu a:hover {
        background: #DF4B05;
    }
    #submenu a {
        background-color:#000000;
    }`
    }

    const rayane = {
        name: 'Super Card',
        html: `<div class="card-container">
        <div class="img"></div>
        <h2 class="name">Rayane</h2>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores eius accusantium ipsum corrupti quia voluptate laudantium dignissimos, labore nobis libero? Doloremque et perferendis iusto in obcaecati sed odit, voluptates ipsum.</p>
    </div>`,
        css: `.card-container {
            display: flex;
            flex-direction: column;
            height: 25rem;
            width: 18rem;
            background-color: thistle;
            justify-content: center;
            align-items: center;
        }
        
        .img {
            background-color: gray;
            height: 5rem;
            width: 5rem;
            border-radius: 50px;
        }
        
        p {
            text-align: center;
        }`
    }

    return (
        <div className={styles.container}>
            <Head>
                <title>BootCode</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            {/* <BootCodeComponent bootcode={yanny}/> */}
            <BootCodeComponent bootcode={codepen}/>
      </div>
    );
};

export default BootCode;