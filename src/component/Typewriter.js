import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Text, keyframes } from '@chakra-ui/react';

const TypingCursor = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const Cursor = () => (
    <Box
        as="span"
        display="inline-block"
        ml="1"
        w="2px"
        h="1em"
        bg="currentColor"
        animation={`${TypingCursor} 1s infinite`}
    />
);

function Typewriter({ speed, content, onComplete }) {
    const [text, setText] = useState('');
    const [index, setIndex] = useState(0);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            // 判斷是否已經輸出完畢
            if (index >= content.length) {
                if (typeof onComplete === 'function') {
                    onComplete();
                    setIsComplete(true);
                }
                return;
            }

            // 取得下一個文字
            const nextChar = content[index];
            setText((prevText) => prevText + nextChar);
            setIndex((prevIndex) => prevIndex + 1);
        }, speed);

        return () => clearTimeout(timer);
    }, [index, content, speed, onComplete]);

    return (
        <Text
            color="#FFF3CD"
            fontWeight={600}
            fontSize="18px"
        >
            {text}
            {
                !isComplete && (
                    <Cursor />
                )
            }

        </Text>
    );
}

Typewriter.propTypes = {
    speed: PropTypes.number,
    content: PropTypes.string.isRequired,
};

Typewriter.defaultProps = {
    speed: 100, // 100ms
};

export default Typewriter;
