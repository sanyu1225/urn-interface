import React from 'react'
import { Box } from '@chakra-ui/react'
import { ReactComponent as CloseIcon } from '../assets/images/icons/Close.svg';

const Costoast = ({
    title,
    type,
    onClose
}) => (
    <Box bg="red">
        {title}{type}
        <CloseIcon onClick={onClose} />
    </Box>
)

export default Costoast