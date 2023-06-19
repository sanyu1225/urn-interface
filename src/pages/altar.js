/* eslint-disable max-len */

/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useQuery } from 'urql';
import useSound from 'use-sound';

import { Box, Button, Flex, Image, Text } from '@chakra-ui/react';
import AltarImg from '../assets/images/altar/altar.png';
import AltarImgWebp from '../assets/images/altar/altar.webp';
import HomeBaseBg from '../assets/images/altar/altar_1024.jpg';
import HomeBaseBgWebp from '../assets/images/altar/altar_1024.webp';
import Home1440Bg from '../assets/images/altar/altar_1440.jpg';
import Home1440BgWebp from '../assets/images/altar/altar_1440.webp';
import HomeBg from '../assets/images/altar/altar_bg.png';
import HomeBgWebp from '../assets/images/altar/altar_bg.webp';
import BoardImg from '../assets/images/altar/board.png';
import BoardImgWebp from '../assets/images/altar/board.webp';
import CardBrandImg from '../assets/images/altar/cardbrand.png';
import CardBrandImgWebp from '../assets/images/altar/cardbrand.webp';
import GhostImg from '../assets/images/altar/ghost.png';
import GhostImgWebp from '../assets/images/altar/ghost.webp';
import HandImg from '../assets/images/altar/hand.png';
import HandImgWebp from '../assets/images/altar/hand.webp';
import SkullItemImg from '../assets/images/altar/skull_item.png';
import SkullItemImgWebp from '../assets/images/altar/skull_item.webp';
import UrnItemImg from '../assets/images/altar/urn_item.png';
import UrnItemImgWebp from '../assets/images/altar/urn_item.webp';
import ButtonClickAudio from '../assets/music/clickButton.mp3';
import LaughAudio from '../assets/music/laugh.mp3';
import { CREATOR_ADDRESS, queryAltarData } from '../constant';
import { useWalletContext } from '../context';
import Layout from '../layout';

import Carousel from '@/component/Carousel';
import { isEmpty } from '@/plugin/lodash';
import { fadeup } from '@/utils/animation';

const Altar = ({ isSupportWebp }) => {
    const [showItem, setShowItem] = useState({ name: '', list: [] });
    const [choiseUrn, setChoiseUrn] = useState({});
    const [choiseBone, setChoiseBone] = useState([]);
    const [boneList, setBoneList] = useState([]);
    const [showGhost, setShowGhost] = useState(false);
    const [playLaugh, { stop }] = useSound(LaughAudio);
    const [playButton] = useSound(ButtonClickAudio);

    const { connected, account, mint } = useWalletContext();
    const address = account && account.address;

    const [result, reexecuteQuery] = useQuery({
        query: queryAltarData,
        variables: {
            address,
            creator_address: CREATOR_ADDRESS,
        },
    });

    const { data, fetching, error } = result;
    console.log('data: ', data);
    console.log('error: ', error);
    const UrnList = data && data?.current_token_ownerships?.filter((item) => item?.name === 'urn' || item?.name === 'golden_urn');

    useEffect(() => {
        if (connected) {
            reexecuteQuery();
        } else {
            setChoiseUrn({});
            setChoiseBone([]);
            setShowItem({ name: '', list: [] });
        }
    }, [connected, reexecuteQuery]);

    useEffect(() => {
        if (choiseUrn?.length === 0) {
            return;
        }
        let boneNameList = [];
        if (choiseUrn.name === 'urn') {
            boneNameList = ['arm', 'leg', 'hip', 'chest', 'skull'];
        }
        if (choiseUrn.name === 'golden_urn') {
            boneNameList = ['golden arm', 'golden leg', 'golden hip', 'golden chest', 'golden skull'];
        }
        const boneList = data && data?.current_token_ownerships?.filter((item) => boneNameList.includes(item?.name));
        setBoneList(boneList);
    }, [choiseUrn, data]);

    const showItemHandler = async (item) => {
        playButton();
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
    const functionNameMap = {
        urn: 'burn_and_fill',
        golden_urn: 'burn_and_fill_golden',
    };

    const putInHandler = async () => {
        console.log('todo put in contract.', choiseBone);
        console.log('todo put in contract.', choiseUrn);

        const params = [
            choiseUrn.property_version,
            choiseBone.property_version,
            choiseBone.current_token_data.name,
        ];

        const functionName = functionNameMap[choiseUrn.name];
        if (!functionName) return;

        const res = await mint(functionName, params);
        console.log('res: ', res);

        if (!res) return;

        setTimeout(reexecuteQuery, 3000);
    };

    useEffect(() => {
        console.log('showItem: ', showItem);
    }, [showItem]);

    const showGhostHandler = () => {
        playLaugh();
        setShowGhost(true);
        setTimeout(() => {
            setShowGhost(false);
            stop();
        }, 5000);
    };

    const isUrnEnabled = () => {
        if (!connected) return false;
        return UrnList && UrnList.length > 0;
    };

    const urnButtonText = () => {
        if (!connected) return 'Connect wallet';
        if (UrnList && UrnList.length > 0) {
            return 'Select urn';
        }
        return 'Buy one first';
    };

    return (
        <Layout>
            <Box
                maxW="1920px"
                bgImage={{
                    base: isSupportWebp ? HomeBaseBgWebp.src : HomeBaseBg.src,
                    mid: isSupportWebp ? Home1440BgWebp.src : Home1440Bg.src,
                    desktop: isSupportWebp ? HomeBgWebp.src : HomeBg.src,
                }}
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '768px', mid: '900px', desktop: '1080px' }}
                w={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
                position="relative"
            >
                <Box
                    w={{ base: '323px', mid: '436px' }}
                    position="absolute"
                    minH={{ base: '688px' }}
                    bottom="9vh"
                    right={{ base: '7%', desktop: '22%' }}
                >
                    <Box
                        bgImage={{
                            base: isSupportWebp ? AltarImgWebp.src : AltarImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '233px', mid: '314px' }}
                        minH={{ base: '400px', mid: '537px' }}
                        position="absolute"
                        bottom="0"
                        onClick={showGhostHandler}
                        cursor="pointer"
                    />
                    <Box
                        bgImage={{
                            base: isSupportWebp ? GhostImgWebp.src : GhostImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '203px' }}
                        minH={{ base: '212px' }}
                        position="absolute"
                        left="-50px"
                        top="60px"
                        display={showGhost ? 'block' : 'none'}
                        animation={`${fadeup} 2s linear `}
                    />
                    <Box
                        bgImage={{
                            base: isSupportWebp ? HandImgWebp.src : HandImg.src,
                        }}
                        h={{ base: '360px', mid: '420px' }}
                        w={{ base: '244px', mid: '244px' }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        position="absolute"
                        bottom="32vh"
                        top={{ base: '100px', mid: '5px' }}
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
                                {choiseUrn?.token_properties?.ash ?? '- -'}
                                {choiseUrn?.token_properties?.ash && ' %'}
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
                    w={{ base: '353px', mid: '393px' }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    position="absolute"
                    top={{ base: '50px', mid: '12%' }}
                    left={{ base: '6.5%', mid: '16.5%', desktop: '24.5%' }}
                >
                    <Box
                        bgImage={{
                            base: isSupportWebp ? BoardImgWebp.src : BoardImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w="100%"
                        minH={{ base: '489px', mid: '544px' }}
                    >
                        <Text color="#fff5ce" fontWeight={700} fontSize="24px" w="100%" mt="8%" textAlign="center">
                            Collection list
                        </Text>
                        <Text
                            mb={{ base: '20px', mid: '32px' }}
                            color="#fff5ce"
                            fontWeight={500}
                            fontSize="16px"
                            w="100%"
                            mt={{ base: '25px', mid: '12%' }}
                            textAlign="center"
                        >
                            Come on, bro. Your family need a rez.
                        </Text>
                        <Flex justifyContent="space-evenly" p="0 30px" mb="20px">
                            <Box position="relative">
                                <Image alt="img" src={isSupportWebp ? UrnItemImgWebp.src : UrnItemImg.src} />
                                {!isEmpty(choiseUrn?.current_token_data?.default_properties?.ASH) && (
                                    <Text
                                        position="absolute"
                                        top="10px"
                                        right="10px"
                                        fontSize="12px"
                                        color="#FFF3CD"
                                        fontWeight="600"
                                    >
                                        {choiseUrn?.current_token_data?.default_properties?.ASH}%
                                    </Text>
                                )}
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
                                    isDisabled={!isUrnEnabled()}
                                    isLoading={fetching}
                                >
                                    {urnButtonText()}
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
                                    {connected ? 'Select bone' : 'Connect wallet'}
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                    <Flex
                        mt={{ base: '24px', mid: '1.5rem' }}
                        bgImage={{
                            base: isSupportWebp ? CardBrandImgWebp.src : CardBrandImg.src,
                        }}
                        w="100%"
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        h={{ base: '150px', mid: '167px' }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        {isEmpty(showItem.name) && (
                            <Text color="#FFF3CD" textAlign="center" fontSize="16px" fontWeight={400}>
                                Hey, you are not select yet. Need some help?
                            </Text>
                        )}
                        {!isEmpty(showItem.name)
                            && (isEmpty(showItem.list) ? (
                                <Text color="#FFF3CD" textAlign="center" fontSize="16px" fontWeight={400}>
                                    Poor guy. You don&apos;t have anything.
                                </Text>
                            ) : (
                                <Carousel
                                    NftList={showItem}
                                    choiseItem={showItem.name === 'urn' ? choiseUrn : choiseBone}
                                    selectItem={(item) => {
                                        if (showItem.name === 'urn') {
                                            setChoiseUrn(item);
                                        }
                                        if (showItem.name === 'bone') {
                                            setChoiseBone(item);
                                        }
                                    }}
                                />
                            ))}
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
