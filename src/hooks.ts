import { useRef, useEffect, useMemo, useState, RefObject, useLayoutEffect } from "react";
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

export const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect: useEffect

export function useEventListener<
  KW extends keyof WindowEventMap,
  KH extends keyof HTMLElementEventMap,
  KM extends keyof MediaQueryListEventMap,
  T extends HTMLElement | MediaQueryList | void = void,
>(
  eventName: KW | KH | KM,
  handler: (
    event:
      | WindowEventMap[KW]
      | HTMLElementEventMap[KH]
      | MediaQueryListEventMap[KM]
      | Event,
  ) => void,
  element?: RefObject<T>,
  options?: boolean | AddEventListenerOptions,
) {
  // Create a ref that stores handler
  const savedHandler = useRef(handler)

  useIsomorphicLayoutEffect(() => {
    savedHandler.current = handler
  }, [handler])

  useEffect(() => {
    // Define the listening target
    const targetElement: T | Window = element?.current ?? window

    if (!(targetElement && targetElement.addEventListener)) return

    // Create event listener that calls handler function stored in ref
    const listener: typeof handler = event => savedHandler.current(event)

    targetElement.addEventListener(eventName, listener, options)

    // Remove event listener on cleanup
    return () => {
      targetElement.removeEventListener(eventName, listener, options)
    }
  }, [eventName, element, options])
}

