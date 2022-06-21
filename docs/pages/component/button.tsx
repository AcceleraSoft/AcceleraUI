
import Page from "../../components/Page"
import Example from "../../components/Example"
import { Button } from "gearsui";
import { css } from "@emotion/react";
import { NextPage } from "next";

const example01Css = css`
display: flex;
flex-wrap: wrap;
justify-content: space-around ;
> * {
  margin: 0.5em;
}
`

const ButtonPage: NextPage = () => {
  return (
    <Page title="Button Component">
      <Example title="Different Flavours">
        <div css={example01Css}>
          <Button primary>Primary</Button>
          <Button secondary>Secondary</Button>
          <Button>Default</Button>
        </div>
      </Example>
    </Page>
  );
}

export default ButtonPage;
