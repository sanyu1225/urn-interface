import Image from 'next/image';
import PropTypes from 'prop-types';
import { useState } from 'react';

import { Flex } from '@chakra-ui/react';
import minus from '../assets/images/icons/minus.svg';
import plus from '../assets/images/icons/plus.svg';

const Counter = ({ defaultValue, onChange }) => {
    const [count, setCount] = useState(defaultValue);

    return (
        <Flex bg="#FFE5B4" justifyContent="space-between" alignItems="center" p="6px 10px" w="100%" h="32px" borderRadius="100px">
            <Image
                alt="reduce"
                src={minus}
                onClick={() => {
                    const newValue = Math.max(1, count - 1);
                    setCount(newValue);
                    onChange(newValue);
                }}
            />
            {count}
            <Image
                alt="increase"
                src={plus}
                onClick={() => {
                    const newValue = count + 1;
                    setCount(newValue);
                    onChange(newValue);
                }}
            />
        </Flex>
    );
};

Counter.prototype = {
    defaultValue: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Counter;
