
import styled from "@emotion/styled";
import React, { TableHTMLAttributes, useState } from "react"

const TabContents = styled.div`
padding: 1em;
`

export interface TabElement {
  key: string;
  render: () => React.ReactNode;
  label: React.ReactNode;
}

export interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
  elements: TabElement[];
}

const Labels = styled.div`
display: flex;
background-color: lightgray;
`

const Label = styled.div`
font-weight: bold;
padding: 0.5rem;
cursor: pointer;
`

const ActiveLabel = styled.div`
padding: 0.5rem;
cursor: normal;
background-color: white;
font-weight: normal;
`

const Wrapper = styled.div`
border: 1px solid lightgray;
`

export const Tabs: React.FC<TabsProps> = ({ elements, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const child = elements[activeIndex].render();
  return (
    <Wrapper {...props}>
      <Labels>
        {elements.map((element, i) => i === activeIndex
          ? <ActiveLabel key={element.key}>{element.label}</ActiveLabel>
          : <Label key={element.key} onClick={() => setActiveIndex(i)}>{element.label}</Label>) }
      </Labels>
      <TabContents>{child}</TabContents>
    </Wrapper>
  )
}

export default Tabs;
