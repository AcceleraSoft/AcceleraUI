import { css } from "@emotion/react";
import { Theme } from "./theme";

const inputCss = (theme: Theme) => css`
display: block;
margin: 0.5rem 0;
font-size: 1rem;
padding: 0.5rem;
border-radius: ${theme.borderRadius * 0.5}rem;
border: 1px solid ${theme.colors.default.bg00};
`

export interface IntegerFieldProps {
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (e: ChangeEvent) => void;
}

export const IntegerField: React.FC<IntegerFieldProps> = ({
  onChange,
  ...props
}) => {
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    if (onChange !== undefined) {
      onChange({
        value: e.currentTarget.value
      })
    }
  }
  return (
    <input css={inputCss} type="number" {...props} onInput={onInput} />
  )
}