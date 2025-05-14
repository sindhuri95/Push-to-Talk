
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App.tsx'
import './index.css'

// Extend the theme to customize colors, fonts, etc.
const theme = extendTheme({
  colors: {
    healthcare: {
      primary: '#0d3253', // Updated to deep navy blue
      dark: '#0d3253',
      light: '#5cc5d5'
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
