import React from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Button, Link } from '@chakra-ui/react';
import HomeBg from '../assets/images/graveyard/graveyard_1920_x2.jpg';
import HomeBgWebp from '../assets/images/graveyard/graveyard_1920_x2.webp';
import HomeBaseBg from '../assets/images/graveyard/graveyard_1440_x2.jpg';
import HomeBaseBgWebp from '../assets/images/graveyard/graveyard_1440_x2.webp';
import TombstoneImg from '../assets/images/graveyard/tombstone.png'
import TombstoneImgWebp from '../assets/images/graveyard/tombstone.webp'
import SignpostImg from '../assets/images/graveyard/signpost.png'
import SignpostImgWebp from '../assets/images/graveyard/signpost.webp'
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

const Graveyard = ({ isSupportWebp }) => (
    <Layout>
        <Box
            bgImage={{
                base: isSupportWebp ? HomeBaseBgWebp : HomeBaseBg,
                desktop: isSupportWebp ? HomeBgWebp : HomeBg
            }}
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            minH={{ base: '768px', mid: '900px', desktop: '1080px' }}
            minW={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
            position="relative"
        >
            <Box
                bgImage={{
                    base: isSupportWebp ? TombstoneImgWebp : TombstoneImg,
                }}
                w="16rem"
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '360px', mid: '360px', desktop: '360px' }}
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
                bgImage={{
                    base: isSupportWebp ? SignpostImgWebp : SignpostImg,
                }}
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
                <CustomLink mt="-15rem" path="#" disabled>Go to reincarnation<br />(Coming soon)</CustomLink>
            </Flex>

        </Box>
    </Layout>
);

Graveyard.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
}
export default Graveyard;
