
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
`

const Label = styled.div`
font-weight: bold;
padding: 0.5rem;
cursor: pointer;
`

const Wrapper = styled.div`
border: 1px solid gray;
`

export const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const childrenArray = React.Children.toArray(children);
  const child = childrenArray.filter((child, i) => activeIndex === i);
  return (
    <Wrapper>
      <Labels>
        {childrenArray.map((child, i) => <Label onClick={() => setActiveIndex(i)}>{child.props.label}</Label>) }
      </Labels>
      {child}
    </Wrapper>
  )
}

export default Tabs;
