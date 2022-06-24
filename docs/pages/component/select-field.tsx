import { NextPage } from "next";
import { useState } from "react";
import { SelectField } from "gearsui"
import Example from "../../components/Example";
import Page from "../../components/Page";

const Example01 = () => {
  const [value, setValue] = useState(null);
  return (
    <Example>
      <SelectField value={value} data={['Salmon', 'Cat', 'Dog', 'Eagle']} />
    </Example>
  );
}

const SelectFieldPage: NextPage = () => {
  return (
    <Page title="Select Field Component">
      <Example01 />
    </Page>
  );
}

export default SelectFieldPage;
