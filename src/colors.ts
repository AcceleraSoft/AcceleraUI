
import { clamp } from "./util";

export type Color = HSL | RGB;

const enum ColorType {
  RGB,
  HSL,
}

export type HSL = [ColorType.HSL, number, number, number];

function assertHSL(color: Color): asserts color is HSL {
  if (!Array.isArray(color) || color[0] !== ColorType.HSL) {
    throw new Error(`Argument passed to function is not a valid RGB color`);
  }
}

export function isHSL(color: Color): color is HSL {
  return color[0] === ColorType.HSL;
}

export function createHSL(h: number, s: number, l: number): Color {
  return [ColorType.HSL, h, s, l];
}

export function getHSL(color: Color): [number, number, number] {
  if (!isHSL(color)) {
    color = toHSL(color);
  }
  return [ color[1], color[2], color[3] ];
}

export function toHSL(color: Color): Color {
  switch (color[0]) {
    case ColorType.HSL:
      return color;
    case ColorType.RGB:
      return [ColorType.RGB, 0, 0, 0]
  }
}

export type RGB = [ColorType.RGB, number, number, number];

function assertRGB(color: Color): asserts color is RGB {
  if (!Array.isArray(color) || color[0] !== ColorType.RGB) {
    throw new Error(`Argument passed to function is not a valid RGB color`);
  }
}

export function isRGB(color: Color): color is RGB {
  return color[0] === ColorType.RGB;
}

export function createRGB(r: number, g: number, b: number): Color {
  return [ColorType.RGB, r, g, b]
}

export function getRGB(color: Color): [number, number, number] {
  if (!isRGB(color)) {
    color = toRGB(color);
  }
  return [ color[1], color[2], color[3] ];
}

export function fromNumberToRGB(x: number): Color {
  let r = (x >> 16) & 0xFF;
  let g = (x >> 8) & 0xFF;
  let b = (x >> 0) & 0xFF;
  return [ColorType.RGB, r, g, b];
}

export function toRGB(color: Color): Color {
  switch (color[0]) {
    case ColorType.RGB:
      return color;
    case ColorType.HSL:
      const [_, h, s, l] = color;
      const a = s * Math.min(l, 1 - l);
      const f = (n: number) => {
        const k = (n + h / 30) % 12;
        return l - a * clamp(Math.min(k - 3, 9 - k), -1, 1);
      }
      const r = f(0);
      const g = f(8);
      const b = f(4);
      return [ColorType.RGB, r, g, b];
  }
}

export function toHex(color: Color): string {
  if (!isRGB(color)) {
    color = toRGB(color);
  }
  const r = color[1].toString(16).padStart(2, '0');
  const g = color[2].toString(16).padStart(2, '0');
  const b = color[3].toString(16).padStart(2, '0');
  return `#` + r + g + b;
}

export function toCSS(color: Color): string {
  switch (color[0]) {
    case ColorType.RGB:
      return `rgb(${color[0]}, ${color[1]}, ${color[2]})`
    case ColorType.HSL:
      return `hsl(${color[1]}, ${color[2] * 100}%, ${color[3] * 100}%)`
  }
}
