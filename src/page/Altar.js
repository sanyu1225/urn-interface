/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Flex, Text, Button, Grid } from '@chakra-ui/react';
import Layout from '../layout';
import HomeBg from '../assets/images/altar/altar_bg.png';
import CardBrandImg from '../assets/images/altar/cardbrand.png';
import BoardSmallImg from '../assets/images/merchant/merchant_board_small.png';
import BoardImg from '../assets/images/altar/board.png';
import { ReactComponent as BowlImg } from '../assets/images/merchant/bowl.svg';

const Altar = () => (
    <Layout>
        <Box
            maxW="1920px"
            bgImage={HomeBg}
            w="100%"
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            minH={{ base: '100vh' }}
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
            <Flex
                wrap="wrap"
                w="24.6rem"
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                position="absolute"
                top="10rem"
                left={{ base: '24.5%' }}
            >
                <Box
                    bgImage={BoardImg}
                    w="100%"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '34rem' }}
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
                    mt="1.5rem"
                    bgImage={CardBrandImg}
                    w="100%"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '10.5rem' }}
                />
            </Flex>

        </Box>
    </Layout>
);

export default Altar;
