
const enum ColorType {
  RGB,
  HSV,
}

export type Color = unknown;

type RGBColor = [ColorType.RGB, number, number, number];

export const RGB_MIN = 0;
export const RGB_MAX = 255 * 255 * 255;

function assertRGB(color: Color): asserts color is RGBColor {
  if (!Array.isArray(color) || color[0] !== ColorType.RGB) {
    throw new Error(`Argument passed to function is not a valid RGB color`);
  }
}

export function createRGB(r: number, g: number, b: number): Color {
  return [ColorType.RGB, r, g, b]
}

export function parseRGBNumber(x: number): Color {
  let r = (x >> 16) & 0xFF;
  let g = (x >> 8) & 0xFF;
  let b = (x >> 0) & 0xFF;
  return [ColorType.RGB, r, g, b]
}

export function convertRGBToCSS(color: Color): string {
  assertRGB(color);
  return `rgb(${color[1]}, ${color[2]}, ${color[3]})`
}

export function convertRGBToHex(color: Color): string {
  assertRGB(color);
  const r = color[1].toString(16).padStart(2, '0');
  const g = color[2].toString(16).padStart(2, '0');
  const b = color[3].toString(16).padStart(2, '0');
  return `#` + r + g + b;
}