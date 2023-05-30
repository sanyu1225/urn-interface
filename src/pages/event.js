/* eslint-disable */
import PropTypes from 'prop-types';
import { Box, Flex, Text } from '@chakra-ui/react';
import Layout from '../layout';
import FlexBlock from '../component/FlexBlock';
import { useWalletContext } from '../context';
import EventBg from '../assets/images/event/event_1920.jpg';
import EventBgWebp from '../assets/images/event/event_1920.webp';
import Event1440Bg from '../assets/images/event/event_1440.jpg';
import Event1440BgWebp from '../assets/images/event/event_1440.webp';
import Event1024Bg from '../assets/images/event/event_1024.jpg';
import Event1024BgWebp from '../assets/images/event/event_1024.webp';


// eslint-disable react/jsx-boolean-value
const EventPage = ({ isSupportWebp }) => {
  const { account } = useWalletContext();
  return (
    <Layout hideMenu="true">
      <Box
        maxW="1920px"
        bgImage={{
          base: isSupportWebp ? Event1024BgWebp.src : Event1024Bg.src,
          mid: isSupportWebp ? Event1440BgWebp.src : Event1440Bg.src,
          desktop: isSupportWebp ? EventBgWebp.src : EventBg.src,
        }}
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        minH={{ base: '768', mid: '900px', desktop: '1080px' }}
        w={{ base: '1440px', mid: '1440px', desktop: '1920px' }}
        position="relative"
      >
        <Flex
          color="white"
          alignContent="center"
          alignItems="center"
          flexDirection="column"
          justifyContent="start"
          rowGap="60px"
          p="15vh"
        >
          <Flex width="670px" flexDirection="column">
            <Flex
              flexDirection="column"
              fontSize="32px"
              fontWeight={700}
              color="#FFF3CD"
              textAlign="center"
              w="100%"
              rowGap="24px"
            >
              <Text lineHeight="39px">Grab a god damn shovel and dig some shit!</Text>
              <Text fontSize="20px" whiteSpace="pre-line">
                {
                  "Snapshot already taken, check if you're eligible.\nEach NFT partner got reserved free or discounted mint quota. First come first serve."
                }
              </Text>
            </Flex>
          </Flex>
          <Flex width="432px" flexDirection="column">
            <Flex w="100%" wrap="wrap" justifyContent="center" gap="32px">
              <FlexBlock title="Goblintown" collectionName="Aptomingos" />
              <FlexBlock title="PEPE" collectionName="Aptos Monkeys" />
              <FlexBlock title="Pogai" collectionName="Blocto" />
              <FlexBlock title="Urn2earn" collectionName="urn2earn" />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Layout>
  );
};

EventPage.prototype = {
  isSupportWebp: PropTypes.bool.isRequired,
};

export default EventPage;
