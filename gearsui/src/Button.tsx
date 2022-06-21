import { css, CSSObject, Theme, useTheme } from "@emotion/react";
import { computeCorners, Corner } from "./util";

export interface ButtonInjectedProps {
  
}

export interface ButtonProps {
  children: React.ReactNode;
  primary?: boolean;
  secondary?: boolean;
  top?: boolean;
  left?: boolean;
  bottom?: boolean;
  right?: boolean;
  render?: (props: ButtonInjectedProps) => React.ReactElement;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  primary,
  secondary,
  top,
  left,
  bottom,
  right,
  render = props => <button {...props} />,
}) => {
  const theme = useTheme();
  const corners = computeCorners(!!top, !!left, !!bottom, !!right);
  const radius = `${theme.borderRadius * 0.5}em`;
  const cssProps: CSSObject = {
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '1rem',
    padding: `${theme.padding * 0.5}em`,
    borderRadius: [
      corners & Corner.TopLeft ? radius : '0',
      corners & Corner.TopRight ? radius : '0',
      corners & Corner.BottomRight ? radius : '0',
      corners & Corner.BottomLeft ? radius : '0',
    ].join(' '),
    border: '1px solid transparent',
  }
  let colors;
  if (primary) {
    colors = theme.colors.primary;
  } else if (secondary) {
    colors = theme.colors.secondary;
  } else {
    colors = theme.colors.default;
  }
  cssProps.backgroundColor = colors.bg00;
  cssProps.color = colors.fg00;
  cssProps['&:focus'] = {
    border: '1px solid lightblue'
  }
  cssProps['&:hover'] = {
    backgroundColor: colors.bg20,
    color: colors.fg00,
  }
  cssProps['&:active'] = {
    backgroundColor: colors.bg10,
    color: colors.fg00,
  }
  return render({
    css: cssProps, 
    children,
  });
}

