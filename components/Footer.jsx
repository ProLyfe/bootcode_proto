import Link from 'next/link';
import styles from '../styles/footer.module.css';

const Footer = () => (
    <footer className={styles.footer}>BootCode Team 16 | <Link href="/contact"><span className={styles.footerContact}>Contactez-nous</span></Link></footer>
);

export default Footer;