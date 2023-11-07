import { css, withEmotionCache } from "@emotion/react";
import React, { CSSProperties, useId, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

import styles from "./TextField.module.css"
import { useTheme } from "./theme"
import { computeCorners, Corner } from "./util";

const inputCss = css`
`

export interface TextFieldChangeEvent {
  value: string;
}

export interface TextFieldProps {
  value?: string;
  label?: React.ReactNode;
  email?: boolean;
  password?: boolean;
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
  error,
  top = false,
  left = false,
  bottom = false,
  right = false
}) => {

  let corners = computeCorners(top, left, bottom, right);

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

  const theme = useTheme();

  const inputStyle = {} as CSSProperties;
  const radius = `${theme.borderRadius * 0.5}rem`;
  inputStyle.borderRadius = `${corners & Corner.TopLeft ? radius : '0'} ${corners & Corner.TopRight ? radius : '0'} ${corners & Corner.BottomRight ? radius : '0'} ${corners & Corner.BottomLeft ? radius : '0'}`;
  if (error) {
    inputStyle.borderColor = 'red';
  }


  return (
    <>
      {false}
      {label && <label key="label" className={styles.label} htmlFor={fieldId}>{label}</label>}
      <div className={styles.wrapper}>
        <input key="input" id={fieldId} className={styles.input} style={inputStyle} type={type} onInput={onInput} value={value} />
        {password && <FontAwesomeIcon key="toggle" className={styles.toggle} icon={passwordVisible ? faEyeSlash : faEye} onClick={() => setPasswordVisible(v => !v)} />}
      </div>
      {error && <div className={styles.error}>{error}</div>}
    </>
  );
}
