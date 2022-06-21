
import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { convertRGBToCSS, parseRGBNumber, RGB_MAX, RGB_MIN } from "./colors";
import { useDrag, useMeasured } from "./hooks";
import { clamp } from "./util";

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
width: 100%;
min-height: ${vbarHeight};
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

const GRADIENTS = [
  [0xFF, 0, 0],
  [0xFF, 0xFF, 0],
  [0, 0xFF, 0],
  [0, 0xFF, 0xFF],
  [0, 0, 0xFF],
  [0xFF, 0, 0xFF],
  [0xFF, 0, 0],
]

const Preview = styled.div`
width: 6rem;
height: 6rem;
border-radius: ${props => `${props.theme.borderRadius * 1.0}em`};
`

function renderColors(canvas: HTMLCanvasElement, width: number, height: number) {
  const ctx = canvas.getContext('2d')!;
  const step = width / (GRADIENTS.length-1);
  for (let i = 0; i < GRADIENTS.length-1; i++) {
    const start = GRADIENTS[i];
    const end = GRADIENTS[i+1];
    const grad = ctx.createLinearGradient(i * step, 0, step * (i+1), 0)
    grad.addColorStop(0, `rgb(${start[0]}, ${start[1]}, ${start[2]})`);
    grad.addColorStop(1, `rgb(${end[0]}, ${end[1]}, ${end[2]})`);
    ctx.fillStyle = grad;
    ctx.fillRect(i * step, 0, step * (i+1), height);
  }
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value }) => {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ width, height ] = useMeasured(canvasRef);
  const { startDrag, position: [x, y] } = useDrag({ ref: canvasRef })

  let color;
  if (width > 0) {
    const i = Math.floor((x / (width+1)) * (GRADIENTS.length-1));
    console.log(i);
    const start = GRADIENTS[i];
    const end = GRADIENTS[i+1];
    const step = width / (GRADIENTS.length-1);
    const k = (x - (i * step)) / step;
    console.log(k)
    const r = Math.round(start[0] + (end[0] - start[0]) * k);
    const g = Math.round(start[1] + (end[1] - start[1]) * k);
    const b = Math.round(start[2] + (end[2] - start[2]) * k);
    color = `rgb(${r}, ${g}, ${b})`;
    console.log(color)
  }

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }
    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    renderColors(canvas, width, height);
  }, [ canvasRef.current, width, height ]);

  return (
    <>
      <Wrapper onMouseDown={startDrag}>
        <VBar ref={canvasRef} />
        <Slider style={{ left: `${x}px` }} />
      </Wrapper>
      <Preview style={{ backgroundColor: color }} />
    </>
  );
}
