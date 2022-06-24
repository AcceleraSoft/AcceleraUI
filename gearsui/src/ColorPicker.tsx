
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { DragEvent, useDrag, useMeasured } from "./hooks";
import { IntegerField } from "./IntegerField";

export interface ColorPickerProps {
  value?: string;
}

const Wrapper = styled.div`
position: relative;
margin: 1em 0;
`

const vbarHeight = '1rem';
const sliderHeight = '2rem';

const VBar = styled.canvas`
background: linear-gradient(
  90deg,
  hsl(0, 100%, 50%),
  hsl(45, 100%, 50%),
  hsl(90, 100%, 50%),
  hsl(135, 100%, 50%),
  hsl(180, 100%, 50%),
  hsl(225, 100%, 50%),
  hsl(270, 100%, 50%),
  hsl(315, 100%, 50%),
  hsl(360, 100%, 50%)
);
width: 100%;
height: ${vbarHeight};
border-radius: ${props => `${props.theme.borderRadius * 1.0}em`}
`

const Slider = styled.div`
cursor: pointer;
position: absolute;
top: 0;
left: 0;
font-size: ${sliderHeight};
width: 0.3em;
height: 1em;
border: 0.1em solid black;
transform: translateX(-50%) translateY(calc(-0.5 * (${sliderHeight} - ${vbarHeight})));
border-radius: ${props => `${props.theme.borderRadius * 1.0}em`};
`

const GRADIENTS: RGB[] = [
  [0xFF, 0, 0],
  [0xFF, 0xFF, 0],
  [0, 0xFF, 0],
  [0, 0xFF, 0xFF],
  [0, 0, 0xFF],
  [0xFF, 0, 0xFF],
  [0xFF, 0, 0],
]

const Preview = styled.div`
position: relative;
width: 6rem;
height: 6rem;
overflow: hidden;
border-radius: ${props => `${props.theme.borderRadius * 1.0}em`};
`

const PreviewBackground = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background-image:
  linear-gradient(45deg, gray 25%, transparent 25%), 
  linear-gradient(-45deg, gray 25%, transparent 25%),
  linear-gradient(45deg, transparent 75%, gray 75%),
  linear-gradient(-45deg, transparent 75%, gray 75%);
background-size: 2rem 2rem;
background-position: 0 0, 0 1rem, 1rem -1rem, -1rem 0px;
`

const PreviewColor = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
`

type RGB = [number, number, number];
type HSL = [number, number, number, number];

export const ColorPicker: React.FC<ColorPickerProps> = ({ value }) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ width, height ] = useMeasured(canvasRef);
  const [color, setColor] = useState<HSL>([0,1.0,0.5,1.0]);
  const [h, s, l, a] = color;
  const x = h * width / 360;
  const { startElementDrag, startAreaDrag } = useDrag({
    areaRef: canvasRef,
    onDrag(e: DragEvent) {
      const [x, y] = e.position;
      const h2 = (x / width) * 360;
      setColor([h2, s, l, a])
    }
  });

  return (
    <>
      <Wrapper onMouseDown={startAreaDrag}>
        <VBar ref={canvasRef} />
        <Slider onMouseDown={startElementDrag} style={{ left: `${x}px` }} />
      </Wrapper>
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
        <Preview>
          <PreviewBackground />
          <PreviewColor style={{ backgroundColor: `hsl(${h}, ${s * 100}%, ${l * 100}%, ${a})`, marginRight: '1em' }} />
        </Preview>
        <div style={{ flex: '1 1 auto' }}>
          <IntegerField inline label="H" min={0} max={360} value={h} onChange={e => { setColor([e.value, s, l, a]); }} />
          <IntegerField inline label="S" min={0} max={100} value={s * 100} onChange={e => { setColor([h, e.value / 100, l, a]); }} />
          <IntegerField inline label="L" min={0} max={100} value={l * 100} onChange={e => { setColor([h, s, e.value / 100, a]); }} />
          <IntegerField inline label="A" min={0} max={100} value={a * 100} onChange={e => { setColor([h, s, l, e.value / 100]); }} />
        </div>
      </div>
    </>
  );

}
