/* eslint-disable no-unused-vars */
import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import useSound from 'use-sound';
import PropTypes from 'prop-types';
import { useQuery } from 'urql';
import {
    Box,
    Flex,
    Text,
    Button,
    Input,
    useDisclosure,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Textarea,
    Center,
} from '@chakra-ui/react';
import { isEmpty } from '@/plugin/lodash';
import { queryAllUrnData, CREATOR_ADDRESS } from '../constant';
import { useWalletContext } from '../context';
import Layout from '../layout';
import useCusToast from '../hooks/useCusToast';
import HomeBaseBg from '../assets/images/robbery/robbery_1024.jpg';
import HomeBaseBgWebp from '../assets/images/robbery/robbery_1024.webp';
import Home1440Bg from '../assets/images/robbery/robbery_1440.jpg';
import Home1440BgWebp from '../assets/images/robbery/robbery_1440.webp';
import HomeBg1920 from '../assets/images/robbery/robbery_1920.jpg';
import HomeBg1920Webp from '../assets/images/robbery/robbery_1920.webp';
import Robber from '../assets/images/robbery/robber.png';
import RobberWebp from '../assets/images/robbery/robber.webp';
import RobberyBrand from '../assets/images/robbery/robbery_brand.png';
import RobberyBrandWebp from '../assets/images/robbery/robbery_brand.webp';
import CopyIcon from '@/assets/images/icons/CopyLight.svg';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import { shortenAddress, hexToBytes } from '@/utils';
import Carousel from '@/component/Carousel';
import ButtonClickAudio from '../assets/music/clickButton.mp3';
import useRobData from '../hooks/useRobData';

const fakeAddressList = [{
    address: '0x1234567890123456789012345678901234567890',
    success: false,
    account: '50',
}, {
    address: '0x1234567890123456789012345678901234567891',
    success: true,
    account: '40',
}, {
    address: '0x1234567890123456789012345678901234567892',
    success: false,
    account: '30',
}, {
    address: '0x1234567890123456789012345678901234567893',
    success: true,
    account: '20',
}, {
    address: '0x1234567890123456789012345678901234567894',
    success: false,
    account: '10',
}, {
    address: '0x1234567890123456789012345678901234567895',
    success: true,
    account: '5',
}, {
    address: '0x1234567890123456789012345678901234567896',
    success: false,
    account: '1',
}, {
    address: '0x1234567890123456789012345678901234567897',
    success: true,
    account: '0.5',
}];

const Robbery = ({ isSupportWebp }) => {
    const [copyToClipboard] = useCopyToClipboard();
    const [choiseUrn, setChoiseUrn] = useState({});
    const [playButton] = useSound(ButtonClickAudio);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputAddress, setInputAddress] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [modalType, setModalType] = useState('random');
    const { connected, account, mint } = useWalletContext();
    const address = account && account.address;
    const { toastError } = useCusToast();

    const [result, reexecuteQuery] = useQuery({
        query: queryAllUrnData,
        variables: {
            address,
            // offset: 0,
            creator_address: CREATOR_ADDRESS,
        },
    });

    const { data } = result;
    const UrnList = data && data?.current_token_ownerships;

    const [robResult, fetchRobData] = useRobData(address);
    const { data: robdata, error: robError, isLoading: robIsLoading } = robResult;
    console.log('robIsLoading: ', robIsLoading);
    console.log('robError: ', robError);
    console.log('robdata: ', robdata);

    useEffect(() => {
        if (connected) {
            reexecuteQuery();
            fetchRobData();
        } else {
            setChoiseUrn({});
        }
    }, [connected, reexecuteQuery, fetchRobData]);

    const robHandler = async (type) => {
        setModalType(type);
        onOpen();
        playButton();
    };

    const robButtonText = useMemo(() => {
        if (!connected) return 'Not connected';
        if (UrnList && UrnList.length > 0) {
            return modalType === 'random' ? 'Rob a fucker' : 'Rob specific fucker';
        }
        return 'Buy one first';
    }, [connected, UrnList, modalType]);

    const closeModalHandler = () => {
        onClose();
        setInputAddress('');
        setInputMessage('');
    };

    const submitRob = async () => {
        try {
            if (modalType === 'random') {
                if (inputMessage === '') {
                    toastError('Message is required');
                    return;
                }

                const params = [choiseUrn.property_version, inputMessage];
                const transaction = await mint('random_rob', params);
                if (transaction) {
                    setTimeout(() => {
                        closeModalHandler();
                        reexecuteQuery();
                    }, 1000);
                }
            } else if (modalType === 'specific') {
                if (inputAddress === '') {
                    toastError('Address is required');
                    return;
                }
                if (inputMessage === '') {
                    toastError('Message is required');
                    return;
                }
                // TODO validate inputMessage length
                const params = [choiseUrn.property_version, inputAddress, inputMessage];
                const transaction = await mint('rob', params);
                console.log('transaction: ', transaction);
                if (transaction) {
                    setTimeout(() => {
                        closeModalHandler();
                        reexecuteQuery();
                    }, 1000);
                }
            }
        } catch (error) {
            console.error('error: ', error);
        }
    };

    return (
        <Layout>
            <Box
                maxW="1920px"
                bgImage={{
                    base: isSupportWebp ? HomeBaseBgWebp.src : HomeBaseBg.src,
                    mid: isSupportWebp ? Home1440BgWebp.src : Home1440Bg.src,
                    desktop: isSupportWebp ? HomeBg1920Webp.src : HomeBg1920.src,
                }}
                bgRepeat="no-repeat"
                bgSize={{ base: '100% 100%', desktop: 'cover' }}
                minH={{ base: '768px', mid: '800px', desktop: '800px' }}
                maxH={{ base: '768px', mid: '900px', desktop: '1080px' }}
                minW={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
                bgPosition="bottom"
                position="relative"
            >
                <Flex
                    wrap="wrap"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w="444px"
                    position="absolute"
                    bottom={{ base: '0', mid: '42px' }}
                    left={{ base: '15px', mid: '190px', desktop: '433px' }}
                    justifyContent="center"
                >
                    <Flex
                        bg="#292229"
                        borderRadius="20px"
                        border="1px solid #FFF3CD"
                        rowGap="20px"
                        flexWrap="wrap"
                        p="24px"
                        w={{ base: '238px', mid: 'auto', desktop: 'auto' }}
                    >
                        <Text
                            fontSize="20px"
                            fontWeight={500}
                            color="#FFF3CD"
                            textAlign="center"
                            w="100%"
                            lineHeight="28px"
                            whiteSpace="pre-line"
                        >
                            Stop digging like a dumb ass, rob random
                            fuckers make your life easier.
                        </Text>
                        <Flex w="100%" gap="16px" flexWrap={{ base: 'wrap', mid: 'initial' }}>
                            <Button w="190px" onClick={() => robHandler('random')}>Rob a fucker</Button>
                            <Button w="190px" onClick={() => robHandler('specific')}>Rob specific fucker</Button>
                        </Flex>
                    </Flex>
                    <Flex justify="flex-end" w="100%">
                        <Box
                            w={{ base: '337px' }}
                            h={{ base: '423px' }}
                            bgImage={{
                                base: isSupportWebp ? RobberWebp.src : Robber.src,
                            }}
                            bgRepeat="no-repeat"
                            bgSize="100% 100%"
                        />
                    </Flex>
                </Flex>
                <Box
                    bgImage={{
                        base: isSupportWebp ? RobberyBrandWebp.src : RobberyBrand.src,
                    }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    position="absolute"
                    bottom={{ base: '20%' }}
                    right={{ base: '65px', mid: '210px', desktop: '440px' }}
                    w={{ base: '510px' }}
                    h={{ base: '599px' }}
                    p="76px"
                    pl="84px"
                    display="block"
                >
                    <Text
                        color="#FFF5CE"
                        fontSize={{ base: '20px' }}
                        fontWeight={700}
                        h="26px"
                        mb="8px"
                    >
                        Who robbed you?
                    </Text>
                    <Flex
                        w="100%"
                        flexWrap="wrap"
                        maxH={{ base: '400px' }}
                        overflow="auto"
                        position="relative"
                    >
                        {
                            fakeAddressList?.length && fakeAddressList.map((item, index) => (
                                <Flex key={index} flexWrap="wrap" borderBottom="1px solid #383732" mt="12px">
                                    <Flex
                                        justifyContent="flex-start"
                                        w="100%"
                                        key={index}
                                        h="20px"
                                        gap="12px"
                                    >
                                        <Text color="#FFF3CD" fontSize="14px" fontWeight={700}>
                                            {item.address && shortenAddress(item.address, 8)}
                                        </Text>
                                        <Box
                                            cursor="pointer"
                                            onClick={() => copyToClipboard(item.address)}
                                        >
                                            <Image alt="copy" src={CopyIcon} />
                                        </Box>
                                    </Flex>
                                    <Flex alignItems="center" mt="4px" mb="12px">
                                        <Text
                                            color="#CCC2A1"
                                            fontSize="14px"
                                            fontWeight={700}
                                            _after={{
                                                content: '""',
                                                display: 'inline-block',
                                                background: '#CCC2A1',
                                                width: '1px',
                                                height: '10px',
                                                marginLeft: '5px',
                                            }}
                                            mr="10px"
                                        >
                                            Success: {String(item.success)}
                                        </Text>
                                        <Text color="#CCC2A1" fontSize="14px" fontWeight={700}>
                                            Account: {item.account}
                                        </Text>
                                    </Flex>
                                </Flex>
                            ))
                        }
                        <Box
                            position="sticky"
                            left="0"
                            bottom="0"
                            w="100%"
                            h="80px"
                            pointerEvents="none"
                            bgGradient="linear-gradient(transparent, rgb(27 26 29))"
                        />
                    </Flex>

                </Box>
                <Modal
                    blockScrollOnMount={false}
                    isOpen={isOpen}
                    onClose={closeModalHandler}
                >
                    <ModalOverlay />
                    <ModalContent p="28px" bg="#292229">
                        <ModalHeader p="0 0 20px 0px" alignItems="center" color="#FFF3CD">Random Rob</ModalHeader>
                        <ModalCloseButton m="20px" color="#FFF3CD" />
                        <ModalBody p="0">
                            {
                                isEmpty(UrnList) && (
                                    <Box w="100%" mb="12px">
                                        <Text color="#FFF3CD" textAlign="left" fontSize="16px" fontWeight={700}>
                                            Select urn
                                        </Text>
                                    </Box>
                                )
                            }
                            <Flex
                                bg="#211C21"
                                w="100%"
                                h={{ base: '140px' }}
                                borderRadius="20px"
                                justifyContent="center"
                                alignItems="center"
                                flexWrap="wrap"
                            >
                                {
                                    (
                                        isEmpty(UrnList) ? (
                                            <Text color="#FFF3CD" textAlign="center" fontSize="16px" fontWeight={700}>
                                                Poor guy. You don&apos;t have anything.
                                            </Text>
                                        ) : (
                                            <Carousel
                                                NftList={{
                                                    name: 'urn',
                                                    list: UrnList,
                                                }}
                                                choiseItem={choiseUrn}
                                                selectItem={setChoiseUrn}
                                            />
                                        )
                                    )
                                }
                            </Flex>

                            {
                                modalType === 'specific' && (
                                    <>
                                        <Box w="100%" m="12px 0">
                                            <Text color="#FFF3CD" textAlign="left" fontSize="16px" fontWeight={700}>
                                                Address
                                            </Text>
                                        </Box>
                                        <Input
                                            placeholder="0x..."
                                            onChange={(e) => setInputAddress(e.target.value)}
                                        />

                                    </>
                                )
                            }
                            <Box w="100%" m="12px 0">
                                <Text
                                    color="#FFF3CD"
                                    textAlign="left"
                                    fontSize="16px"
                                    fontWeight={700}
                                >
                                    Message
                                </Text>
                            </Box>
                            <Textarea
                                placeholder="Text"
                                h="60px"
                                color="#FFF3CD"
                                borderColor="#FFF3CD"
                                _focus={{
                                    borderColor: '#FFF3CD',
                                    boxShadow: 'none',
                                }}
                                onChange={(e) => setInputMessage(e.target.value)}
                            />

                            <Center mt="24px">
                                <Button isDisabled={!!isEmpty(UrnList)} onClick={submitRob}>
                                    {robButtonText}
                                </Button>
                            </Center>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </Layout>
    );
};

Robbery.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
};
export default Robbery;
