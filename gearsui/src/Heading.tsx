import { errorOnce } from "./util";

export interface HeadingInjectedProps {
  children: React.ReactNode;
}

export interface HeadingProps {
  children: React.ReactNode;
  level?: number;
  render?: (props: HeadingInjectedProps) => React.ReactElement;
}

export const Heading: React.FC<HeadingProps> = ({
  render,
  level,
  children
}) => {
  if (!render) {
    let Component: React.ElementType;
    switch (level) {
      case undefined:
      case 1:
        Component = 'h1';
        break;
      case 2:
        Component = 'h1';
        break;
      case 3:
        Component = 'h1';
        break;
      case 4:
        Component = 'h1';
        break;
      default:
        errorOnce(`Invalid level ${level} given to <Heading />. Will render a heading of level 1.`);
        Component = 'h1';
        break;
    }
    render = props => <Component {...props} />;
  }
  return render({
    children,
  });
}

