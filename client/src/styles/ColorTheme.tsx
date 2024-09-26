'use client'
import { createTheme } from '@mui/material/styles';
const ColorTheme = createTheme({
    palette: {
      primary: {
        main: '#1976d2', // Primary color
        light: '#63a4ff', // Light variant of primary color
        dark: '#004ba0', // Dark variant of primary color
        contrastText: '#fff', // Text color on primary color
      },
      secondary: {
        main: '#d32f2f', // Secondary color
        light: '#ff6659', // Light variant of secondary color
        dark: '#9a0007', // Dark variant of secondary color
        contrastText: '#fff', // Text color on secondary color
      },
      background: {
        default: '#f5f5f5', // Background color
        paper: '#fff', // Paper color
      },
      text: {
        primary: '#000', // Primary text color
        secondary: '#757575', // Secondary text color
      },
    },
  });

export default ColorTheme
