import Image from 'next/image';
import { useToast, Box, Flex, Text, keyframes } from '@chakra-ui/react';
import CloseIcon from '../assets/images/icons/Close.svg';
import SuccessfulIcon from '../assets/images/icons/successful.svg';
import ErrorIcon from '../assets/images/icons/error.svg';
import LoadingIcon from '../assets/images/icons/loading.svg';

const spin = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

const typeIcon = {
    success: <Image alt="success_icon" src={SuccessfulIcon} />,
    error: <Image alt="error_icon" src={ErrorIcon} />,
    loading: <Box animation={`${spin} 2s linear infinite`}><Image alt="loading" src={LoadingIcon} /></Box>,
};

const useCusToast = () => {
    const toastInstance = useToast();

    const toastSeccess = (title) => {
        toastInstance({
            title,
            isClosable: true,
            containerStyle: {
                maxWidth: '100%',
            },
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
                        <Text color="#FFF3CD" p="0 10px" fontWeight={400} fontSize="14px">
                            {title}
                        </Text>
                    </Flex>
                    <Box cursor="pointer">
                        <Image src={CloseIcon} alt="close_icon" onClick={onClose} />
                    </Box>
                </Flex>
            ),
        });
    };
    const toastError = (title) => {
        toastInstance({
            title,
            isClosable: true,
            containerStyle: {
                maxWidth: '100%',
            },
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
                        <Text color="#FFF3CD" p="0 10px" fontWeight={400} fontSize="14px">
                            {title}
                        </Text>
                    </Flex>
                    <Box cursor="pointer">
                        <Image src={CloseIcon} alt="close_icon" onClick={onClose} />
                    </Box>
                </Flex>
            ),
        });
    };
    const toastLoading = (title) => {
        toastInstance({
            title,
            isClosable: true,
            containerStyle: {
                maxWidth: '100%',
            },
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
                        <Text color="#FFF3CD" p="0 10px" fontWeight={400} fontSize="14px">
                            {title}
                        </Text>
                    </Flex>
                    <Box cursor="pointer">
                        <Image src={CloseIcon} alt="close_icon" onClick={onClose} />
                    </Box>
                </Flex>
            ),
        });
    };

    return {
        toastSeccess,
        toastError,
        toastLoading,
    };
};

export default useCusToast;
