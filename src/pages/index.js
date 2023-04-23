import PropTypes from 'prop-types';
import { Box, Text, Button, Grid, Link } from '@chakra-ui/react';
import Layout from '../layout';
import HomeBg from '@/assets/images/home/home_bg.jpg';
import HomeBgWebp from '@/assets/images/home/home_bg.webp';
import HomeBaseBg from '@/assets/images/home/home_1440.jpg';
import HomeBaseBgWebp from '@/assets/images/home/home_1440.webp';
import SoilImg from '@/assets/images/home/home_soil.png';
import SoilImgWebp from '@/assets/images/home/home_soil.webp';
import ShovelImg from '@/assets/images/home/home_shovel.png';
import ShovelImgWebp from '@/assets/images/home/home_shovel.webp';
import TombstoneImg from '@/assets/images/home/home_tombstone.png';
import TombstoneImgWebp from '@/assets/images/home/home_tombstone.webp';

const Landing = ({ isSupportWebp }) => (
  <Layout>
    <Box
      maxW="1920px"
      bgImage={{
        base: isSupportWebp ? HomeBaseBgWebp.src : HomeBaseBg.src,
        desktop: isSupportWebp ? HomeBgWebp.src : HomeBg.src,
      }}
      bgRepeat="no-repeat"
      bgSize="100% 100%"
      minH={{ base: '768', mid: '900px', desktop: '1080px' }}
      w={{ base: '1440px', mid: '1440px', desktop: '1920px' }}
      position="relative"
    >
      <Box
        bgImage={{
          base: isSupportWebp ? TombstoneImgWebp.src : TombstoneImg.src,
        }}
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        w={{ base: '388px', mid: '492px', desktop: '564px' }}
        minH={{ base: '355px', mid: '417px', desktop: '478px' }}
        position="absolute"
        bottom={{ base: 0 }}
        right="29.5%"
        textAlign="center"
        pt="3%"
      >
        <Text fontSize="32px" fontWeight={700} color="#FFF5CE">
          Urn to earn
        </Text>
        <Text mt="16px" fontSize={{ base: '14px', mid: '16px' }} fontWeight={500} color="#FFF5CE">
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
        bgImage={{
          base: isSupportWebp ? ShovelImgWebp.src : ShovelImg.src,
        }}
        w="17rem"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        minH={{ base: '355px', mid: '447px', desktop: '513px' }}
        position="absolute"
        bottom="0px"
        right={{ base: '20%', mid: '23%' }}
      />
      <Box
        bgImage={{
          base: isSupportWebp ? SoilImgWebp.src : SoilImg.src,
        }}
        w="100%"
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        minH={{ base: '276px', mid: '387px', desktop: '516px' }}
        position="absolute"
        bottom="0px"
      />
    </Box>
  </Layout>
);

Landing.prototype = {
  isSupportWebp: PropTypes.bool.isRequired,
};

export default Landing;
