
import { ColorPicker, Heading } from "gearsui"
import { NextPage } from "next"
import Example from "../../components/Example";
import Page from "../../components/Page";

const ColorPickerPage: NextPage = () => {
  return (
    <Page title="Color Picker Component">
      <Heading>Color Picker</Heading>
      <p>
        The color picker provides a means for selecting a color using a configurable slider.
      </p>
      <Example title="Default ColorPicker without extra properties">
        <ColorPicker />
      </Example>
    </Page>
  )
}

export default ColorPickerPage;