import { useEffect, useState } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import useSound from 'use-sound';
import { useWalletContext } from '../context';
import { fadeIn } from '../utils/animation';
import Layout from '../layout';
import HomeBg from '../assets/images/merchant/merchant_bg.png';
import HomeBgWebp from '../assets/images/merchant/merchant_bg.webp';
import HomeBaseBg from '../assets/images/merchant/merchant_1024.jpg';
import HomeBaseBgWebp from '../assets/images/merchant/merchant_1024.webp';
import Home1440Bg from '../assets/images/merchant/merchant_1440.png';
import Home1440BgWebp from '../assets/images/merchant/merchant_1440.webp';
import FurnaceImg from '../assets/images/merchant/merchant_furnace.png';
import FurnaceImgWebp from '../assets/images/merchant/merchant_furnace.webp';
import BoardSmallImg from '../assets/images/merchant/merchant_board_small.png';
import BoardSmallImgWebp from '../assets/images/merchant/merchant_board_small.webp';
import SkullImg from '../assets/images/merchant/merchant_skull.png';
import SkullImgWebp from '../assets/images/merchant/merchant_skull.webp';
import BoardBigImg from '../assets/images/merchant/merchant_board_big.png';
import BoardBigImgWebp from '../assets/images/merchant/merchant_board_big.webp';
import FireImg from '../assets/images/merchant/fire.png';
import BowlImg from '../assets/images/merchant/bowl.svg';
import ButtonClickAudio from '../assets/music/clickButton.mp3';
import FireAudio from '../assets/music/fire.mp3';

const shovelMintingPrice = '1000000';
const urnMintingPrice = '10000000';

const Merchant = ({ isSupportWebp }) => {
    const { mint, connected, getAptBalance, waitForTransaction } = useWalletContext();
    const [playButton] = useSound(ButtonClickAudio);
    const [playFire, { stop }] = useSound(FireAudio);
    const [showFire, setShowFire] = useState(false);
    const [isShovelEnabled, setIsShovelEnabled] = useState(false);
    const [isUrnEnabled, setIsUrnEnabled] = useState(false);

    const checkMintEnabled = async () => {
        const aptBalance = await getAptBalance();
        if (!aptBalance) return;
        if (aptBalance > BigInt(shovelMintingPrice)) {
            setIsShovelEnabled(true);
        } else {
            setIsShovelEnabled(false);
        }
        if (aptBalance > BigInt(urnMintingPrice)) {
            setIsUrnEnabled(true);
        } else {
            setIsUrnEnabled(false);
        }
    };

    const mintShovelButtonText = () => {
        if (connected) {
            return isShovelEnabled ? 'Buy shovel' : 'Poor guy';
        }
        return 'connect wallet';
    };

    const mintUrnButtonText = () => {
        if (connected) {
            return isUrnEnabled ? 'Buy urn' : 'Poor guy';
        }
        return 'connect wallet';
    };

    useEffect(() => {
        if (!connected) return;
        checkMintEnabled();
    }, [connected]);

    const clickFireHandler = () => {
        setShowFire(true);
        playFire();
        setTimeout(() => {
            setShowFire(false);
            stop();
        }, 5000);
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
                    bgImage={{
                        base: isSupportWebp ? BoardSmallImgWebp.src : BoardSmallImg.src,
                    }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w={{ base: '193px', mid: '246px' }}
                    h={{ base: '281px', mid: '358px' }}
                    position="absolute"
                    bottom={{ base: '35vh', mid: '34vh', desktop: '32vh' }}
                    right={{ base: '4%', mid: '3.5%', desktop: '12%' }}
                >
                    <Flex
                        justifyContent="center"
                        mt={{ base: '3rem', mid: '4.5rem', desktop: '5rem' }}
                        wrap="wrap"
                        p={{ base: '0 29px', mid: '0 49px' }}
                        pb="2.3rem"
                    >
                        <Text
                            w="100%"
                            textAlign="center"
                            color="#794D0B"
                            fontSize={{ base: '16px', mid: '20px' }}
                            fontWeight={700}
                            mb={{ base: '10px', mid: '14px', desktop: '14px' }}

                        >
                            Golden urn
                        </Text>
                        <Image src={BowlImg} alt="Bowl" />
                        <Text
                            w="100%"
                            textAlign="center"
                            color="#794D0B"
                            fontSize="14px"
                            fontWeight={500}
                            mb={{ base: '10px', mid: '14px', desktop: '14px' }}
                            mt={{ base: '10px', mid: '14px', desktop: '14px' }}
                            lineHeight={{ base: '20px' }}
                        >
                            it&apos;s lame without the golden urn.
                        </Text>
                        <Button
                            variant="gold"
                            onClick={() => {
                                mint('mint_golden_bone');
                                playFire();
                            }}
                            w={{ base: '140px', mid: '148px' }}
                        >
                            Forge
                        </Button>
                    </Flex>
                </Box>
                <Box
                    bgImage={{
                        base: isSupportWebp ? FurnaceImgWebp.src : FurnaceImg.src,
                    }}
                    w={{ base: '287px', mid: '389px', desktop: '24.4rem' }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '42.3vh' }}
                    position="absolute"
                    bottom="0px"
                    right={{ base: '13%', mid: '12%', desktop: '19%' }}
                    onClick={clickFireHandler}
                    cursor="pointer"
                />
                <Box
                    bgImage={{
                        base: FireImg.src,
                    }}
                    w={{ base: '72px' }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '137px' }}
                    position="absolute"
                    bottom="39vh"
                    right={{ base: '26%' }}
                    display={showFire ? 'block' : 'none'}
                    animation={`${fadeIn} 2s linear `}
                />
                <Flex
                    wrap="wrap"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w="34.8rem"
                    position="absolute"
                    bottom="0px"
                    right={{ base: '42%' }}
                    justifyContent="center"
                >
                    <Box
                        bgImage={{
                            base: isSupportWebp ? BoardBigImgWebp.src : BoardBigImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '436px', mid: '556px', desktop: '556px' }}
                        h={{ base: '319px', mid: '406px', desktop: '406px' }}
                    >
                        <Flex justifyContent="space-evenly" mt={{ base: '8rem', mid: '10rem', desktop: '10rem' }}>
                            <Flex wrap="wrap" w="40%" bg="#FCD791" borderRadius="20px" p={{ base: '14px', mid: '16px' }} justifyContent="center">
                                <Text fontSize={{ base: '16px', mid: '20px' }} fontWeight={700} color="#292229" textAlign="center" w="100%">
                                    Buy shovel / {Number(shovelMintingPrice) / Number(10 ** 8)} APT
                                </Text>
                                <Text mt={{ base: '10px', mid: '12px' }} fontSize={{ base: '14px', mid: '20px' }} fontWeight={500} color="#292229" textAlign="center" w="100%">
                                    Every grave robber needs a shovel.
                                </Text>
                                <Button
                                    height={{ base: '47px' }}
                                    mt={{ base: '10px', mid: '12px' }}
                                    variant="dark"
                                    onClick={async () => {
                                        const tx = await mint('mint_shovel');
                                        await waitForTransaction(tx);
                                        playButton();
                                        checkMintEnabled();
                                    }}
                                    isDisabled={!isShovelEnabled}
                                >
                                    {mintShovelButtonText()}
                                </Button>
                            </Flex>
                            <Flex wrap="wrap" w="40%" bg="#FCD791" borderRadius="20px" p={{ base: '14px', mid: '16px' }} justifyContent="center">
                                <Text fontSize={{ base: '16px', mid: '20px' }} fontWeight={700} color="#292229" textAlign="center" w="100%">
                                    Buy urn / {Number(urnMintingPrice) / Number(10 ** 8)} APT
                                </Text>
                                <Text mt={{ base: '10px', mid: '12px' }} fontSize={{ base: '14px', mid: '20px' }} fontWeight={500} color="#292229" textAlign="center" w="100%">
                                    I think... you need an urn for bones.
                                </Text>
                                <Button
                                    height={{ base: '47px' }}
                                    mt={{ base: '10px', mid: '12px' }}
                                    variant="dark"
                                    onClick={async () => {
                                        const tx = await mint('mint_urn');
                                        await waitForTransaction(tx);
                                        playButton();
                                        checkMintEnabled();
                                    }}
                                    isDisabled={!isUrnEnabled}
                                >
                                    {mintUrnButtonText()}
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box
                        bgImage={{
                            base: isSupportWebp ? SkullImgWebp.src : SkullImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '362px', mid: '491px' }}
                        h={{ base: '381px', mid: '517px' }}
                    />
                </Flex>

            </Box>
        </Layout>
    );
};

Merchant.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
};
export default Merchant;
