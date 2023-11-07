import React, { CSSProperties, useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "./TextField.module.css"
import { computeCorners } from "./util";
import { getBorderRadiusClassName } from "./common";

export interface TextFieldChangeEvent {
  value: string;
}

export interface TextFieldProps {
  value?: string;
  label?: React.ReactNode;
  email?: boolean;
  password?: boolean;
  placeholder?: string;
  onChange?: (e: TextFieldChangeEvent) => void;
  error?: React.ReactNode;
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  email,
  password,
  value,
  onChange,
  placeholder,
  error,
  top = false,
  left = false,
  bottom = false,
  right = false
}) => {

  const corners = computeCorners(top, left, bottom, right);
  const rounded = getBorderRadiusClassName(corners);

  const fieldId = useId();

  const [passwordVisible, setPasswordVisible] = useState(false);

  let type = 'text';
  if (email) {
    type = 'email';
  } else if (password) {
    type = passwordVisible ? 'text' : 'password';
  }

  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onChange !== undefined) {
      onChange({ value: e.currentTarget.value });
    }
  }

  const inputStyle = {} as CSSProperties;
  if (error) {
    inputStyle.borderColor = 'red';
  }


  return (
    <>
      {false}
      {label && <label key="label" className={styles.label} htmlFor={fieldId}>{label}</label>}
      <div className={styles.wrapper}>
        <input key="input" id={fieldId} placeholder={placeholder} className={styles.input + ' ' + rounded} style={inputStyle} type={type} onInput={onInput} value={value} />
        {password && <FontAwesomeIcon key="toggle" className={styles.toggle} icon={passwordVisible ? faEyeSlash : faEye} onClick={() => setPasswordVisible(v => !v)} />}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
}
