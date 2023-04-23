import Image from 'next/image';
import { Box } from '@chakra-ui/react';
import CloseIcon from '../assets/images/icons/Close.svg';

const Costoast = ({
    title,
    type,
    onClose,
}) => (
    <Box bg="red">
        {title}{type}
        <Image alt="close" src={CloseIcon} onClick={onClose} />
    </Box>
);

export default Costoast;
