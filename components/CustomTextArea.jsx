import styles from '../styles/customTextArea.module.css';

const CustomTextArea = ({ placeholder, height }) => 
    <textarea 
    type="text" 
    placeholder={placeholder.toUpperCase()} 
    style={{ height: height }} 
    className={styles.customTextArea}>
    </textarea>

export default CustomTextArea;