import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text, Button, Grid, Link } from '@chakra-ui/react';
import Layout from '../layout';
import HomeBg from '../assets/images/home/home_bg.png';
import HomeBgWebp from '../assets/images/home/home_bg.webp';
import HomeBaseBg from '../assets/images/home/home_1440.jpg';
import HomeBaseBgWebp from '../assets/images/home/home_1440.webp';
import SoilImg from '../assets/images/home/home_soil.png';
import ShovelImg from '../assets/images/home/home_shovel.png';
import TombstoneImg from '../assets/images/home/home_tombstone.png';

const Landing = ({ isSupportWebp }) => (
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
        bgImage={TombstoneImg}
        w="35.3rem"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        minH={{ base: '38.5vh', desktop: '47.5vh' }}
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
          <Button
            as={Link}
            href="/graveyard"
            zIndex={2}
            mt="20px"
            mb="16px"
          >
            Get in
          </Button>
          <Button
            as={Link}
            href="/faq"
            zIndex={2}
          >
            FAQ
          </Button>
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
        minH={{ base: '35.5vh', desktop: '47.5vh' }}
        position="absolute"
        bottom="0px"
      />
    </Box>
  </Layout>
);

Landing.prototype = {
  isSupportWebp: PropTypes.bool.isRequired,
}
export default Landing;
