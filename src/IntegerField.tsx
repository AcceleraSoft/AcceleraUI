import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { useId } from "react";
import { Theme } from "./theme";

const inputCss = (theme: Theme) => css`
display: block;
margin: 0.5rem 0;
font-size: 1rem;
padding: 0.5rem;
border-radius: ${theme.borderRadius * 0.5}rem;
border: 1px solid ${theme.colors.default.bg00};
`

export interface ChangeEvent {
  value: number;
}

export interface IntegerFieldProps {
  label?: React.ReactNode;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  inline?: boolean;
  onChange?: (e: ChangeEvent) => void;
}

const inlineCss = css`
display: flex;
flex-wrap: wrap;
align-items: center;
`

const Label = styled.label`
font-weight: bold;
padding: 0.5rem;
`

export const IntegerField: React.FC<IntegerFieldProps> = ({
  inline,
  label,
  onChange,
  ...props
}) => {
  const id = useId();
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onChange !== undefined) {
      onChange({
        value: parseInt(e.currentTarget.value)
      });
    }
  }
  return (
    <div css={inline ? inlineCss : []}>
      {label && <Label htmlFor={id}>{label}</Label>}
      <input id={id} css={inputCss} type="number" {...props} onInput={onInput} />
    </div>
  )
}