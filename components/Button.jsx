import styles from '../styles/button.module.css';

const Button = ({ title }) => <button className={styles.myButton}>{title.toUpperCase()}</button>

export default Button;