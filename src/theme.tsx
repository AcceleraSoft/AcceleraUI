import { Theme, useTheme as useEmotionTheme } from "@emotion/react";

import defaultTheme from "../themes/default.json"

export interface ThemeColorVariants {
  fg00: string;
  bg00: string;
  bg10: string;
  bg01: string;
}

export interface ThemeColors {
  primary: ThemeColorVariants;
  secondary: ThemeColorVariants;
  default: ThemeColorVariants;
}

declare module "@emotion/react" {
  export interface Theme {
    borderRadius: number;
    padding: number;
    colors: ThemeColors;
  }
}

function isEmptyObject(obj: object): boolean {
  return obj // null and undefined check
      && Object.keys(obj).length === 0
      // because Object.keys(new Date()).length === 0;
      // we have to do some additional check
      && Object.getPrototypeOf(obj) === Object.prototype 
}

export function useTheme(): Theme {
  const theme = useEmotionTheme();
  return isEmptyObject(theme) ? defaultTheme : theme;
}

export { Theme, ThemeProviderProps, ThemeProvider } from "@emotion/react"
