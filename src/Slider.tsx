import { CSSProperties, useRef } from "react";
import { DragEvent, useDrag, useMeasured } from "./hooks";
import styles from "./Slider.module.css";

const handleHeight = '2rem';
const barHeight = '1rem';

export interface SliderChangeEvent {
  value: number;
}

export interface SliderProps {
  size?: string;
  vertical?: boolean;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onUpdate?: (value: number) => void;
}

export function Slider({
  size = '1rem',
  min = 0,
  max = 100,
  step,
  value,
  vertical = false,
  onUpdate,
}: SliderProps) {

  const barRef = useRef<HTMLDivElement>(null);
  const [ width, height ] = useMeasured(barRef)
  const elementSize = vertical ? height : width;
  const offset = elementSize * ((value - min) / max);
  const { startElementDrag, startAreaDrag } = useDrag({
    areaRef: barRef,
    onDrag(e: DragEvent) {
      if (onUpdate !== undefined) {
        const [x, y] = e.position;
        let newValue = min + ((vertical ? y : x) / elementSize) * (max - min);
        if (step !== undefined) {
          newValue = Math.round(newValue / step) * step
        }
        onUpdate(newValue);
      }
    }
  });

  const handleSize = `calc(${size} * 2)`;

  const barCss = {} as CSSProperties;
  if (vertical) {
    barCss.width = size;
    barCss.minHeight = '4rem';
  } else {
    barCss.height = size;
  }

  const handleCss = {} as CSSProperties;
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
    <div className={styles.wrapper} style={{ margin: `${size} 0` }}>
      <div className={styles.bar} ref={barRef} style={barCss} onMouseDown={startAreaDrag} />
      <div className={styles.handle} style={handleCss} onMouseDown={startElementDrag} />
    </div>
  );

}

export default Slider;
