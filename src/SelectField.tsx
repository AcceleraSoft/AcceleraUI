import styled from "@emotion/styled";
import React, { useState } from "react";
import { TextField } from "./TextField";

export interface SelectFieldChangeEvent {
  value: Choice | null;
}

export interface Choice {
  key: string;
}

export interface DataSource<T> {
  getAll(): Promise<T[]>;
  filter(query: string): Promise<T[]>;
}

export interface SelectFieldProps {
  value: Choice | null;
  data: DataSource<Choice>,
  renderChoice: (element: Choice) => React.ReactNode;
  onChange?: (e: SelectFieldChangeEvent) => void;
}

const Result = styled.div`
background-color: lightblue;
cursor: pointer;
`

const Wrapper = styled.div`
`

const Choices = styled.div`

`

const Choice = styled.div`

`

export const SelectField: React.FC<SelectFieldProps> = ({
  data,
  value,
  onChange,
  renderChoice,
}) => {
  const [choices, setChoices] = useState<Choice[]>([]);
  const triggerChange = (newValue: Choice | null) => {
    if (onChange !== undefined) {
      onChange({ value: newValue });
    }
  }
  const updateFilter = async (str: string) => {
    setChoices(await data.filter(str));
  }
  if (value !== null) {
    return (
      <Result onClick={() => triggerChange(null)}>
        {renderChoice(value)}
      </Result>
    );
  }
  return (
    <Wrapper>
      <TextField onChange={e => updateFilter(e.value)} />
      <Choices>
        {choices.map(choice => <Choice onClick={() => triggerChange(choice)}>{renderChoice(choice)}</Choice>)}
      </Choices>
    </Wrapper>
  );
}

