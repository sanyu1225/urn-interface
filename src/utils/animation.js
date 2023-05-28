import { keyframes } from '@chakra-ui/react';

export const fadeup = keyframes`
from {
    opacity: 0;
    transform:translateY(100px)
}
to {
    opacity: 1;
    transform:translateY(0)
  }
`;

export const fadeIn = keyframes`
from {
    opacity: 0;
}
to {
    opacity: 1;
  }
`;

export const bounceInAnimation = keyframes`
 from {
    opacity: 0;
    transform: scale(0.3);
  }
  20% {
    transform: scale(1.1);
  }
  40% {
    transform: scale(0.9);
  }
  60% {
    opacity: 1;
    transform: scale(1.03);
  }
  80% {
    transform: scale(0.97);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;
