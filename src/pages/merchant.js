import Image from 'next/image';
import PropTypes from 'prop-types';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';
import useSound from 'use-sound';

import { Box, Button, Flex, Text } from '@chakra-ui/react';

import BowlImg from '../assets/images/merchant/bowl.svg';
import FireImg from '../assets/images/merchant/fire.png';
import HomeBaseBg from '../assets/images/merchant/merchant_1024.jpg';
import HomeBaseBgWebp from '../assets/images/merchant/merchant_1024.webp';
import Home1440Bg from '../assets/images/merchant/merchant_1440.png';
import Home1440BgWebp from '../assets/images/merchant/merchant_1440.webp';
import HomeBg from '../assets/images/merchant/merchant_bg.png';
import HomeBgWebp from '../assets/images/merchant/merchant_bg.webp';
import BoardBigImg from '../assets/images/merchant/merchant_board_big.png';
import BoardBigImgWebp from '../assets/images/merchant/merchant_board_big.webp';
import BoardSmallImg from '../assets/images/merchant/merchant_board_small.png';
import BoardSmallImgWebp from '../assets/images/merchant/merchant_board_small.webp';
import FurnaceImg from '../assets/images/merchant/merchant_furnace.png';
import FurnaceImgWebp from '../assets/images/merchant/merchant_furnace.webp';
import SkullImg from '../assets/images/merchant/merchant_skull.png';
import SkullImgWebp from '../assets/images/merchant/merchant_skull.webp';
import ButtonClickAudio from '../assets/music/clickButton.mp3';
import FireAudio from '../assets/music/fire.mp3';
import Counter from '../component/Counter';
import { CREATOR_ADDRESS, getItemQuery } from '../constant';
import { useWalletContext } from '../context';
import Layout from '../layout';
import { fadeIn } from '../utils/animation';

export const shovelMintingPrice = '100000'; // 0.001 apt
export const urnMintingPrice = '1000000'; // 0.01 apt

const NotiveMessage = [
  'Acquires a shovel, hasten to the gloomy graveyard, and unearth the secrets hidden beneath the hallowed ground!',
  "Don't neglect to purchase an urn. If you unearth the bones of the deceased, haste to the altar! There, your path will become clear.",
  "Unearth shiny shards? Bring them, I'll forge a golden urn. Need 69 shards minimum. Why? It's my quirk!",
];

const Merchant = ({ isSupportWebp }) => {
  const { mint, connected, account, getAptBalance, reExecuteAltarQuery } = useWalletContext();
  const [mintAmount, setMintAmount] = useState(1);
  const [playButton] = useSound(ButtonClickAudio);
  const [playFire, { stop }] = useSound(FireAudio);
  const [showFire, setShowFire] = useState(false);
  const [isShovelEnabled, setIsShovelEnabled] = useState(false);
  const [isUrnEnabled, setIsUrnEnabled] = useState(false);
  const [noticeInfo, setNoticeInfo] = useState('');
  const [noticeIndex, setNoticeIndex] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const address = account && account.address;

  const checkMintEnabled = useCallback(async () => {
    const aptBalance = await getAptBalance();
    if (!aptBalance) {
      setIsShovelEnabled(false);
      setIsUrnEnabled(false);
      return;
    }
    setIsShovelEnabled(aptBalance > BigInt(shovelMintingPrice));
    setIsUrnEnabled(aptBalance > BigInt(urnMintingPrice));
  }, [getAptBalance]);

  const mintShovelButtonText = useMemo(() => {
    if (connected) {
      return isShovelEnabled ? 'Buy shovel' : 'Poor guy';
    }
    return 'connect wallet';
  }, [connected, isShovelEnabled]);

  const mintUrnButtonText = useMemo(() => {
    if (connected) {
      return isUrnEnabled ? 'Buy urn' : 'Poor guy';
    }
    return 'connect wallet';
  }, [connected, isUrnEnabled]);

  useEffect(() => {
    if (!connected) return;
    checkMintEnabled();
  }, [connected, checkMintEnabled]);

  const clickFireHandler = () => {
    setShowFire(true);
    playFire();
    setTimeout(() => {
      setShowFire(false);
      stop();
    }, 5000);
  };

  const [result, reexecuteQuery] = useQuery({
    query: getItemQuery('shard'),
    variables: {
      address,
      creator_address: CREATOR_ADDRESS,
    },
  });

  const { data, fetching, error } = result;
  const shardAmount = data?.current_token_ownerships[0]?.amount ?? 0;
  console.log(`💥 query shard data error: ${JSON.stringify(error, null, ' ')}`);

  const showNotice = () => {
    if (isDisabled) return;
    setNoticeInfo(NotiveMessage[noticeIndex]);
    setNoticeIndex((noticeIndex + 1) % NotiveMessage.length);
    setIsDisabled(true);
  };

  useEffect(() => {
    if (isDisabled) {
      const timer = setTimeout(() => {
        setNoticeInfo('');
        setIsDisabled(false);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isDisabled]);
  return (
    <Layout>
      <Box
        maxW="1920px"
        bgImage={{
          base: isSupportWebp ? HomeBaseBgWebp.src : HomeBaseBg.src,
          mid: isSupportWebp ? Home1440BgWebp.src : Home1440Bg.src,
          desktop: isSupportWebp ? HomeBgWebp.src : HomeBg.src,
        }}
        bgRepeat="no-repeat"
        bgSize="100% 100%"
        minH={{ base: '768px', mid: '900px', desktop: '1080px' }}
        w={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
        position="relative"
      >
        <Box
          w={{ base: '245px', mid: '300px' }}
          position="absolute"
          bottom={{ base: '30%', mid: '40%', desktop: '32%' }}
          left={{ base: '0%', mid: '8%', desktop: '20%' }}
          borderRadius="20px"
          border="1px solid #FFF3CD"
          bg="#292229"
          p="18px 24px"
          display={noticeInfo ? 'block' : 'none'}
          animation={`${fadeIn} 2s linear `}
        >
          <Text fontSize="14px" color="#FFF3CD">
            {noticeInfo}
          </Text>
        </Box>
        <Box
          bgImage={{
            base: isSupportWebp ? BoardSmallImgWebp.src : BoardSmallImg.src,
          }}
          bgRepeat="no-repeat"
          bgSize="100% 100%"
          w={{ base: '193px', mid: '246px' }}
          h={{ base: '281px', mid: '358px' }}
          position="absolute"
          bottom={{ base: '35vh', mid: '34vh', desktop: '32vh' }}
          right={{ base: '4%', mid: '3.5%', desktop: '12%' }}
        >
          <Flex
            justifyContent="center"
            mt={{ base: '3rem', mid: '4.5rem', desktop: '5rem' }}
            wrap="wrap"
            p={{ base: '0 29px', mid: '0 49px' }}
            pb="2.3rem"
          >
            <Text
              w="100%"
              textAlign="center"
              color="#794D0B"
              fontSize={{ base: '16px', mid: '20px' }}
              fontWeight={700}
              mb={{ base: '10px', mid: '14px', desktop: '14px' }}
            >
              Golden urn
            </Text>
            <Image src={BowlImg} alt="Bowl" />
            <Text
              w="100%"
              textAlign="center"
              color="#794D0B"
              fontSize="14px"
              fontWeight={500}
              mb={{ base: '10px', mid: '14px', desktop: '14px' }}
              mt={{ base: '10px', mid: '14px', desktop: '14px' }}
              lineHeight={{ base: '20px' }}
            >
              it&apos;s lame without the golden urn. {shardAmount}/69
            </Text>
            <Button
              variant="gold"
              onClick={async () => {
                const transaction = await mint('forge');
                if (transaction) {
                  reexecuteQuery();
                  reExecuteAltarQuery();
                }
                playFire();
              }}
              w={{ base: '140px', mid: '148px' }}
              isLoading={fetching}
              isDisabled={!connected || shardAmount < 10}
            >
              Forge
            </Button>
          </Flex>
        </Box>
        <Box
          bgImage={{
            base: isSupportWebp ? FurnaceImgWebp.src : FurnaceImg.src,
          }}
          w={{ base: '287px', mid: '389px', desktop: '24.4rem' }}
          bgRepeat="no-repeat"
          bgSize="100% 100%"
          minH={{ base: '42.3vh' }}
          position="absolute"
          bottom="0px"
          right={{ base: '13%', mid: '12%', desktop: '19%' }}
          onClick={clickFireHandler}
          cursor="pointer"
          transition="transform 0.2s ease 0s"
          _hover={{ transform: 'scale(0.98)' }}
        />
        <Box
          bgImage={{
            base: FireImg.src,
          }}
          w={{ base: '72px' }}
          bgRepeat="no-repeat"
          bgSize="100% 100%"
          minH={{ base: '137px' }}
          position="absolute"
          bottom="39vh"
          right={{ base: '26%', desktop: '29%' }}
          display={showFire ? 'block' : 'none'}
          animation={`${fadeIn} 2s linear `}
        />
        <Flex
          wrap="wrap"
          bgRepeat="no-repeat"
          bgSize="100% 100%"
          w="34.8rem"
          position="absolute"
          bottom="0px"
          right={{ base: '42%' }}
          justifyContent="center"
        >
          <Box
            bgImage={{
              base: isSupportWebp ? BoardBigImgWebp.src : BoardBigImg.src,
            }}
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            w={{ base: '436px', mid: '556px', desktop: '556px' }}
            h={{ base: '345px', mid: '406px', desktop: '406px' }}
          >
            <Flex justifyContent="center" gap="24px" mt={{ base: '7rem', mid: '10rem', desktop: '10rem' }}>
              <Flex
                wrap="wrap"
                w="40%"
                bg="#FCD791"
                borderRadius="20px"
                p={{ base: '14px', mid: '16px' }}
                justifyContent="center"
                rowGap="6px"
              >
                <Text
                  fontSize={{ base: '13px', mid: '18px' }}
                  fontWeight={700}
                  color="#292229"
                  textAlign="center"
                  w="100%"
                >
                  Buy shovel / {Number(shovelMintingPrice) / Number(10 ** 8)} APT
                </Text>
                <Text
                  fontSize={{ base: '14px', mid: '14px' }}
                  fontWeight={500}
                  color="#292229"
                  textAlign="center"
                  w="100%"
                >
                  Every grave robber needs a shovel.
                </Text>
                <Counter defaultValue={mintAmount} onChange={setMintAmount} />
                <Button
                  height={{ base: '47px' }}
                  mt={{ base: '10px', mid: '12px' }}
                  variant="dark"
                  onClick={async () => {
                    playButton();
                    try {
                      const transaction = await mint('mint_shovel', [mintAmount]);
                      if (transaction) {
                        checkMintEnabled();
                        reExecuteAltarQuery();
                      }
                    } catch (e) {
                      console.log(`💥 e: ${JSON.stringify(e, null, '  ')}`);
                    }
                  }}
                  isDisabled={!isShovelEnabled}
                >
                  {mintShovelButtonText}
                </Button>
              </Flex>
              <Flex
                wrap="wrap"
                w="40%"
                bg="#FCD791"
                borderRadius="20px"
                p={{ base: '14px', mid: '16px' }}
                justifyContent="center"
              >
                <Text
                  fontSize={{ base: '13px', mid: '18px' }}
                  fontWeight={700}
                  color="#292229"
                  textAlign="center"
                  w="100%"
                >
                  Buy urn / {Number(urnMintingPrice) / Number(10 ** 8)} APT
                </Text>
                <Text
                  mt={{ base: '10px', mid: '12px' }}
                  fontSize={{ base: '14px', mid: '14px' }}
                  fontWeight={500}
                  color="#292229"
                  textAlign="center"
                  w="100%"
                >
                  I think... you need an urn for bones.
                </Text>
                <Button
                  height={{ base: '47px' }}
                  mt={{ base: '10px', mid: '12px' }}
                  variant="dark"
                  onClick={async () => {
                    playButton();
                    const transaction = await mint('mint_urn');
                    if (transaction) {
                      checkMintEnabled();
                      reExecuteAltarQuery();
                    }
                  }}
                  isDisabled={!isUrnEnabled}
                >
                  {mintUrnButtonText}
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Box
            bgImage={{
              base: isSupportWebp ? SkullImgWebp.src : SkullImg.src,
            }}
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            w={{ base: '362px', mid: '491px' }}
            h={{ base: '381px', mid: '517px' }}
            cursor="pointer"
            transition="transform 0.2s ease 0s"
            _hover={{ transform: 'scale(0.98)' }}
            onClick={showNotice}
          />
        </Flex>
      </Box>
    </Layout>
  );
};

Merchant.prototype = {
  isSupportWebp: PropTypes.bool.isRequired,
};
export default Merchant;
