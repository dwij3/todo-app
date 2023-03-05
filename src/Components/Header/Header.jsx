import styles from './Header.module.css';

export default function Header({heading}) {
  return (
    <div>
      <h1 className={styles.heading}>{heading}</h1>
    </div>
  );
}
