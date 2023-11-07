
const emittedErrors = new Set<string>();

export function clamp(x: number, min: number, max: number): number {
  if (x < min) {
    return min;
  }
  if (x > max) {
    return max;
  }
  return x;
}

export function errorOnce(message: string) {
  if (emittedErrors.has(message)) {
    return;
  }
  console.error(`${message} Duplicates of this error will be supressed.`);
}

export const enum Corner {
  TopLeft = 1,
  TopRight = 2,
  BottomLeft = 4,
  BottomRight = 8,
  Left = TopLeft | BottomLeft,
  Right = TopRight | BottomRight,
  Top = TopLeft | TopRight,
  Bottom = BottomLeft | BottomRight,
  None = 0,
  All = TopLeft | TopRight | BottomLeft | BottomRight,
}

export function computeCorners(top: boolean, left: boolean, bottom: boolean, right: boolean) {
  let corners = Corner.All;
  if (top && left && bottom && right) {
    return Corner.None;
  }
  if (top) {
    corners &= ~Corner.Top;
  }
  if (left) {
    corners &= ~Corner.Left;
  }
  if (bottom) {
    corners &= ~Corner.Bottom;
  }
  if (right) {
    corners &= ~Corner.Right;
  }
  return corners;
}

