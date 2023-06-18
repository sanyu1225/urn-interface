import Image from 'next/image';
import NextLink from 'next/link';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useQuery } from 'urql';
import useSound from 'use-sound';

import { Box, Button, Flex, Link, Text } from '@chakra-ui/react';

import BoneEffect1Img from '../assets/images/graveyard/bone_effect_1.png';
import BoneEffect2Img from '../assets/images/graveyard/bone_effect_2.png';
import ButtImg from '../assets/images/graveyard/butt.png';
import HomeBaseBg from '../assets/images/graveyard/graveyard_1024.jpg';
import HomeBaseBgWebp from '../assets/images/graveyard/graveyard_1024.webp';
import Home1440Bg from '../assets/images/graveyard/graveyard_1440_x2.jpg';
import Home1440BgWebp from '../assets/images/graveyard/graveyard_1440_x2.webp';
import HomeBg from '../assets/images/graveyard/graveyard_1920_x2.jpg';
import HomeBgWebp from '../assets/images/graveyard/graveyard_1920_x2.webp';
import SignpostImg1 from '../assets/images/graveyard/signpost_1.png';
import SignpostImg1Webp from '../assets/images/graveyard/signpost_1.webp';
import SignpostImg2 from '../assets/images/graveyard/signpost_2.png';
import SignpostImg2Webp from '../assets/images/graveyard/signpost_2.webp';
import SignpostImg3 from '../assets/images/graveyard/signpost_3.png';
import SignpostImg3Webp from '../assets/images/graveyard/signpost_3.webp';
import SignpostImg4 from '../assets/images/graveyard/signpost_4.png';
import SignpostImg4Webp from '../assets/images/graveyard/signpost_4.webp';
import SkullImg from '../assets/images/graveyard/skull.svg';
import TombstoneImg from '../assets/images/graveyard/tombstone.png';
import TombstoneImgWebp from '../assets/images/graveyard/tombstone.webp';
import FartAudio from '../assets/music/fart.mp3';
import { CREATOR_ADDRESS, queryShovelData } from '../constant';
import { useWalletContext } from '../context';
import Layout from '../layout';
import { bounceInAnimation } from '../utils/animation';

const CustomLink = ({ children, right, top, path, transform, disabled = false }) => (
    <Link
        as={NextLink}
        href={path}
        right={right}
        top={top}
        transform={transform}
        position="absolute"
        color={disabled ? 'rgba(243, 243, 243, 0.6)' : '#F3F3F3'}
        cursor={disabled ? 'not-allowed' : 'pointer'}
        fontSize="18px"
        fontWeight={700}
        lineHeight="22px"
        _hover={{
            textDecoration: 'none',
            transform: disabled ? 'scale(0.78)' : 'scale(0.98)',
        }}
        _active={{
            transform: 'scale(0.96)',
        }}
    >
        {children}
    </Link>
);

const Graveyard = ({ isSupportWebp }) => {
    const { connected, waitForTransaction, account, mint } = useWalletContext();
    const [showBone, setShowBone] = useState(false);
    const [showButt, setshowButt] = useState(false);
    const [playFart] = useSound(FartAudio);
    const address = account && account.address;

    const tombstoneHandler = () => {
        if (!showBone && !showButt) {
            setShowBone(true);
            setTimeout(() => {
                setShowBone(false);
            }, 3500);
        } else if (showBone && !showButt) {
            setshowButt(true);
            playFart();
            setTimeout(() => {
                setshowButt(false);
            }, 3500);
        }
    };

    const [result, reexecuteQuery] = useQuery({
        query: queryShovelData,
        variables: {
            address,
            creator_address: CREATOR_ADDRESS,
        },
    });

    const { data, fetching, error } = result;
    const shovelAmount = (data && data.current_token_ownerships[0]?.amount) ?? 0;

    console.log(`💥 data: ${JSON.stringify(data, null, ' ')}`);
    console.log(`💥 queryShovelData error: ${JSON.stringify(error, null, ' ')}`);

    const digButtonText = () => {
        if (connected) {
            return shovelAmount > 0 ? 'Dig' : 'Poor Guy';
        }
        return 'Not Connected';
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
                minH={{
                    base: '768px',
                    mid: '900px',
                    desktop: '1080px',
                }}
                minW={{
                    base: '1024px',
                    mid: '1440px',
                    desktop: '1920px',
                }}
                position="relative"
            >
                <Box
                    bgImage={{
                        base: isSupportWebp ? TombstoneImgWebp.src : TombstoneImg.src,
                    }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w={{ base: '204px', mid: '255px' }}
                    minH={{
                        base: '287px',
                        mid: '360px',
                        desktop: '360px',
                    }}
                    position="absolute"
                    bottom={{
                        base: '9%',
                        mid: '8%',
                        desktop: '13%',
                    }}
                    right={{
                        base: '39%',
                        mid: '39%',
                        desktop: '37%',
                    }}
                    onClick={tombstoneHandler}
                    cursor="pointer"
                >
                    <Flex justifyContent="center" mt={{ base: '4.5rem', mid: '6rem' }} wrap="wrap" p="0 49px">
                        <Image src={SkullImg} alt="skull" />
                        <Text
                            p={{ base: '0 10px', mid: '0' }}
                            w="100%"
                            textAlign="center"
                            color="#F3F3F3"
                            fontSize="14px"
                            fontWeight={500}
                            mb={{ base: '5px', mid: '14px' }}
                            mt={{ base: '10px', mid: '14px' }}
                        >
                            Haha...look
                            <br /> what I can get
                        </Text>
                        <Button
                            // w={{ base: '60px' }}
                            h={{ base: '39px' }}
                            variant="lightGray"
                            onClick={async () => {
                                const hash = await mint('dig');
                                if (hash) {
                                    await waitForTransaction(hash);
                                }
                                reexecuteQuery();
                            }}
                            isLoading={fetching}
                            isDisabled={!connected || shovelAmount === 0}
                        >
                            {digButtonText()}
                        </Button>
                        <Text
                            p={{ base: '0 10px', mid: '0' }}
                            w="100%"
                            textAlign="center"
                            color="#F3F3F3"
                            fontSize="14px"
                            fontWeight={500}
                            mb={{ base: '5px', mid: '14px' }}
                            mt={{ base: '10px', mid: '14px' }}
                        >
                            {shovelAmount} shovel left
                        </Text>
                    </Flex>
                    <Box
                        bgImage={{
                            base: BoneEffect1Img.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '82px' }}
                        minH={{ base: '68px' }}
                        position="absolute"
                        top={{ base: '-4%' }}
                        left={{ base: '-23%' }}
                        display={showBone ? 'block' : 'none'}
                        animation={`${bounceInAnimation} 2s linear `}
                    />
                    <Box
                        bgImage={{
                            base: BoneEffect2Img.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '51px' }}
                        minH={{ base: '55px' }}
                        position="absolute"
                        top={{ base: '-14%' }}
                        left={{ base: '14%' }}
                        display={showBone ? 'block' : 'none'}
                        animation={`${bounceInAnimation} 2s linear `}
                    />
                    <Box
                        bgImage={{
                            base: ButtImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '104px' }}
                        minH={{ base: '86px' }}
                        position="absolute"
                        top={{ base: '-7%' }}
                        right={{ base: '3%' }}
                        display={showButt ? 'block' : 'none'}
                        animation={`${bounceInAnimation} 2s linear `}
                    />
                </Box>

                <Box
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w={{ base: '327px', mid: '416px' }}
                    position="absolute"
                    bottom="0"
                    right={{ base: '0', mid: '2%' }}
                >
                    <Box
                        bgImg={{
                            base: isSupportWebp ? SignpostImg1Webp.src : SignpostImg1.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        h={{ base: '120px', mid: '130px' }}
                        w="325px"
                        position="relative"
                    >
                        <CustomLink path="/merchant" right={{ base: '28px' }} top={{ base: '68px', mid: '75px' }}>
                            Go to merchant
                        </CustomLink>
                    </Box>
                    <Box
                        bgImg={{
                            base: isSupportWebp ? SignpostImg2Webp.src : SignpostImg2.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        h={{ base: '70px', mid: '80px' }}
                        w="325px"
                        position="relative"
                    >
                        <CustomLink right={{ base: '70px' }} top={{ base: '15px', mid: '20px' }} path="/altar">
                            Go to altar
                        </CustomLink>
                    </Box>
                    <Box
                        bgImg={{
                            base: isSupportWebp ? SignpostImg3Webp.src : SignpostImg3.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        h={{ base: '95px', mid: '105px' }}
                        w="325px"
                        position="relative"
                    >
                        <CustomLink
                            path="#"
                            right={{ base: '28px' }}
                            top={{ base: '20px' }}
                            transform={{ base: 'scale(0.8)' }}
                            disabled
                        >
                            Go to reincarnation
                            <br />
                            (Coming soon)
                        </CustomLink>
                    </Box>
                    <Box
                        bgImg={{
                            base: isSupportWebp ? SignpostImg4Webp.src : SignpostImg4.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        h={{ base: '95px', mid: '105px' }}
                        w="325px"
                    />
                </Box>
            </Box>
        </Layout>
    );
};

Graveyard.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
};
export default Graveyard;
