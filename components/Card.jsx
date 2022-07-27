import styles from '../styles/card.module.css';

const Card = ({ _id, creationDate, css, html, javascript, title, tags, likes }) => {

    return (
        <div className={styles.card}>
            <p className={styles.cardDate}>
                {creationDate ? creationDate.split('')[8] : ''}
                {creationDate ? creationDate.split('')[9] : ''}
                .
                {creationDate ? creationDate.split('')[5] : ''}
                {creationDate ? creationDate.split('')[6] : ''}
                .
                {creationDate ? creationDate.split('')[0] : ''}
                {creationDate ? creationDate.split('')[1] : ''}
                {creationDate ? creationDate.split('')[2] : ''}
                {creationDate ? creationDate.split('')[3] : ''}
            </p>
            <div className={styles.cardFrame}>
                <iframe src={`./communitybootcode/frame/${_id}`} title="description" scrolling="no" className={styles.iframe}></iframe>
            </div>
            <p className={styles.cardDesc}>{title}</p>
            <div className={styles.cardCategoriesContainer}>
                {/* <p className={styles.cardCategorie}>NAV</p>
                <p className={styles.cardCategorie}>FLAT DESIGN</p> */}
                {tags.map(tag => <p className={styles.cardCategorie} key={Math.random()}>{tag.toUpperCase()}</p>)}
            </div>
            <div className={styles.cardCoeur}>
            <img src="/coeur.png" className={styles.coeur}/> 
            {/* <p>{likes && likes.length}</p> */}
            </div>

        </div>
    );
};

export default Card;