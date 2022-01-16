import styles from '../styles/customInput.module.css';

const CustomInput = ({ placeholder, height }) => <input type="text" placeholder={placeholder.toUpperCase()} style={{ height: height }} className={styles.customInput}/>;

export default CustomInput;