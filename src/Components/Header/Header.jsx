import styles from './Header.module.css';

export default function Header({heading}) {
  return (
      <h1 className={styles.heading}>{heading}</h1>
  );
}
