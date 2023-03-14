/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Flex, Text, Button, Grid } from '@chakra-ui/react';
import Layout from '../layout';
import HomeBg from '../assets/images/faq/faq_bg.png';
import StoneImg from '../assets/images/faq/faq_stone.png'
import TombstoneImg from '../assets/images/faq/faq_tombstone.png'
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
            minH={{ base: '860px' }}
            position="relative"
        >
            <Box
                bgImage={TombstoneImg}
                w="42.8rem"
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '56.5rem' }}
                position="absolute"
                bottom="0"
                left={{ base: '35%' }}
            />
            <Box
                bgImage={StoneImg}
                w="100%"
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '18.4rem' }}
                position="absolute"
                bottom="0"
            />
        </Box>
    </Layout>
);

export default Altar;
