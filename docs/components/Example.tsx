import styled from "@emotion/styled";

const Wrapper = styled.div`
padding: 1em;
border: 1px solid ${props => props.theme.colors.default.bg00};
`

const Title = styled.h4`
font-weight: bold;
font-size: 1em;
padding: 0.5em;
margin: 0;
background-color: ${props => props.theme.colors.default.bg00};
`

export interface ExampleProps {
  title?: string;
  children: React.ReactNode;
}

export const Example = ({ title, children }: ExampleProps) => {
  return (
    <>
      {title && <Title>{title}</Title>}
      <Wrapper>
        {children}
      </Wrapper>
    </>
  );
}

export default Example;