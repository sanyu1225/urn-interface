import React from 'react';
import PropTypes from 'prop-types';
import { Box, keyframes, Text } from '@chakra-ui/react';
import bg from '../assets/images/Notfound/404_1920.jpg';
import bgWebp from '../assets/images/Notfound/404_1920.webp';
import minBg from '../assets/images/Notfound/404_1440.jpg';
import minBgWebp from '../assets/images/Notfound/404_1440.webp';
import Layout from '../layout';

const glitch = keyframes`
  2%, 64% {
    transform: translate(2px, 0) skew(0deg);
  }
  4%, 60% {
    transform: translate(-2px, 0) skew(0deg);
  }
  62% {
    transform: translate(0, 0) skew(5deg); 
  }
`;

const glitchTop = keyframes`
  2%, 64% {
    transform: translate(2px, -2px);
  }
  4%, 60% {
    transform: translate(-2px, 2px);
  }
  62% {
    transform: translate(13px, -1px) skew(-13deg); 
  }
`;

const glitchBottom = keyframes`
  2%, 64% {
    transform: translate(-2px, 0);
  }
  4%, 60% {
    transform: translate(-2px, 0);
  }
  62% {
    transform: translate(-22px, 5px) skew(21deg); 
  }
`;

const NotfoundPage = ({ isSupportWebp }) => (
  <Layout>
    <Box minH="100vh">
      <Box
        bgImage={{
          base: isSupportWebp ? minBgWebp : minBg,
          desktop: isSupportWebp ? bgWebp : bg
        }}
        w="100%"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        minH={{ base: window.innerHeight < 860 ? '860px' : '100vh' }}
        position="relative"
      >
        <Box
          as="div"
          fontSize="60px"
          fontWeight={700}
          color="#FFF5CE"
          w="400px"
          position="absolute"
          right="10%"
          top="25%"
          animation={`${glitch} 1s linear infinite`}
          _before={{
            content: "attr(title)",
            position: "absolute",
            left: "0",
            animation: `${glitchTop} 1s linear infinite`,
            clipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)",
            WebkitClipPath: "polygon(0 0, 100% 0, 100% 33%, 0 33%)",
          }}
          _after={{
            content: "attr(title)",
            position: "absolute",
            left: "0",
            animation: `${glitchBottom} 1.5s linear infinite`,
            clipPath: "polygon(0 67%, 100% 67%, 100% 100%, 0 100%)",
            WebkitClipPath: "polygon(0 67%, 100% 67%, 100% 100%, 0 100%)",
          }}
          title="404"
        >
          404
        </Box>
        <Box
          position="absolute"
          right="10%"
          top="35%"
          w="400px"
        >
          <Text color="#FFF3CD" fontWeight={400} fontSize="16px">
            Page Not Found.
          </Text>
        </Box>
      </Box>
    </Box>
  </Layout>
);

NotfoundPage.prototype = {
  isSupportWebp: PropTypes.bool.isRequired,
}
export default NotfoundPage;
