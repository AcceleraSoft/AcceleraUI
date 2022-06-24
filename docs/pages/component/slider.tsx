import styled from "@emotion/styled";
import { Heading, Slider } from "gearsui";
import { NextPage } from "next";
import { useState } from "react";
import Example from "../../components/Example";
import Page from "../../components/Page";

const Result = styled.div`
text-align: center;
` 

const ExampleBasic = () => {
  const [value1, setValue1 ] = useState(0);
  const [value2, setValue2 ] = useState(0);
  const [value3, setValue3 ] = useState(0);
  return (
    <Example title="Sliders with different steps">
      <Slider value={value1} onChange={e => setValue1(e.value)} />
      <Result>{value1.toString()}</Result>
      <Slider value={value2} onChange={e => setValue2(e.value)} step={5} />
      <Result>{value2.toString()}</Result>
      <Slider value={value3} onChange={e => setValue3(e.value)} step={0.1} />
      <Result>{value3.toFixed(2).toString()}</Result>
    </Example>
  )
}

const ExampleVertical = () => {
  const [value, setValue] = useState(0);
  return (
    <Example title="Vertical slider">
      <Slider vertical value={value} onChange={e => setValue(e.value)} />
      <Result>{value}</Result>
    </Example>
  )
}


const SliderPage: NextPage = () => {
  return (
    <Page title="Slider Component">
      <Heading>Slider</Heading>
      <ExampleBasic />
      <ExampleVertical />
    </Page>
  )
}

export default SliderPage;
