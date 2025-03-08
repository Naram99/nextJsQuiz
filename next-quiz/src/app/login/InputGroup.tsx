import {inputType} from "@/utils/inputType";
import styles from "./page.module.css";
import React from "react";

const InputGroup = ({title, id, inputType, onChange}: {title: string, id: string, inputType: inputType, onChange: (e: React.ChangeEvent<HTMLInputElement>) => void}) => {
    return <div className={styles.inputGroupCt}>
        <input type={inputType} className={styles.inputGroup} id={id} name={id} onChange={onChange} />
        <label htmlFor={id} className={styles.inputGroupLabel}>{title}</label>
    </div>
}

export default InputGroup;