import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ChakraProvider, useMediaQuery } from '@chakra-ui/react'
import { theme } from './theme'
import Landing from './page/Landing';
import Merchant from './page/Merchant';
import Graveyard from './page/Graveyard';
import Altar from './page/Altar';
import Faq from './page/Faq';
import NotfoundPage from './page/NotfoundPage';
import Mobile from './page/Mobile'

function App() {
  const [isDesktop] = useMediaQuery(`(min-width: 1024px)`)

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {
          isDesktop ? (
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/merchant" element={<Merchant />} />
              <Route path="/graveyard" element={<Graveyard />} />
              <Route path="/altar" element={<Altar />} />
              <Route path="/faq" element={<Faq />} />
              <Route path="*" element={<NotfoundPage />} />
            </Routes>
          ) : <Mobile />
        }
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
