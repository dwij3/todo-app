import styles from './Footer.module.css';

const Footer = () =>{

    return(
        <div className={styles.Footer}>
            <p>Double-click to edit a todo</p>
            <p>Written By <span className={styles.createrName}>Dwij </span></p>
            <p>Learning Project</p>
        </div>
    )
}

export default Footer;