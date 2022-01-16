import Head from 'next/head'
import styles from '../styles/Home.module.css'

const Home = ({ todo }) => {
    // console.log('data :', todo)
    return (
        <div className={styles.container}>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head> 
            <h1>BootCode</h1>
            <h2 className="tets">Les créations de la communauté</h2>
            <iframe src="./bootcode" title="description"></iframe>
            <style jsx>{`
                .tets {
                color: blue;
                }
            `}</style>
      </div>
    );
};

export async function getServerSideProps() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/todos/1`);
    const data = await res.json();
    
    return { props: { todo: data }}
};


export default Home;