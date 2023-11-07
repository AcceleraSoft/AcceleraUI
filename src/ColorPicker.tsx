
import { useRef, useState } from "react";
import { Color, createHSL, createRGB, getHSL, getRGB, isHSL, isRGB } from "./colors";
import { DragEvent, useDrag, useMeasured } from "./hooks";
import { IntegerField } from "./IntegerField";
import Tabs from "./Tabs";
import styles from "./ColorPicker.module.css"
import { withEmotionCache } from "@emotion/react";

export interface ColorPickerProps {
  value?: string;
}

// const Wrapper = styled.div`
// display: flex;
// flex-wrap: wrap;
// `

// const SliderWrapper = styled.div`
// position: relative;
// margin: 1em 0;
// `

// const sliderBarHeight = '1rem';
// const sliderHandleHeight = '2rem';

// const SliderBar = styled.div`
// background: linear-gradient(
//   90deg,
//   hsl(0, 100%, 50%),
//   hsl(45, 100%, 50%),
//   hsl(90, 100%, 50%),
//   hsl(135, 100%, 50%),
//   hsl(180, 100%, 50%),
//   hsl(225, 100%, 50%),
//   hsl(270, 100%, 50%),
//   hsl(315, 100%, 50%),
//   hsl(360, 100%, 50%)
// );
// width: 100%;
// height: ${sliderBarHeight};
// border-radius: ${props => `${props.theme.borderRadius * 1.0}em`}
// `

// const SliderHandle = styled.div`
// cursor: pointer;
// position: absolute;
// top: 0;
// left: 0;
// font-size: ${sliderHandleHeight};
// width: 0.3em;
// height: 1em;
// border: 0.1em solid black;
// transform: translateX(-50%) translateY(calc(-0.5 * (${sliderHandleHeight} - ${sliderBarHeight})));
// border-radius: ${props => `${props.theme.borderRadius * 1.0}em`};
// `

// const Preview = styled.div`
// position: relative;
// width: 6rem;
// height: 6rem;
// overflow: hidden;
// border-radius: ${props => `${props.theme.borderRadius * 1.0}em`};
// margin-right: 1rem;
// `

// const PreviewBackground = styled.div`
// position: absolute;
// top: 0;
// left: 0;
// width: 100%;
// height: 100%;
// sackground-image:
//   linear-gradient(45deg, gray 25%, transparent 25%), 
//   linear-gradient(-45deg, gray 25%, transparent 25%),
//   linear-gradient(45deg, transparent 75%, gray 75%),
//   linear-gradient(-45deg, transparent 75%, gray 75%);
// background-size: 2rem 2rem;
// background-position: 0 0, 0 1rem, 1rem -1rem, -1rem 0px;
// `

// const PreviewColor = styled.div`
// position: absolute;
// top: 0;
// left: 0;
// width: 100%;
// height: 100%;
// `

interface HSLFieldProps {
  value: [h: number, s: number, l: number];
  onUpdate?: (value: [h: number, s: number, l: number]) => void;
}

function HSLField({ value: [h, s, l], onUpdate }: HSLFieldProps) {

  const sliderBarRef = useRef<HTMLDivElement>(null);
  const [ width, _height ] = useMeasured(sliderBarRef)

  const x = h * width / 360;

  const setHSL = (h: number, s: number, l: number) => {
    if (onUpdate !== undefined) {
      onUpdate([h, s, l]);
    }
  }

  const { startElementDrag, startAreaDrag } = useDrag({
    areaRef: sliderBarRef,
    onDrag(e: DragEvent) {
      const [x, _y] = e.position;
      const h2 = (x / width) * 360;
      setHSL(h2, s, l)
    }
  });

  return (
    <>
      <IntegerField inline label="H" min={0} max={360} value={h} onChange={e => { setHSL(e.value, s, l); }} />
      <div className={styles.sliderWrapper} onMouseDown={startAreaDrag}>
        <div className={styles.sliderBar} ref={sliderBarRef} />
        <div className={styles.sliderHandle} onMouseDown={startElementDrag} style={{ left: `${x}px` }} />
      </div>
      <IntegerField inline label="S" min={0} max={100} value={s * 100} onChange={e => { setHSL(h, e.value / 100, l); }} />
      <IntegerField inline label="L" min={0} max={100} value={l * 100} onChange={e => { setHSL(h, s, e.value / 100); }} />
    </>
  );
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ value }) => {

  const initColor = createHSL(0,1.0,0.5);
  const [color, setColor] = useState<Color>(initColor);
  const [alpha, setAlpha] = useState(1.0);

  const setHSL = (h: number, s: number, l: number) => setColor(createHSL(h, s, l));
  const setRGB = (r: number, g: number, b: number) => setColor(createRGB(r, g, b));

  const tabs = [
    {
      key: 'hsl',
      label: "HSL",
      render: () => <HSLField value={getHSL(color)} onUpdate={([h,s,l]) => setHSL(h, s, l)} />
    },
    {
      key: 'rgb',
      label: "RGB",
      render: () => {
        const [r, g, b] = getRGB(color);
        return (
          <>
            <IntegerField inline label="R" min={0} max={255} value={r * 255} onChange={e => { setRGB(e.value / 255, g, b); }} />
            <IntegerField inline label="G" min={0} max={255} value={g * 255} onChange={e => { setRGB(r, e.value / 255, b); }} />
            <IntegerField inline label="B" min={0} max={255} value={b * 255} onChange={e => { setRGB(r, g, e.value / 255); }} />
          </>
        );
      }
    },
  ]

  let cssColor;
  if (isHSL(color)) {
    const [h,s,l] = getHSL(color);
    cssColor = `hsl(${h}, ${s * 100}%, ${l * 100}%, ${alpha})`;
  } else if (isRGB(color)) {
    const [r, g, b] = getRGB(color);
    cssColor = `rgb(${r * 255}, ${g * 255}, ${b * 255})`;
  }

  return (
    <div className={styles.wrapper}>
      <div>
        <div className={styles.preview}>
          <div className={styles.previewBackground} />
          <div className={styles.previewColor} style={{ backgroundColor: cssColor }} />
        </div>
        <IntegerField inline label="A" min={0} max={100} value={alpha * 100} onChange={e => { setAlpha(e.value / 100); }} />
      </div>
      <Tabs elements={tabs} style={{ flex: '1 1 auto' }} />
    </div>
  );

}
