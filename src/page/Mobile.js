
import React from 'react';
import { Flex, Text, Grid } from '@chakra-ui/react';
import Layout from '../layout';
import { ReactComponent as MobileIcon } from '../assets/images/mobileIcon.svg';

const Mobile = () => (
    <Layout>
        <Flex
            maxW="1920px"
            bgColor="#1E1E1E"
            w="100%"
            minH={{ base: '100vh' }}
            position="relative"
            justifyContent="center"
            alignItems="center"
        >
            <Grid gridAutoColumns="row" justifyItems="center">
                <MobileIcon />
                <Text color="#FFF3CD" fontSize="28px" fontWeight={700} mt="42px" mb="20px">
                    Desktop only
                </Text>
                <Text color="#FFF3CD" fontSize="16px" fontWeight={400}>
                    Please access on your computer / laptop.
                </Text>
            </Grid>


        </Flex>
    </Layout>
);

export default Mobile;
