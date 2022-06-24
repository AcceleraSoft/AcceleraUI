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
  ref: React.RefObject<HTMLElement>;
  initCoords?: Vec2;
  onDrag?: (e: DragEvent) => void;
}

export interface DragEvent {
  position: Vec2;
}

export function useDrag({ ref, onDrag, initCoords = [0,0] }: UseDragOptions) {
  const position = useRef(initCoords);
  const setPosition = (newPosition: Vec2) => {
    position.current = newPosition;
    if (onDrag !== undefined) {
      onDrag({
        position: newPosition
      })
    }
  }
  const updatePosition = (event: React.MouseEvent | MouseEvent) => {
    if (!ref.current) {
      return;
    }
    const rect = ref.current.getBoundingClientRect();
    setPosition([
      clamp(event.pageX - rect.x, 0, rect.width),
      clamp(event.pageY - rect.y, 0, rect.height)
    ])
  }
  const onMouseMove = (event: MouseEvent) => {
    event.preventDefault();
    updatePosition(event);
  }
  const startDrag = (event: React.MouseEvent) => {
    const savedPosition = position.current;
    updatePosition(event);
    const removeListeners = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('keyup', onKeyDown);
    }
    const onMouseUp = (event: MouseEvent) => {
      removeListeners();
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        setPosition(savedPosition);
        removeListeners();
      }
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('keydown', onKeyDown);
  }
  return { startDrag };
}