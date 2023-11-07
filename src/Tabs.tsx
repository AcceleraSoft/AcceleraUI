
import React, { useState } from "react"
import styles from "./Tabs.module.css"

export interface TabElement {
  key: string;
  render: () => React.ReactNode;
  label: React.ReactNode;
}

export interface TabsProps extends React.ComponentPropsWithoutRef<'div'> {
  elements: TabElement[];
}

export const Tabs: React.FC<TabsProps> = ({ elements, ...props }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const child = elements[activeIndex].render();
  return (
    <div {...props} className={styles.wrapper}>
      <div className={styles.labels}>
        {elements.map((element, i) => i === activeIndex
          ? <div key={element.key} className={styles.activeLabel}>{element.label}</div>
          : <div key={element.key} className={styles.label} onClick={() => setActiveIndex(i)}>{element.label}</div>) }
      </div>
      <div className={styles.tabContents}>{child}</div>
    </div>
  )
}

export default Tabs;
