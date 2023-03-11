import React from 'react';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import HomeBg from '../assets/images/graveyard/graveyard_bg.png';
import TombstoneImg from '../assets/images/graveyard/tombstone.png'
import { ReactComponent as SkullImg } from '../assets/images/graveyard/skull.svg';
import Layout from '../layout';

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


        </Box>
    </Layout>
);

export default Graveyard;
