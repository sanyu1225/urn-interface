import React from 'react';
import { Box, Flex, Text, Button, Link } from '@chakra-ui/react';
import HomeBg from '../assets/images/graveyard/graveyard_bg.png';
import TombstoneImg from '../assets/images/graveyard/tombstone.png'
import SignpostImg from '../assets/images/graveyard/signpost.png'
import { ReactComponent as SkullImg } from '../assets/images/graveyard/skull.svg';
import Layout from '../layout';

const CustomLink = ({ children, path, mt, disabled = false }) => (
    <Link
        w="100%"
        href={path}
        mt={mt}
        color={disabled ? "rgba(243, 243, 243, 0.6)" : "#F3F3F3"}
        cursor={disabled ? "not-allowed" : "pointer"}
        fontSize="18px"
        fontWeight={700}
        lineHeight="22px"
        _hover={{
            textDecoration: "none",
            transform: 'scale(0.98)',
        }}
        _active={{
            transform: 'scale(0.96)',
        }}
    >
        {children}
    </Link>
)

const Graveyard = () => (
    <Layout>
        <Box
            bgImage={HomeBg}
            w="100%"
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            minH={{ base: '100vh' }}
            position="relative"
        >

            <Box
                bgImage={TombstoneImg}
                w="16rem"
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '33.4vh' }}
                position="absolute"
                bottom="13%"
                right={{ base: '37%' }}
            >
                <Flex justifyContent="center" mt="6rem" wrap="wrap" p="0 49px">
                    <SkullImg />
                    <Text w="100%" textAlign="center" color="#F3F3F3" fontSize="14px" fontWeight={500} mb="14px" mt="14px">
                        Haha...look<br /> what I can get
                    </Text>
                    <Button variant="lightGray">
                        Dig
                    </Button>
                </Flex>
            </Box>
            <Flex
                bgImage={SignpostImg}
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '62.4vh' }}
                position="absolute"
                bottom="0"
                right={{ base: '6%' }}
                w="26rem"
                wrap="wrap"
                alignItems="center"
                pt="2.5rem"
                pl="12rem"
            >

                <CustomLink path="/merchant" >Go to merchant</CustomLink>
                <CustomLink mt="-9rem" path="/altar">Go to altar</CustomLink>
                <CustomLink mt="-15rem" path="#" disabled>Go to teleport<br />(Coming soon)</CustomLink>
            </Flex>

        </Box>
    </Layout>
);

export default Graveyard;
