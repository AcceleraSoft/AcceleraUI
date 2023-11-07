import { CSSProperties } from "react";
import { computeCorners } from "./util";
import "./theme.css"
import styles from "./Button.module.css"
import { getBorderRadiusClassName } from "./common";

export interface ButtonInjectedProps {
  
}

export type ButtonProps<T extends React.ElementType = 'button'> = React.ComponentPropsWithoutRef<T> & {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
  as?: T;
}

export function Button<T extends React.ElementType = 'button'>({
  primary,
  secondary,
  top,
  left,
  bottom,
  right,
  as,
  ...props
}: ButtonProps<T>) {
  const Component = as ?? 'button';
  const corners = computeCorners(!!top, !!left, !!bottom, !!right);
  const round = getBorderRadiusClassName(corners);
  const style: CSSProperties = {};
  let className = styles.button + ' ' + round;
  if (primary) {
    className += ' ' + styles.buttonPrimary;
  } else if (secondary) {
    className += ' ' + styles.buttonSecondary;
  } else {
    className += ' ' + styles.buttonDefault;
  }
  return <Component className={className} style={style} {...props} />
}
