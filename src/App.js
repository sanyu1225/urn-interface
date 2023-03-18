import React, { useEffect, useState } from 'react';
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
import { supportWebp } from './utils'

function App() {
  const [isDesktop] = useMediaQuery(`(min-width: 1024px)`)
  const [isSupportWebp, setIsSupportWebp] = useState(true)

  useEffect(() => {
    setIsSupportWebp(supportWebp())
  }, [])

  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        {
          isDesktop ? (
            <Routes>
              <Route path="/" element={<Landing isSupportWebp={isSupportWebp} />} />
              <Route path="/merchant" element={<Merchant isSupportWebp={isSupportWebp} />} />
              <Route path="/graveyard" element={<Graveyard isSupportWebp={isSupportWebp} />} />
              <Route path="/altar" element={<Altar isSupportWebp={isSupportWebp} />} />
              <Route path="/faq" element={<Faq isSupportWebp={isSupportWebp} />} />
              <Route path="*" element={<NotfoundPage isSupportWebp={isSupportWebp} />} />
            </Routes>
          ) : <Mobile />
        }
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
