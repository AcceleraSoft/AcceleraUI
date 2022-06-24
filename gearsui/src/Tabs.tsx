
import styled from "@emotion/styled";
import React, { useState } from "react"

export interface TabProps {
  label: React.ReactNode;
  children: React.ReactNode;
}

const TabContents = styled.div`
padding: 1em;
`

export const Tab: React.FC<TabProps> = ({ label, children }) => {
  return <TabContents>{children}</TabContents>;
}

export interface TabsProps {
  children: React.ReactNode;
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

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const child = childrenArray.filter((child, i) => activeIndex === i);
  return (
    <Wrapper>
      <Labels>
        {childrenArray.map((child, i) => i === activeIndex ? <ActiveLabel>{child.props.label}</ActiveLabel> : <Label onClick={() => setActiveIndex(i)}>{child.props.label}</Label>) }
      </Labels>
      {child}
    </Wrapper>
  )
}

export default Tabs;
