import { Container, CssBaseline, ThemeProvider } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { darkTheme, lightTheme } from './theme';
import { useMemo } from 'react';
import { Home } from './pages/Home.tsx';
import { Route, Routes } from 'react-router';
import { Products } from './pages/Products.tsx';
import { ProductCategories } from './pages/ProductCategories.tsx';
import { NavBar } from './components/NavBar/NavBar.tsx';


function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(() => (prefersDarkMode ? darkTheme : lightTheme), [prefersDarkMode]);

  return (
    <ThemeProvider theme={theme}>

      <CssBaseline/>
      <Container maxWidth="lg">
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          <Route path="/product-categories" element={<ProductCategories/>}/>
        </Routes>
      </Container>
    </ThemeProvider>
  )
}

export default App
