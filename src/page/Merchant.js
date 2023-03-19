import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import useCusToast from '../hooks/useCusToast';
import Layout from '../layout';
import HomeBg from '../assets/images/merchant/merchant_bg.png';
import HomeBgWebp from '../assets/images/merchant/merchant_bg.webp';
import HomeBaseBg from '../assets/images/merchant/merchant_1440.png';
import HomeBaseBgWebp from '../assets/images/merchant/merchant_1440.webp';
import FurnaceImg from '../assets/images/merchant/merchant_furnace.png';
import FurnaceImgWebp from '../assets/images/merchant/merchant_furnace.webp';
import BoardSmallImg from '../assets/images/merchant/merchant_board_small.png';
import BoardSmallImgWebp from '../assets/images/merchant/merchant_board_small.webp';
import SkullImg from '../assets/images/merchant/merchant_skull.png';
import SkullImgWebp from '../assets/images/merchant/merchant_skull.webp';
import BoardBigImg from '../assets/images/merchant/merchant_board_big.png';
import BoardBigImgWebp from '../assets/images/merchant/merchant_board_big.webp';
import { ReactComponent as BowlImg } from '../assets/images/merchant/bowl.svg';




const Merchant = ({ isSupportWebp }) => {

    const { toastSeccess, toastError } = useCusToast()

    const buyShovel = () => {
        toastSeccess('success')
    }
    const buyUrn = () => {
        toastError('error')
    }
    return (
        <Layout>
            <Box
                maxW="1920px"
                bgImage={{
                    base: isSupportWebp ? HomeBaseBgWebp : HomeBaseBg,
                    desktop: isSupportWebp ? HomeBgWebp : HomeBg
                }}
                w="100%"
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: window.innerHeight < 860 ? '860px' : '100vh' }}
                minW={{ base: '1440px' }}
                position="relative"
            >
                <Box
                    bgImage={{
                        base: isSupportWebp ? BoardSmallImgWebp : BoardSmallImg,
                    }}
                    w="15.4rem"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '33.2vh' }}
                    position="absolute"
                    bottom="32vh"
                    right={{ base: '12%' }}
                >
                    <Flex justifyContent="center" mt="4rem" wrap="wrap" p="0 49px" pb="2.3rem">
                        <Text w="100%" textAlign="center" color="#794D0B" fontSize="20px" fontWeight={700} mb="0.9rem">
                            Golden urn
                        </Text>
                        <BowlImg />
                        <Text w="100%" textAlign="center" color="#794D0B" fontSize="14px" fontWeight={500} mb="0.9rem" mt="0.9rem">
                            it&apos;s lame without the golden urn.
                        </Text>
                        <Button variant="gold">
                            Forge
                        </Button>
                    </Flex>
                </Box>
                <Box
                    bgImage={{
                        base: isSupportWebp ? FurnaceImgWebp : FurnaceImg,
                    }}
                    w="24.4rem"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '42.3vh' }}
                    position="absolute"
                    bottom="0px"
                    right={{ base: '19%' }}
                />
                <Flex
                    wrap="wrap"
                    w="34.8rem"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '42.3vh' }}
                    position="absolute"
                    bottom="0px"
                    right={{ base: '42%' }}
                >
                    <Box
                        bgImage={{
                            base: isSupportWebp ? BoardBigImgWebp : BoardBigImg
                        }}
                        w="100%"
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        minH={{ base: '25.4rem' }}
                    >

                        <Flex justifyContent="space-evenly" mt="10rem">
                            <Flex wrap="wrap" w="40%" bg="#FCD791" borderRadius="20px" p="16px" justifyContent="center">
                                <Text fontSize="20px" fontWeight={700} color="#292229" textAlign="center" w="100%" >
                                    Buy shovel
                                </Text>
                                <Text mt="12px" fontSize="20px" fontWeight={500} color="#292229" textAlign="center" w="100%">
                                    Every grave robber needs a shovel.
                                </Text>
                                <Button mt="12px" variant="dark" onClick={buyShovel}>
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
                                <Button mt="12px" variant="dark" onClick={buyUrn}>
                                    Buy urn
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box
                        bgImage={{
                            base: isSupportWebp ? SkullImgWebp : SkullImg
                        }}
                        w="88.2%"
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        minH={{ base: '48vh' }}
                    />
                </Flex>

            </Box>
        </Layout>
    )
};

Merchant.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
}
export default Merchant;
