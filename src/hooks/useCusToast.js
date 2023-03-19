import React from 'react'
import { useToast, Box, Flex, Text, keyframes } from '@chakra-ui/react'
import { ReactComponent as CloseIcon } from '../assets/images/icons/Close.svg';
import { ReactComponent as SuccessfulIcon } from '../assets/images/icons/successful.svg';
import { ReactComponent as ErrorIcon } from '../assets/images/icons/error.svg';
import { ReactComponent as LoadingIcon } from '../assets/images/icons/loading.svg';

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`

const typeIcon = {
    success: <SuccessfulIcon />,
    error: <ErrorIcon />,
    loading: <Box animation={`${spin} 2s linear infinite`}><LoadingIcon /></Box>,
}

const useCusToast = () => {
    const toastInstance = useToast()

    const toastSeccess = (title) => {
        toastInstance({
            title,
            isClosable: true,
            render: ({ onClose }) => (
                <Flex
                    bg="#292229"
                    justifyContent="space-between"
                    h="52px"
                    p="0 16px"
                    border="1px solid #49473E"

                    alignItems="center"
                    borderRadius="12px"
                    boxShadow="0px 0px 12px rgba(0, 0, 0, 0.05)"
                >
                    <Flex alignItems="center">
                        <Box w="16px" h="16px">
                            {typeIcon.success}
                        </Box>
                        <Text color="#FFF3CD" pl="10px" fontWeight={400} fontSize="14px">
                            {title}
                        </Text>
                    </Flex>
                    <Box cursor="pointer">
                        <CloseIcon onClick={onClose} />
                    </Box>
                </Flex>
            )
        })
    }
    const toastError = (title) => {
        toastInstance({
            title,
            isClosable: true,
            render: ({ onClose }) => (
                <Flex
                    bg="#292229"
                    justifyContent="space-between"
                    h="52px"
                    p="0 16px"
                    border="1px solid #49473E"

                    alignItems="center"
                    borderRadius="12px"
                    boxShadow="0px 0px 12px rgba(0, 0, 0, 0.05)"
                >
                    <Flex alignItems="center">
                        <Box w="16px" h="16px">
                            {typeIcon.error}
                        </Box>
                        <Text color="#FFF3CD" pl="10px" fontWeight={400} fontSize="14px">
                            {title}
                        </Text>
                    </Flex>
                    <Box cursor="pointer">
                        <CloseIcon onClick={onClose} />
                    </Box>
                </Flex>
            )
        })
    }
    const toastLoading = (title) => {
        toastInstance({
            title,
            isClosable: true,
            render: ({ onClose }) => (
                <Flex
                    bg="#292229"
                    justifyContent="space-between"
                    h="52px"
                    p="0 16px"
                    border="1px solid #49473E"

                    alignItems="center"
                    borderRadius="12px"
                    boxShadow="0px 0px 12px rgba(0, 0, 0, 0.05)"
                >
                    <Flex alignItems="center">
                        <Box w="16px" h="16px">
                            {typeIcon.loading}
                        </Box>
                        <Text color="#FFF3CD" pl="10px" fontWeight={400} fontSize="14px">
                            {title}
                        </Text>
                    </Flex>
                    <Box cursor="pointer">
                        <CloseIcon onClick={onClose} />
                    </Box>
                </Flex>
            )
        })
    }

    return {
        toastSeccess,
        toastError,
        toastLoading
    }
}

export default useCusToast