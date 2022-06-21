
import { ColorPicker } from "gearsui"
import { NextPage } from "next"
import Example from "../../components/Example";
import Page from "../../components/Page";

const ColorPickerPage: NextPage = () => {
  return (
    <Page title="Color Picker Component">
      <Example title="Default ColorPicker without extra properties">
        <ColorPicker />
      </Example>
    </Page>
  )
}

export default ColorPickerPage;