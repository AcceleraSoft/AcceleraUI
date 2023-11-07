
import { faLaughWink } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useId, useRef } from "react";
import { useEventListener } from "./hooks";
import styles from "./IntegerField.module.css"

export interface ChangeEvent {
  value: number;
}

export interface IntegerFieldProps {
  label?: React.ReactNode;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  inline?: boolean;
  onUpdate?: (value: number, e?: Event) => void;
}

const wheelSensitivity = 0.02;

export function IntegerField({
  inline,
  label,
  value,
  min,
  max,
  step,
  onUpdate,
  ...props
}: IntegerFieldProps) {
  const id = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const focusedRef = useRef(false);
  const validate = (value: number, clamp = true): number | false => {
    if (isNaN(value)) {
      return false;
    }
    if (min !== undefined && value < min) {
      if (!clamp) {
        return false;
      }
      value = min;
    }
    if (max !== undefined && value > max) {
      if (!clamp) {
        return false;
      }
      value = max;
    }
    return value;
  }
  const setValue = (newValue: number, clamp = true) => {
    const result = validate(newValue, clamp);
    if (result === false) {
      return;
    }
    console.log(result);
    onUpdate?.(result);
  }
  const onInput = (e: React.FormEvent<HTMLInputElement>) => {
    let newValue;
    if (e.currentTarget.value === '') {
      newValue = min ?? 0;
    } else {
      newValue = parseInt(e.currentTarget.value);
    }
    setValue(newValue, false);
  }
  useEventListener('wheel', (e: Event) => {
    if (!focusedRef.current) {
      return;
    }
    e.preventDefault();
    setValue(Math.round(value + (step ?? 1) * -(e as WheelEvent).deltaY * wheelSensitivity), false);
  }, inputRef, { passive: false });
  return (
    <div className={inline ? styles.inline : styles.block}>
      {label && <label className={styles.label} htmlFor={id}>{label}</label>}
      <input
        ref={inputRef}
        id={id}
        className={styles.input}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        size={1}
        value={value}
        onFocus={() => focusedRef.current = true}
        onBlur={() => focusedRef.current = false}
        {...props}
        onInput={onInput} />
    </div>
  )
}
