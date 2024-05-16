// Inspired by: https://github.com/spr-networks/super/blob/3611073441de345004ad3ecc01307a4e77c9788d/frontend/src/gluestack-ui.config.js#L4

import { config as defaultConfig } from "@gluestack-ui/config";

const colors = defaultConfig.tokens.colors;

export const config = {
  ...defaultConfig,
  tokens: {
    ...defaultConfig.tokens,
    colors: {
      ...defaultConfig.tokens.colors,

      primary50: colors.blueGray900,
      primary100: colors.blueGray900,
      primary200: colors.blueGray900,
      primary300: colors.blueGray900,
      primary400: colors.blueGray900,
      primary500: colors.blueGray900,
      primary600: colors.blueGray900,
      primary700: colors.blueGray900,
      primary800: colors.blueGray900,
      primary900: colors.blueGray900,

      muted50: "#fafafa",
      muted100: "#f5f5f5",
      muted200: "#e5e5e5",
      muted300: "#d4d4d4",
      muted400: "#a3a3a3",
      muted500: "#737373",
      muted600: "#525252",
      muted700: "#404040",
      muted800: "#262626",
      muted900: "#171717",

      backgroundCardLight: colors.warmGray50,
      backgroundCardDark: colors.coolGray900,
      borderColorCardLight: colors.warmGray100,
      borderColorCardDark: colors.blueGray800,

      backgroundContentLight: colors.coolGray100,
      backgroundContentDark: colors.black,

      sidebarBackgroundLight: colors.coolGray50,
      sidebarBackgroundDark: colors.black,

      navbarBackgroundLight: colors.white,
      navbarBackgroundDark: colors.black,
      navbarBorderColorLight: colors.coolGray100,
      navbarBorderColorDark: colors.coolGray800,
      navbarTextColorLight: colors.coolGray600,
      navbarTextColorDark: colors.coolGray300,
    },
  },
};
