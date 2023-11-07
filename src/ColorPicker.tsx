
import { useRef, useState } from "react";
import { Color, createHSL, createRGB, getHSL, getRGB, isHSL, isRGB } from "./colors";
import { DragEvent, useDrag, useMeasured } from "./hooks";
import { IntegerField } from "./IntegerField";
import Tabs from "./Tabs";
import styles from "./ColorPicker.module.css"

export interface ColorPickerProps {
  value?: string;
  onUpdate?: (color: Color) => void;
}

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
      <IntegerField inline label="H" min={0} max={360} value={h} onUpdate={value => { setHSL(value, s, l); }} />
      <div className={styles.sliderWrapper} onMouseDown={startAreaDrag}>
        <div className={styles.sliderBar} ref={sliderBarRef} />
        <div className={styles.sliderHandle} onMouseDown={startElementDrag} style={{ left: `${x}px` }} />
      </div>
      <IntegerField inline label="S" min={0} max={100} value={s * 100} onUpdate={value => { setHSL(h, value / 100, l); }} />
      <IntegerField inline label="L" min={0} max={100} value={l * 100} onUpdate={value => { setHSL(h, s, value / 100); }} />
    </>
  );
}

export function ColorPicker({ value, onUpdate }: ColorPickerProps) {

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
            <IntegerField inline label="R" min={0} max={255} value={r * 255} onUpdate={value => { setRGB(value / 255, g, b); }} />
            <IntegerField inline label="G" min={0} max={255} value={g * 255} onUpdate={value => { setRGB(r, value / 255, b); }} />
            <IntegerField inline label="B" min={0} max={255} value={b * 255} onUpdate={value => { setRGB(r, g, value / 255); }} />
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
      <div className={styles.wrapperCommon}>
        <div className={styles.wrapperPreview}>
          <div className={styles.previewBackground} />
          <div className={styles.previewColor} style={{ backgroundColor: cssColor }} />
        </div>
        <IntegerField label="Alpha" min={0} max={100} value={alpha * 100} onUpdate={value => { setAlpha(value / 100); }} />
      </div>
      <Tabs className={styles.wrapperSpecific} elements={tabs} style={{ flex: '1 1 auto' }} />
    </div>
  );

}
