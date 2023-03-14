/* eslint-disable no-shadow */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Flex, Text, Button, Grid } from '@chakra-ui/react';
import Layout from '../layout';
import HomeBg from '../assets/images/faq/faq_bg.png';
import StoneImg from '../assets/images/faq/faq_stone.png'
import TombstoneImg from '../assets/images/faq/faq_tombstone.png'
import { ReactComponent as MediaIcon } from '../assets/images/faq/Media.svg';

const FAQ_LIST = [{
    title: 'What will I earn?'
}, {
    title: 'Fun and a god damn cool NFT'
}, {
    title: 'Will you rug?'
}, {
    title: 'Nah, soft rug at most'
}, {
    title: 'What will happen if I fill the urn?'
}, {
    title: 'Congrats, your grandma lives on-chain permanently.'
}]

const Altar = () => (
    <Layout>
        <Box
            maxW="1920px"
            bgImage={HomeBg}
            w="100%"
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            minH={{ base: window.innerHeight < 860 ? '860px' : '100vh' }}
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
            >
                <Grid position="absolute" bottom="15%" textAlign="center" justifyItems="center" w="85%">
                    <Text color="#FFF3CD" fontSize="28px" fontWeight={700}>
                        Need some help?
                    </Text>
                    <Grid w="60%" mt="32px" gap="18px">
                        {
                            FAQ_LIST.map(item => (
                                <Flex textAlign="left" key={item.title}>
                                    <MediaIcon /> <Text color="#CCC2A1" fontSize="16px" fontWeight={500}>{item.title}</Text>
                                </Flex>
                            ))
                        }
                    </Grid>
                </Grid>
            </Box>
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
