
import { useId } from "react";
import styles from "./IntegerField.module.css"

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

export const IntegerField: React.FC<IntegerFieldProps> = ({
  inline,
  label,
  min,
  max,
  onChange,
  ...props
}) => {
  const id = useId();
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    const value = parseInt(e.currentTarget.value);
    if ((min !== undefined && value < min) || (max !== undefined && value > max)) {
      e.preventDefault();
      return;
    }
    if (onChange !== undefined) {
      onChange({
        value,
      });
    }
  }
  return (
    <div className={inline ? styles.inline : ''}>
      {label && <label className={styles.label} htmlFor={id}>{label}</label>}
      <input id={id} className={styles.input} type="number" {...props} onInput={onInput} />
    </div>
  )
}
