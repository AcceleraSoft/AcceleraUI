
const emittedErrors = new Set<string>();

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
  if (top && left) {
    corners = Corner.TopLeft;
  }
  if (top && right) {
    corners = Corner.TopRight;
  }
  if (bottom && left) {
    corners = Corner.BottomLeft;
  }
  if (bottom && right) {
    corners = Corner.BottomRight;
  }
  if (left && !(top || bottom)) {
    corners &= ~Corner.Right;
  }
  if (right && !(top || bottom)) {
    corners &= ~Corner.Left;
  }
  if (top && !(left || right)) {
    corners &= ~Corner.Bottom;
  }
  if (bottom && !(left || right)) {
    corners &= ~Corner.Top;
  }
  return corners;
}

