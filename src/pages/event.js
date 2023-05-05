/* eslint-disable */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Button, Icon } from '@chakra-ui/react';
import Layout from '../layout';
import { useWalletContext } from '../context';
import CONTRACT_ADDR from '../constant';
import EventBg from '../assets/images/event/event_1920.jpg';
import EventBgWebp from '../assets/images/event/event_1920.webp';
import Event1440Bg from '../assets/images/event/event_1440.jpg';
import Event1440BgWebp from '../assets/images/event/event_1440.webp';
import Event1024Bg from '../assets/images/event/event_1024.jpg';
import Event1024BgWebp from '../assets/images/event/event_1024.webp';

const FlexBlock = ({ title, collectionName }) => {
  const { connected, wlMint, account } = useWalletContext();
  const BAR_COUNT = 12;
  const [desc, setDesc] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [buttonText, setButtonText] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);

  const fetchData = async () => {
    const requests = [];
    const quota = fetch('https://fullnode.testnet.aptoslabs.com/v1/view', {
      method: 'POST',
      body: JSON.stringify({
        function: `${CONTRACT_ADDR}::whitelist::get_collection_left_quota`,
        type_arguments: [],
        arguments: [collectionName],
      }),
      headers: {
        'content-type': 'application/json',
      },
    });
    requests.push(quota);
    if (account && account?.address) {
      const isWhitelistAndMinted = fetch('https://fullnode.testnet.aptoslabs.com/v1/view', {
        method: 'POST',
        body: JSON.stringify({
          function: `${CONTRACT_ADDR}::whitelist::view_is_whitelisted_and_minted`,
          type_arguments: [],
          arguments: [collectionName, account.address],
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
      requests.push(isWhitelistAndMinted);
    }
    const [qResponse, wResponse] = await Promise.all(requests);
    const quotaResponse = await qResponse.json();
    if (Array.isArray(quotaResponse)) {
      setDesc(`Free: ${quotaResponse[0]}\n50% off: ${quotaResponse[1]}`);
    } else {
      console.log(`quotaResponse should be array instead of ${quotaResponse}`);
    }
    if (wResponse) {
      console.log(`💥 account?.address: ${JSON.stringify(account?.address, null, '	')}`);
      try {
        const isWhitelistAndMintedResponse = await wResponse.json();
        if (Array.isArray(isWhitelistAndMintedResponse)) {
          const mintable = isWhitelistAndMintedResponse[1];
          const whitelisted = isWhitelistAndMintedResponse[0];
          console.log(`💥 quotaResponse[0] + quotaResponse[1]: ${JSON.stringify(quotaResponse[0] + quotaResponse[1], null, '	')}`);
          if (mintable) {
            setButtonText(whitelisted ? 'Claim' : 'Not eligible');
            setIsDisabled(!whitelisted);
          } else if (whitelisted) {
            setButtonText('Minted');
            setIsDisabled(true);
          } else if (Number(quotaResponse[0]) + Number(quotaResponse[1]) === 0) {
            setButtonText('Sold out');
            setIsDisabled(true);
          } else {
            setButtonText('Not eligible');
            setIsDisabled(true);
          }
        } else {
          setButtonText('some thing wrong');
          console.log(
            `isWhitelistResponse should be array instead of ${isWhitelistAndMintedResponse}`
          );
        }
      } catch (error) {
        setButtonText('some thing wrong');
        console.log(error);
      }
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [account]);

  const mint = async () => {
    await wlMint(collectionName);
    fetchData();
  };

  let buttonContent;
  if (!connected) {
    buttonContent = <Text>Not connected</Text>;
  } else if (isLoading) {
    buttonContent = (
      <Icon viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        {Array.from(new Array(BAR_COUNT), (value, index) => index).map((index) => (
          <g key={index} transform={`rotate(${index * (360 / BAR_COUNT)} 50 50)`}>
            <rect x={47} y={12} rx={4} ry={4} width={6} height={18}>
              <animate
                attributeName="opacity"
                values="1;0"
                dur="1s"
                begin={`${index * (1 / BAR_COUNT) - 1}s`}
                repeatCount="indefinite"
              />
            </rect>
          </g>
        ))}
      </Icon>
    );
  } else {
    buttonContent = <Text>{buttonText}</Text>;
  }

  return (
    <Flex
      w="200px"
      h="177px"
      flexDirection="column"
      p="20px"
      bg="#292229"
      borderRadius="20px"
      border="1px solid #FFF3CD"
      rowGap="16px"
    >
      <Text
        fontSize="20px"
        fontWeight={700}
        color="#FFF3CD"
        textAlign="center"
        w="100%"
        lineHeight="24px"
      >
        {title}
      </Text>
      <Text
        fontSize="14px"
        fontWeight={500}
        color="#FFF3CD"
        textAlign="center"
        w="100%"
        lineHeight="17px"
        whiteSpace="pre-line"
      >
        {desc}
      </Text>
      <Button
        variant="primary"
        onClick={mint}
        h="47px"
        isDisabled={isDisabled}
      >
        {buttonContent}
      </Button>
    </Flex>
  );
};

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
              <FlexBlock title="Aptomingos" collectionName="Aptomingos" />
              <FlexBlock title="Aptos Monkeys" collectionName="Aptos Monkeys" />
              <FlexBlock title="Blocto" collectionName="Blocto" />
              {/* <FlexBlock
                title="Urn2earn"
                collectionName="Urn2earn"
                userAddress="0x880f255dea4800fcea4b640cc6a9dfdb711f6d75a89719d7e06f936d3b8dbaea"
              /> */}
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
