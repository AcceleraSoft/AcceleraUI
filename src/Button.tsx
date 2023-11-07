import { CSSProperties } from "react";
import { computeCorners, Corner } from "./util";
import styles from "./Button.module.css"

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

function getThemeParam(name: string): string {
  return getComputedStyle(document.documentElement).getPropertyValue('--' + name);
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
  const style: CSSProperties = {};
  const radius = getThemeParam('border-radius');
  console.log(radius);
  style.borderRadius = `${corners & Corner.TopLeft ? radius : '0'} ${corners & Corner.TopRight ? radius : '0'} ${corners & Corner.BottomRight ? radius : '0'} ${corners & Corner.BottomLeft ? radius : '0'}`;
  let className = styles.button;
  if (primary) {
    className += ' ' + styles.buttonPrimary;
  } else if (secondary) {
    className += ' ' + styles.buttonSecondary;
  } else {
    className += ' ' + styles.buttonDefault;
  }
  return <Component className={className} style={style} {...props} />
}
