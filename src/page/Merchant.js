/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Flex, Text, Button, Grid } from '@chakra-ui/react';
import Layout from '../layout';
import HomeBg from '../assets/images/merchant/merchant_bg.png';
import FurnaceImg from '../assets/images/merchant/merchant_furnace.png';
import BoardSmallImg from '../assets/images/merchant/merchant_board_small.png';
import SkullImg from '../assets/images/merchant/merchant_skull.png';
import BoardBigImg from '../assets/images/merchant/merchant_board_big.png';
import { ReactComponent as BowlImg } from '../assets/images/merchant/bowl.svg';

const Merchant = () => (
    <Layout>
        <Box
            maxW="1920px"
            bgImage={HomeBg}
            w="100%"
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            minH={{ base: '860px' }}
            position="relative"
        >

            <Box
                bgImage={BoardSmallImg}
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
                bgImage={FurnaceImg}
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
                    bgImage={BoardBigImg}
                    w="100%"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '25.4rem' }}
                >

                    <Flex justifyContent="space-evenly" mt="10rem">
                        <Flex wrap="wrap" w="40%" bg="#FCD791" borderRadius="20px" p="16px" justifyContent="center">
                            <Text fontSize="20px" fontWeight={700} color="#292229" textAlign="center" w="100%">
                                Buy shovel
                            </Text>
                            <Text mt="12px" fontSize="20px" fontWeight={500} color="#292229" textAlign="center" w="100%">
                                Every grave robber needs a shovel.
                            </Text>
                            <Button mt="12px" variant="dark">
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
                            <Button mt="12px" variant="dark">
                                Buy urn
                            </Button>
                        </Flex>
                    </Flex>
                </Box>
                <Box
                    bgImage={SkullImg}
                    w="88.2%"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '48vh' }}
                />
            </Flex>

        </Box>
    </Layout>
);

export default Merchant;
