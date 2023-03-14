import React from 'react';
import { Box, Text, Button, Grid } from '@chakra-ui/react';
import Layout from '../layout';
import HomeBg from '../assets/images/home/home_bg.png';
import SoilImg from '../assets/images/home/home_soil.png';
import ShovelImg from '../assets/images/home/home_shovel.png';
import TombstoneImg from '../assets/images/home/home_tombstone.png';

const Landing = () => (
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
        w="35.3rem"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        minH={{ base: '47.5vh' }}
        position="absolute"
        bottom="0px"
        right="29.5%"
        textAlign="center"
        pt="3%"
      >
        <Text fontSize="32px" fontWeight={700} color="#FFF5CE">
          Urn to earn
        </Text>
        <Text mt="16px" fontSize="16px" fontWeight={500} color="#FFF5CE">
          Fine. You can start playing, I&apos;m tired to explain.
        </Text>
        <Grid w="100%" justifyContent="center">
          <Button zIndex={2} mt="20px" mb="16px">
            Get in
          </Button>
          <Button zIndex={2}>FAQ</Button>
        </Grid>
      </Box>
      <Box
        bgImage={ShovelImg}
        w="17rem"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        minH={{ base: '25.5rem' }}
        position="absolute"
        bottom="0px"
        right={{ base: '23%' }}
      />
      <Box
        bgImage={SoilImg}
        w="100%"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        minH={{ base: '47.5vh' }}
        position="absolute"
        bottom="0px"
      />
    </Box>
  </Layout>
);

export default Landing;
