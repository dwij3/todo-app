import { useState } from 'react';
import styles from './InputField.module.css';

export default function InputField({onAddTask , onToggleComplete , isTaskEmpty}){
    const [text,setText] = useState('');

    function handleChange(e){
        setText(e.target.value);
        console.log(text);
    }

    function handleKeyDowm(e){
        if(e.key === "Enter"){
            console.log("You pressed Enter:",text);
            onAddTask(text);
            setText("");
        }
    }

    const classOfSelectToggle = ((isTaskEmpty) ? styles.hideElement : styles.showElement)
    return(
        <div className={styles.inputContainer}>
        <div className={`${styles.selectToggle} ${classOfSelectToggle}`} onClick={onToggleComplete}>❯</div>
        <input type="text" value={text} className={`${styles.inputField}`} placeholder='What needs to be done?' 
        onKeyDown={handleKeyDowm} onChange={handleChange}/>
    </div>
    )      
}