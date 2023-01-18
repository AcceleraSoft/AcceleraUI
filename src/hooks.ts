import { useRef, useEffect, useMemo, useState } from "react";
import { clamp } from "./util";

export type Vec2 = [number, number];

const isBrowser = typeof(window) !== 'undefined';

export function useMeasured<E extends HTMLElement>(ref: React.RefObject<E>) {
  if (!isBrowser) {
    return [0, 0]
  }
  const [state, setState] = useState<Vec2>([0, 0])
  const observer = useMemo(() => new ResizeObserver(entries => {
    const entry = entries[0];
    let width, height;
    if (entry.contentBoxSize) {
      const contentBoxSize = Array.isArray(entry.contentBoxSize)
        ? entry.contentBoxSize[0]
        : entry.contentBoxSize;
      const cssProps = window.getComputedStyle(entry.target);
      if (cssProps.writingMode.startsWith('horizontal')) {
        height = contentBoxSize.blockSize;
        width = contentBoxSize.inlineSize;
      } else {
        height = contentBoxSize.inlineSize;
        width = contentBoxSize.blockSize;
      }
    } else {
      width = entry.contentRect.width;
      height = entry.contentRect.height;
    }
    setState([width, height]);
  }), []);
  useEffect (() => {
    if (!ref.current) {
      return;
    }
    const element = ref.current;
    observer.observe(element);
    return () => {
      observer.unobserve(element);
    }
  }, [ ref.current ]);
  return state;
}

export interface UseDragOptions {
  areaRef: React.RefObject<HTMLElement>;
  initCoords?: Vec2;
  onDrag?: (e: DragEvent) => void;
}

export interface DragEvent {
  position: Vec2;
}

export function useDrag({ areaRef, onDrag, initCoords = [0,0] }: UseDragOptions) {
  const position = useRef(initCoords);
  const offset = useRef([0, 0]);
  const setPosition = (newPosition: Vec2) => {
    position.current = newPosition;
    if (onDrag !== undefined) {
      onDrag({
        position: newPosition
      })
    }
  }
  const updatePosition = (event: React.MouseEvent | MouseEvent) => {
    if (!areaRef.current) {
      return;
    }
    const rect = areaRef.current.getBoundingClientRect();
    setPosition([
      clamp(event.pageX - rect.x - offset.current[0], 0, rect.width),
      clamp(event.pageY - rect.y - offset.current[1], 0, rect.height)
    ])
  }
  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    updatePosition(event);
  }
  const startAreaDrag = (event: React.MouseEvent) => {
    const savedPosition = position.current;
    updatePosition(event);
    const cleanup = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keyup', onKeyDown);
      offset.current[0] = 0;
      offset.current[1] = 0;
    }
    const onMouseUp = (event: MouseEvent) => {
      cleanup();
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setPosition(savedPosition);
        cleanup();
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('keydown', onKeyDown);
  }
  const startElementDrag = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    offset.current[0] = event.pageX - rect.x - rect.width / 2;
    offset.current[1] = event.pageY - rect.y - rect.height / 2;
    startAreaDrag(event);
  }
  return { startAreaDrag, startElementDrag };
}
