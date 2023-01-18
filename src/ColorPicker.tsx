
import styled from "@emotion/styled";
import { useRef, useState } from "react";
import { Color, createHSL, createRGB, getHSL, getRGB } from "./colors";
import { DragEvent, useDrag, useMeasured } from "./hooks";
import { IntegerField } from "./IntegerField";
import Tabs from "./Tabs";

export interface ColorPickerProps {
  value?: string;
}

const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
`

const SliderWrapper = styled.div`
position: relative;
margin: 1em 0;
`

const sliderBarHeight = '1rem';
const sliderHandleHeight = '2rem';

const SliderBar = styled.div`
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
height: ${sliderBarHeight};
border-radius: ${props => `${props.theme.borderRadius * 1.0}em`}
`

const SliderHandle = styled.div`
cursor: pointer;
position: absolute;
top: 0;
left: 0;
font-size: ${sliderHandleHeight};
width: 0.3em;
height: 1em;
border: 0.1em solid black;
transform: translateX(-50%) translateY(calc(-0.5 * (${sliderHandleHeight} - ${sliderBarHeight})));
border-radius: ${props => `${props.theme.borderRadius * 1.0}em`};
`

const Preview = styled.div`
position: relative;
width: 6rem;
height: 6rem;
overflow: hidden;
border-radius: ${props => `${props.theme.borderRadius * 1.0}em`};
margin-right: 1rem;
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

export const ColorPicker: React.FC<ColorPickerProps> = ({ value }) => {

  const sliderBarRef = useRef<HTMLDivElement>(null);
  const [ width, height ] = useMeasured(sliderBarRef)
  const initColor = createHSL(0,1.0,0.5);
  const [color, setColor] = useState<Color>(initColor);
  const [alpha, setAlpha] = useState(1.0);

  const setHSL = (h: number, s: number, l: number) => setColor(createHSL(h, s, l));
  const setRGB = (r: number, g: number, b: number) => setColor(createRGB(r, g, b));

  const [h, s, l] = getHSL(color);
  const x = h * width / 360;

  const { startElementDrag, startAreaDrag } = useDrag({
    areaRef: sliderBarRef,
    onDrag(e: DragEvent) {
      const [x, y] = e.position;
      const h2 = (x / width) * 360;
      setHSL(h2, s, l)
    }
  });

  const tabs = [
    {
      key: 'hsl',
      label: "HSL",
      render: () => (
        <>
          <IntegerField inline label="H" min={0} max={360} value={h} onChange={e => { setHSL(e.value, s, l); }} />
          <SliderWrapper onMouseDown={startAreaDrag}>
            <SliderBar ref={sliderBarRef} />
            <SliderHandle onMouseDown={startElementDrag} style={{ left: `${x}px` }} />
          </SliderWrapper>
          <IntegerField inline label="S" min={0} max={100} value={s * 100} onChange={e => { setHSL(h, e.value / 100, l); }} />
          <IntegerField inline label="L" min={0} max={100} value={l * 100} onChange={e => { setHSL(h, s, e.value / 100); }} />
        </>
      )
    },
    {
      key: 'rgb',
      label: "RGB",
      render: () => {
        const [r, g, b] = getRGB(color);
        return (
          <>
            <IntegerField inline label="R" min={0} max={100} value={r * 100} onChange={e => { setRGB(e.value / 255, g, b); }} />
            <IntegerField inline label="G" min={0} max={100} value={g * 100} onChange={e => { setRGB(r, e.value / 255, b); }} />
            <IntegerField inline label="B" min={0} max={100} value={b * 100} onChange={e => { setRGB(r, g, e.value / 255); }} />
          </>
        );
      }
    },
  ]

  return (
    <Wrapper>
      <div>
        <Preview>
          <PreviewBackground />
          <PreviewColor style={{ backgroundColor: `hsl(${h}, ${s * 100}%, ${l * 100}%, ${alpha})` }} />
        </Preview>
        <IntegerField inline label="A" min={0} max={100} value={alpha * 100} onChange={e => { setAlpha(e.value / 100); }} />
      </div>
      <Tabs elements={tabs} style={{ flex: '1 1 auto' }} />
    </Wrapper>
  );

}
