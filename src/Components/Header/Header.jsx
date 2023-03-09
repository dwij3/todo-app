import styles from './Header.module.css';

const Header = ({title}) => {
  return (
      <h1 className={styles.heading}>{title}</h1>
  );
}

export default Header;