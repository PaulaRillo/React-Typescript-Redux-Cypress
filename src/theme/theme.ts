import { alpha, createTheme } from "@mui/material";

const COMMON = {
    black: '#000',
    white: '#fff'
  };
  
  const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24'
  };
  
  const PRIMARY = {
    main: '#0ABAB5',
    light: '#3BC7C3',
    dark: '#07827E',
    contrastText: '#e1fffe'
  };
  
  const SECONDARY = {
    main: '#E34334',
    light: '#E8685C',
    dark: '#9E2E24',
    contrastText: '#fff'
  };
  
  const BACKGROUND = {
    paper: '#fff',
    default: '#fafafa',
    defaultTheme: '$defaultThemeColor',
    menu: '#F4F6FA'
  };
  
  const TEXT = {
    neutral: '#173354'
  };

const theme = createTheme({
  palette: {
    mode: 'light',
    common: {
      black: COMMON.black,
      white: COMMON.white
    },
    background: BACKGROUND,
    primary: PRIMARY,
    secondary: SECONDARY,
    text: {
      primary: alpha(TEXT.neutral, 0.87),
      secondary: alpha(TEXT.neutral, 0.6),
      disabled: alpha(TEXT.neutral, 0.38)
    },
    divider: alpha(GREY[500], 0.24)
  },
  typography: {
    fontFamily: 'Poppins',
  },
  shape: {
    borderRadius: 4,
  },
});

export default theme;
