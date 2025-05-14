
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'

// Extend the theme to customize colors, fonts, etc.
const theme = extendTheme({
  colors: {
    healthcare: {
      primary: '#4F6BED',
      dark: '#3A56C5',
      light: '#7C93F5'
    }
  },
  fonts: {
    body: 'Inter, system-ui, sans-serif',
    heading: 'Inter, system-ui, sans-serif',
  },
})

createRoot(document.getElementById("root")!).render(
  <ChakraProvider theme={theme}>
    <App />
  </ChakraProvider>
);
