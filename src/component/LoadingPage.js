import { Box, Spinner, keyframes } from '@chakra-ui/react';

const pulse = keyframes`
  0% {
    transform: scale(0);
    opacity: 0;
  }
  50% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(0);
    opacity: 0;
  }
`;

const LaserLoading = ({
  width = '100vw',
  height = '100vh',
  bg = '#141414',
}) => (
  <Box
    width={width}
    height={height}
    display="flex"
    justifyContent="center"
    alignItems="center"
    bg={bg}
    position="relative"
  >
    <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="#FFF3CD"
      color="white"
      size="xl"
    />
    <Box
      position="absolute"
      width="20px"
      height="20px"
      borderRadius="50%"
      backgroundColor="#FFF3CD"
      animation={`${pulse} 1.5s infinite`}
    />
    <Box
      position="absolute"
      width="20px"
      height="20px"
      borderRadius="50%"
      backgroundColor="gray01"
      animation={`${pulse} 1.5s infinite 0.3s`}
    />
    <Box
      position="absolute"
      width="20px"
      height="20px"
      borderRadius="50%"
      backgroundColor="#E3D4A2"
      animation={`${pulse} 1.5s infinite 0.6s`}
    />
  </Box>
);

export default LaserLoading;
