import {inputTypeType} from "@/utils/inputType.type";
import styles from "../app/login/page.module.css";
import React from "react";

const InputGroup = (
    {
        title,
        id,
        inputType,
        onChange,
        value,
    }: {
        title: string,
        id: string,
        inputType: inputTypeType,
        onChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
        value: string
    }) => {
    return <div className={styles.inputGroupCt}>
        <input
            type={inputType}
            className={styles.inputGroup}
            id={id}
            name={id}
            value={value}
            onChange={onChange}
            placeholder=""
        />
        <label htmlFor={id} className={styles.inputGroupLabel}>{title}</label>
    </div>
}

export default InputGroup;