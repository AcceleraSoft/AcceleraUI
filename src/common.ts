
import styles from "./common.module.css"
import { Corner } from "./util";

export function getBorderRadiusClassName(corners: Corner): string {
  let letters = '';
  if (corners & Corner.TopLeft) {
    letters += 'A';
  }
  if (corners & Corner.TopRight) {
    letters += 'B';
  }
  if (corners & Corner.BottomRight) {
    letters += 'C';
  }
  if (corners & Corner.BottomLeft) {
    letters += 'D';
  }
  return styles[`round${letters}`];
}

