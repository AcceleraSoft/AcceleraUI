import { css } from "@emotion/react";
import styled from "@emotion/styled";
import React, { useId } from "react";

const Wrapper = styled.div`
display: flex;
align-items: center;
`

const inputCss = css`
font-size: 1rem;
padding: 0.5rem;
border: 1px solid gray;
border-radius: 0.5em;
outline: none;
`

const labelCss = css`
margin: 0 0.5em;
font-weight: bold;
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
}

export const TextField: React.FC<TextFieldProps> = ({ label, email, password, value, onChange }) => {
  const fieldId = useId();
  let type = 'text';
  if (email) {
    type = 'email';
  } else if (password) {
    type = 'password';
  }
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onChange !== undefined) {
      onChange({ value: e.currentTarget.value });
    }
  }
  return (
    <Wrapper>
      {label && <label htmlFor={fieldId} css={labelCss}>{label}</label>}
      <input id={fieldId} css={inputCss} type={type} onInput={onInput} value={value} />
    </Wrapper>
  );
}
