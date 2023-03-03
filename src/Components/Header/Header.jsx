import styles from './Header.module.css';

export default function Header(){
    return(
        <div>
            <h1 className={styles.heading}>todos</h1>
        </div>
    )
}