import styles from '../styles/addcard.module.css';

const Card = ({ _id, creationDate, css, html, javascript, title, tags }) => {

    return (
        <div className={styles.card}>
            <div className={styles.plusContainer}>
                <h1 className={styles.plus}>+</h1>
            </div>
            <h1 className={styles.add}>Ajouter un BootCode</h1>
        </div>
    );
};

export default Card;