import styled from "@emotion/styled"
import { useRef } from "react";
import { DragEvent, useDrag, useMeasured } from "./hooks";

const handleHeight = '2rem';
const barHeight = '1rem';

const Wrapper = styled.div`
position: relative;
`

const Bar = styled.div`
background-color: lightgray;
border-radius: ${props => `${props.theme.borderRadius * 1.0}em`}
`

const Handle = styled.div`
cursor: pointer;
position: absolute;
top: 0;
left: 0;
border: 0.1em solid black;
border-radius: ${props => `${props.theme.borderRadius * 1.0}em`};
`

export interface SliderChangeEvent {
  value: number;
}

export interface SliderProps {
  size?: string;
  horizontal?: boolean;
  vertical?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onChange?: (e: SliderChangeEvent) => void;
}

export const Slider: React.FC<SliderProps> = ({
  size = '1rem',
  min = 0,
  max = 100,
  step,
  value,
  vertical,
  onChange,
}) => {

  const barRef = useRef<HTMLDivElement>(null);
  const [ width, height ] = useMeasured(barRef)
  const elementSize = vertical ? height : width;
  const offset = elementSize * ((value - min) / max);
  const { startElementDrag, startAreaDrag } = useDrag({
    areaRef: barRef,
    onDrag(e: DragEvent) {
      if (onChange !== undefined) {
        const [x, y] = e.position;
        let newValue = min + ((vertical ? y : x) / elementSize) * (max - min);
        if (step !== undefined) {
          newValue = Math.round(newValue / step) * step
        }
        onChange({ value: newValue });
      }
    }
  });

  const handleSize = `calc(${size} * 2)`;

  const barCss = {} as React.CSSProperties;
  if (vertical) {
    barCss.width = size;
    barCss.minHeight = '2rem';
  } else {
    barCss.height = size;
  }

  const handleCss = {} as React.CSSProperties;
  handleCss.fontSize = handleSize;
  if (vertical) {
    handleCss.height = '0.3em';
    handleCss.width = '1em';
    handleCss.top = `${offset}px`;
    handleCss.transform = `translateY(-50%) translateX(calc(-0.5 * (${handleSize} - ${size})))`;
  } else {
    handleCss.width = '0.3em';
    handleCss.height = '1em';
    handleCss.left = `${offset}px`;
    handleCss.transform = `translateX(-50%) translateY(calc(-0.5 * (${handleSize} - ${size})))`;
  }

  return (
    <Wrapper style={{ margin: `${size} 0` }}>
      <Bar ref={barRef} style={barCss} onMouseDown={startAreaDrag} />
      <Handle style={handleCss} onMouseDown={startElementDrag} />
    </Wrapper>
  );

}

export default Slider;