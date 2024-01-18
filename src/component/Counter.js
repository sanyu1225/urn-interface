import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Box, Flex } from '@chakra-ui/react';

import minus from '../assets/images/icons/minus.svg';
import plus from '../assets/images/icons/plus.svg';

const Counter = ({ defaultValue, onChange }) => {
  const [count, setCount] = useState(defaultValue);

  return (
    <Flex
      bg="#FFE5B4"
      justifyContent="space-between"
      alignItems="center"
      p="6px 10px"
      w="100%"
      h="32px"
      borderRadius="100px"
    >
      <Box cursor="pointer">
        <Image
          alt="reduce"
          src={minus}
          onClick={() => {
            const newValue = Math.max(1, count - 1);
            setCount(newValue);
            onChange(newValue);
          }}
        />
      </Box>
      {count}
      <Box cursor="pointer">
        <Image
          cursor="pointer"
          alt="increase"
          src={plus}
          onClick={() => {
            const newValue = count + 1;
            setCount(newValue);
            onChange(newValue);
          }}
        />
      </Box>
    </Flex>
  );
};

Counter.prototype = {
  defaultValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default Counter;
