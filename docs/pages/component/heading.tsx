import { Heading } from "gearsui";
import { NextPage } from "next";
import Example from "../../components/Example";
import Page from "../../components/Page";

const HeadingPage: NextPage = () => {
  return (
    <Page title="Heading Component">
      <Heading>Heading</Heading>
      <p>
        Headings are used to introduce the next piece of content on a page.
      </p>
      <Example>
        <Heading level={1}>Heading 1</Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
      </Example>
    </Page>
  )
}

export default HeadingPage;