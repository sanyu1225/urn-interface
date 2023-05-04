/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Button, Image } from '@chakra-ui/react';
import { useQuery } from 'urql';
import { isEmpty } from '@/plugin/lodash';
import { queryAltarData } from '../constant';
import Layout from '../layout';
import HomeBg from '../assets/images/altar/altar_bg.png';
import { useWalletContext } from '../context';
import Carousel from '@/component/Carousel';
import HomeBgWebp from '../assets/images/altar/altar_bg.webp';
import HomeBaseBg from '../assets/images/altar/altar_1440.jpg';
import HomeBaseBgWebp from '../assets/images/altar/altar_1440.webp';
import CardBrandImg from '../assets/images/altar/cardbrand.png';
import CardBrandImgWebp from '../assets/images/altar/cardbrand.webp';
import SkullItemImg from '../assets/images/altar/skull_item.png';
import SkullItemImgWebp from '../assets/images/altar/skull_item.webp';
import UrnItemImg from '../assets/images/altar/urn_item.png';
import UrnItemImgWebp from '../assets/images/altar/urn_item.webp';
import AltarImg from '../assets/images/altar/altar.png';
import AltarImgWebp from '../assets/images/altar/altar.webp';
import HandImg from '../assets/images/altar/hand.png';
import HandImgWebp from '../assets/images/altar/hand.webp';
import BoardImg from '../assets/images/altar/board.png';
import BoardImgWebp from '../assets/images/altar/board.webp';

const Altar = ({ isSupportWebp }) => {
    const [showItem, setShowItem] = useState({ name: '', list: [] });
    const [choiseUrn, setChoiseUrn] = useState({});
    const [choiseBone, setChoiseBone] = useState([]);
    const { connected, account } = useWalletContext();
    const address = account && account.address;

    const [result, reexecuteQuery] = useQuery({
        query: queryAltarData,
        variables: {
            address,
            offset: 0,
        },
    });

    const { data, fetching, error } = result;
    console.log('data: ', data);
    const UrnList = data && data?.current_token_ownerships?.filter((item) => item?.name === 'urn' || item?.name === 'golden urm');
    // TODO: ask rick about bone name
    const boneNameList = ['chest', 'leg'];
    const boneList = data && data?.current_token_ownerships?.filter((item) => boneNameList.includes(item?.name));

    useEffect(() => {
        if (connected) {
            reexecuteQuery();
        }
    }, [connected, reexecuteQuery]);

    const showItemHandler = async (item) => {
        if (item === 'urn') {
            console.log('UrnList: ', UrnList);
            setShowItem({
                name: 'urn',
                list: UrnList,
            });
        } else {
            console.log('boneList: ', boneList);
            setShowItem({
                name: 'bone',
                list: boneList,
            });
        }
    };

    const putInHandler = () => {
        console.log('todo put in contract.', choiseBone);
    };

    useEffect(() => {
        console.log('showItem: ', showItem);
    }, [showItem]);

    return (
        <Layout>
            <Box
                maxW="1920px"
                bgImage={{
                    base: isSupportWebp ? HomeBaseBgWebp.src : HomeBaseBg.src,
                    desktop: isSupportWebp ? HomeBgWebp.src : HomeBg.src,
                }}
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '768px', mid: '900px', desktop: '1080px' }}
                w={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
                position="relative"
            >
                <Box
                    w="436px"
                    position="absolute"
                    minH={{ base: '688px' }}
                    bottom="9vh"
                    right={{ base: '10%', desktop: '22%' }}
                >
                    <Box
                        bgImage={{
                            base: isSupportWebp ? AltarImgWebp.src : AltarImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '314px' }}
                        minH={{ base: '537px' }}
                        position="absolute"
                        bottom="0"
                    />
                    <Box
                        bgImage={{
                            base: isSupportWebp ? HandImgWebp.src : HandImg.src,
                        }}
                        minH={{ base: '420px' }}
                        w={{ base: '244px' }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        position="absolute"
                        bottom="32vh"
                        top={{ base: '1rem' }}
                        right={{ base: '0' }}
                    >
                        <Flex justifyContent="flex-end" mt="4rem" wrap="wrap" pr="2rem">
                            <Text
                                pr="1rem"
                                w="100%"
                                textAlign="right"
                                color="#794D0B"
                                fontSize="24px"
                                fontWeight={700}
                                mb="0.9rem"
                                mt="0.9rem"
                            >
                                {
                                    choiseUrn?.current_token_data?.default_properties?.ASH ?? '- -'
                                }
                                {
                                    choiseUrn?.current_token_data?.default_properties?.ASH && ' %'
                                }
                            </Text>
                            <Button
                                variant="putIn"
                                isDisabled={!connected || isEmpty(choiseUrn)}
                                isLoading={fetching}
                                onClick={putInHandler}
                            >
                                Put in
                            </Button>
                        </Flex>
                    </Box>

                </Box>

                <Flex
                    wrap="wrap"
                    w={{ base: '393px' }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    position="absolute"
                    top="12%"
                    left={{ base: '6.5%', mid: '24.5%' }}
                >
                    <Box
                        bgImage={{
                            base: isSupportWebp ? BoardImgWebp.src : BoardImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w="100%"
                        minH={{ base: '544px' }}
                    >
                        <Text color="#fff5ce" fontWeight={700} fontSize="24px" w="100%" mt="8%" textAlign="center">
                            Collection list
                        </Text>
                        <Text mb="32px" color="#fff5ce" fontWeight={500} fontSize="16px" w="100%" mt="12%" textAlign="center">
                            Come on, bro. Your family need a rez.
                        </Text>
                        <Flex justifyContent="space-evenly" p="0 30px" mb="20px">
                            <Box position="relative">
                                <Image alt="img" src={isSupportWebp ? UrnItemImgWebp.src : UrnItemImg.src} />
                                {
                                    !isEmpty(choiseUrn?.current_token_data?.default_properties?.ASH) && (
                                        <Text
                                            position="absolute"
                                            top="10px"
                                            right="10px"
                                            fontSize="12px"
                                            color="#FFF3CD"
                                            fontWeight="600"
                                        >
                                            {
                                                choiseUrn?.current_token_data?.default_properties?.ASH
                                            }%
                                        </Text>
                                    )
                                }

                            </Box>
                            <Flex wrap="wrap" w="40%" justifyContent="flex-start">
                                <Text fontSize="18px" fontWeight={700} color="#FFF3CD" w="100%">
                                    Urn list
                                </Text>
                                <Text mt="12px" fontSize="14px" fontWeight={400} color="#FFF3CD" w="100%">
                                    You can choose the urn.
                                </Text>
                                <Button
                                    mt="12px"
                                    variant="primary"
                                    onClick={() => showItemHandler('urn')}
                                    isDisabled={!connected}
                                    isLoading={fetching}
                                >
                                    Select urn
                                </Button>
                            </Flex>
                        </Flex>
                        <Flex justifyContent="space-evenly" p="0 30px" mb="20px">
                            <Box>
                                <Image alt="img" src={isSupportWebp ? SkullItemImgWebp.src : SkullItemImg.src} />
                            </Box>
                            <Flex wrap="wrap" w="40%" justifyContent="flex-start">
                                <Text fontSize="18px" fontWeight={700} color="#FFF3CD" w="100%">
                                    Bone list
                                </Text>
                                <Text mt="12px" fontSize="14px" fontWeight={400} color="#FFF3CD" w="100%">
                                    You can choose the bone.
                                </Text>
                                <Button
                                    mt="12px"
                                    variant="primary"
                                    onClick={() => showItemHandler('bone')}
                                    isDisabled={!connected || isEmpty(choiseUrn)}
                                    isLoading={fetching}
                                >
                                    Select bone
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                    <Flex
                        mt="1.5rem"
                        bgImage={{
                            base: isSupportWebp ? CardBrandImgWebp.src : CardBrandImg.src,
                        }}
                        w="100%"
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        h="167px"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {
                            isEmpty(showItem.name) && (
                                <Text color="#FFF3CD" textAlign="center" fontSize="16px" fontWeight={400}>
                                    Hey, you are not select yet. Need some help?
                                </Text>
                            )
                        }
                        {
                            !(isEmpty(showItem.name)) && (
                                isEmpty(showItem.list) ? (
                                    <Text color="#FFF3CD" textAlign="center" fontSize="16px" fontWeight={400}>
                                        Poor guy. You don&apos;t have anything.
                                    </Text>
                                ) : (
                                    <Carousel
                                        NftList={showItem}
                                        choiseItem={showItem.name === 'urn' ? choiseUrn : choiseBone}
                                        selectItem={(item) => {
                                            console.log('item: ', item);
                                            if (showItem.name === 'urn') {
                                                setChoiseUrn(item);
                                            }
                                            if (showItem.name === 'bone') {
                                                setChoiseBone(item);
                                            }
                                        }}
                                    />
                                )
                            )
                        }
                    </Flex>
                </Flex>

            </Box>
        </Layout>
    );
};

Altar.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
};
export default Altar;
