import styles from '../styles/contentContainer.module.css';

const ContentContainer = ({ children }) => (
    <div className={styles.contentContainer}>
        {children}
    </div>
);

export default ContentContainer;