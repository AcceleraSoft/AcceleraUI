
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

export { Theme, useTheme, ThemeProviderProps, ThemeProvider } from "@emotion/react"
