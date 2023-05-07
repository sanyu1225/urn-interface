import Image from 'next/image';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import { useWalletContext } from '../context';
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
import BowlImg from '../assets/images/merchant/bowl.svg';

const Merchant = ({ isSupportWebp }) => {
    const { mint } = useWalletContext();

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
                    w={{ base: '246px' }}
                    h={{ base: '358px' }}
                    position="absolute"
                    bottom={{ base: '32vh', mid: '34vh', desktop: '32vh' }}
                    right={{ base: '12%', mid: '3.5%', desktop: '12%' }}
                >
                    <Flex justifyContent="center" mt="4rem" wrap="wrap" p="0 49px" pb="2.3rem">
                        <Text w="100%" textAlign="center" color="#794D0B" fontSize="20px" fontWeight={700} mb="0.9rem">
                            Golden urn
                        </Text>
                        <Image src={BowlImg} alt="Bowl" />
                        <Text w="100%" textAlign="center" color="#794D0B" fontSize="14px" fontWeight={500} mb="0.9rem" mt="0.9rem">
                            it&apos;s lame without the golden urn.
                        </Text>
                        <Button variant="gold" onClick={() => mint('mint_golden_bone')}>
                            Forge
                        </Button>
                    </Flex>
                </Box>
                <Box
                    bgImage={{
                        base: isSupportWebp ? FurnaceImgWebp.src : FurnaceImg.src,
                    }}
                    w="24.4rem"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '42.3vh' }}
                    position="absolute"
                    bottom="0px"
                    right={{ base: '19%', mid: '12%', desktop: '19%' }}
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
                        w={{ base: '556px', mid: '556px', desktop: '556px' }}
                        h={{ base: '365px', mid: '365px', desktop: '406px' }}
                    >

                        <Flex justifyContent="space-evenly" mt={{ base: '8.5rem', desktop: '10rem' }}>
                            <Flex wrap="wrap" w="40%" bg="#FCD791" borderRadius="20px" p="16px" justifyContent="center">
                                <Text fontSize="20px" fontWeight={700} color="#292229" textAlign="center" w="100%">
                                    Buy shovel
                                </Text>
                                <Text mt="12px" fontSize="20px" fontWeight={500} color="#292229" textAlign="center" w="100%">
                                    Every grave robber needs a shovel.
                                </Text>
                                <Button mt="12px" variant="dark" onClick={() => mint('mint_shovel')}>
                                    Buy shovel
                                </Button>
                            </Flex>
                            <Flex wrap="wrap" w="40%" bg="#FCD791" borderRadius="20px" p="16px" justifyContent="center">
                                <Text fontSize="20px" fontWeight={700} color="#292229" textAlign="center" w="100%">
                                    Buy urn
                                </Text>
                                <Text mt="12px" fontSize="20px" fontWeight={500} color="#292229" textAlign="center" w="100%">
                                    I think... you need an urn for bones.
                                </Text>
                                <Button mt="12px" variant="dark" onClick={() => mint('mint_urn')}>
                                    Buy urn
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
