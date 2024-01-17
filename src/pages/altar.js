import PropTypes from 'prop-types';
import { useEffect, useMemo, useState } from 'react';
import useSound from 'use-sound';

import Carousel from '@/component/Carousel';
import { isEmpty } from '@/plugin/lodash';
import { fadeup } from '@/utils/animation';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import AltarImg from '../assets/images/altar/altar.png';
import AltarImgWebp from '../assets/images/altar/altar.webp';
import HomeBaseBg from '../assets/images/altar/altar_1024.jpg';
import HomeBaseBgWebp from '../assets/images/altar/altar_1024.webp';
import Home1440Bg from '../assets/images/altar/altar_1440.jpg';
import Home1440BgWebp from '../assets/images/altar/altar_1440.webp';
import HomeBg from '../assets/images/altar/altar_bg.png';
import HomeBgWebp from '../assets/images/altar/altar_bg.webp';
import BoardImg from '../assets/images/altar/board.png';
import BoardImgWebp from '../assets/images/altar/board.webp';
import CardBrandImg from '../assets/images/altar/cardbrand.png';
import CardBrandImgWebp from '../assets/images/altar/cardbrand.webp';
import GhostImg from '../assets/images/altar/ghost.png';
import GhostImgWebp from '../assets/images/altar/ghost.webp';
import HandImg from '../assets/images/altar/hand.png';
import HandImgWebp from '../assets/images/altar/hand.webp';
import SkullItemImg from '../assets/images/altar/skull_item.png';
import SkullItemImgWebp from '../assets/images/altar/skull_item.webp';
import UrnItemImg from '../assets/images/altar/urn_item.png';
import UrnItemImgWebp from '../assets/images/altar/urn_item.webp';
import ButtonClickAudio from '../assets/music/clickButton.mp3';
import LaughAudio from '../assets/music/laugh.mp3';
import { useWalletContext } from '../context';
import useReincarnation from '../hooks/useReincarnation';
import Layout from '../layout';

const functionNameMap = {
  urn: 'burn_and_fill',
  golden_urn: 'burn_and_fill_golden',
  reincarnate: 'reincarnate',
};

const Altar = ({ isSupportWebp }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputPolygonAddress, setInputPolygonAddress] = useState('');
  const [showItem, setShowItem] = useState({ name: '', list: [] });
  const [choiseUrn, setChoiseUrn] = useState({});
  const [choiseBone, setChoiseBone] = useState([]);
  const [boneListState, setBoneList] = useState([]);
  const [showGhost, setShowGhost] = useState(false);
  const [playLaugh, { stop }] = useSound(LaughAudio);
  const [playButton] = useSound(ButtonClickAudio);
  const [teleportResult, fetchTeleportData] = useReincarnation();
  const { data: teleportData, error: teleportError, isLoading: teleportIsLoading } = teleportResult;
  const { connected, account, mint, reExecuteAltarQuery, urnList, fetching, boneList } = useWalletContext();
  const address = account && account.address;

  const resetState = () => {
    setChoiseUrn({});
    setChoiseBone([]);
    setShowItem({ name: '', list: [] });
  };

  useEffect(() => {
    if (!connected) {
      resetState();
    }
  }, [connected]);

  useEffect(() => {
    if (!choiseUrn || choiseUrn.length === 0) {
      setBoneList([]);
      return;
    }
    const filterUrnList = boneList.filter((e) => !['urn', 'golden_urn'].includes(e.current_token_data.name));
    setBoneList(filterUrnList);
  }, [boneList, choiseUrn]);

  const showItemHandler = async (item) => {
    playButton();
    const isUrn = item === 'urn';

    setShowItem({
      name: isUrn ? 'urn' : 'bone',
      list: isUrn ? urnList : boneListState,
    });
  };

  const putInHandler = async () => {
    const params = [choiseUrn.property_version, choiseBone.property_version, choiseBone.current_token_data.name];

    const functionName = functionNameMap[choiseUrn.name];
    if (!functionName) return;

    const transaction = await mint(functionName, params);
    if (!transaction) return;
    setTimeout(() => {
      setChoiseUrn((state) => {
        const ash = Number(state.token_properties.ash);
        const point = Number(choiseBone.token_properties.point);

        return {
          ...state,
          token_properties: {
            ...state.token_properties,
            ash: Number.isNaN(ash) ? point : ash + point,
          },
        };
      });

      setChoiseBone([]);
      setShowItem({ name: '', list: [] });
      reExecuteAltarQuery();
    }, 1000);
  };

  const showGhostHandler = () => {
    playLaugh();
    setShowGhost(true);
    setTimeout(() => {
      setShowGhost(false);
      stop();
    }, 5000);
  };

  const isUrnEnabled = () => {
    if (!connected) return false;
    return urnList && urnList.length > 0;
  };

  const urnButtonText = useMemo(() => {
    if (!connected) return 'Connect wallet';
    if (urnList && urnList.length > 0) {
      return 'Select urn';
    }
    return 'Buy one first';
  }, [connected, urnList]);

  const putInDisable = () => {
    if (choiseUrn?.token_properties?.ash === '100') {
      return false;
    }
    if (!connected || isEmpty(choiseUrn) || isEmpty(choiseBone)) {
      return true;
    }
    return false;
  };

  const submitReincarnate = async () => {
    const functionName = functionNameMap.reincarnate;
    console.log(`💥 choiseUrn.property_version: ${JSON.stringify(choiseUrn.property_version, null, '  ')}`);
    const transaction = await mint(functionName, [choiseUrn.property_version]);
    console.log(`💥 transaction: ${JSON.stringify(transaction, null, '  ')}`);
    if (!transaction) return;
    fetchTeleportData(transaction.hash, inputPolygonAddress);
    setTimeout(() => {
      resetState();
      reexecuteQuery();
      reexecuteUrnQuery();
    }, 1000);
  };

  const closeModalHandler = () => {
    onClose();
    resetState();
    reexecuteQuery();
    reexecuteUrnQuery();
  };

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
        <Box w={{ base: '323px', mid: '436px' }} position="absolute" minH={{ base: '688px' }} bottom="9vh" right={{ base: '7%', desktop: '22%' }}>
          <Box
            bgImage={{
              base: isSupportWebp ? AltarImgWebp.src : AltarImg.src,
            }}
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            w={{ base: '233px', mid: '314px' }}
            minH={{ base: '400px', mid: '537px' }}
            position="absolute"
            bottom="0"
            onClick={showGhostHandler}
            cursor="pointer"
            transition="transform 0.2s ease 0s"
            _hover={{ transform: 'scale(0.98)' }}
          />
          <Box
            bgImage={{
              base: isSupportWebp ? GhostImgWebp.src : GhostImg.src,
            }}
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            w={{ base: '203px' }}
            minH={{ base: '212px' }}
            position="absolute"
            left="-50px"
            top="60px"
            display={showGhost ? 'block' : 'none'}
            animation={`${fadeup} 2s linear `}
          />
          <Box
            bgImage={{
              base: isSupportWebp ? HandImgWebp.src : HandImg.src,
            }}
            h={{ base: '360px', mid: '420px' }}
            w={{ base: '244px', mid: '244px' }}
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            position="absolute"
            bottom="32vh"
            top={{ base: '100px', mid: '5px' }}
            right={{ base: '0' }}
          >
            <Flex justifyContent="flex-end" mt="4rem" wrap="wrap" pr="2rem">
              <Text
                pr={choiseUrn?.token_properties?.ash ? '0.2rem' : '1rem'}
                w="100%"
                textAlign="right"
                color="#794D0B"
                fontSize="24px"
                fontWeight={700}
                mb="0.9rem"
                mt="0.9rem"
              >
                {choiseUrn?.token_properties?.ash ?? '- -'}
                {choiseUrn?.token_properties?.ash && ' %'}
              </Text>
              {choiseUrn?.token_properties?.ash === '100' ? (
                <Button variant="putIn" isDisabled={putInDisable()} isLoading={fetching} onClick={onOpen}>
                  Reveal
                </Button>
              ) : (
                <Button variant="putIn" isDisabled={putInDisable()} isLoading={fetching} onClick={putInHandler}>
                  Put in
                </Button>
              )}
            </Flex>
          </Box>
        </Box>

        <Flex
          wrap="wrap"
          w={{ base: '353px', mid: '393px' }}
          bgRepeat="no-repeat"
          bgSize="100% 100%"
          position="absolute"
          top={{ base: '50px', mid: '12%' }}
          left={{ base: '6.5%', mid: '16.5%', desktop: '24.5%' }}
        >
          <Box
            bgImage={{
              base: isSupportWebp ? BoardImgWebp.src : BoardImg.src,
            }}
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            w="100%"
            minH={{ base: '489px', mid: '544px' }}
          >
            <Text color="#fff5ce" fontWeight={700} fontSize="24px" w="100%" mt="8%" textAlign="center">
              Collection list
            </Text>
            <Text
              mb={{ base: '20px', mid: '32px' }}
              color="#fff5ce"
              fontWeight={500}
              fontSize="16px"
              w="100%"
              mt={{ base: '25px', mid: '12%' }}
              textAlign="center"
            >
              Come on, bro. Your family need a rez.
            </Text>
            <Flex justifyContent="space-evenly" p="0 30px" mb="20px">
              <Box position="relative">
                <Image alt="img" src={isSupportWebp ? UrnItemImgWebp.src : UrnItemImg.src} />
                {!isEmpty(choiseUrn?.token_properties?.ash) && (
                  <Text position="absolute" top="10px" right="10px" fontSize="12px" color="#FFF3CD" fontWeight="600">
                    {choiseUrn?.token_properties?.ash}%
                  </Text>
                )}
              </Box>
              <Flex wrap="wrap" w="40%" justifyContent="flex-start">
                <Text fontSize="18px" fontWeight={700} color="#FFF3CD" w="100%">
                  Urn list
                </Text>
                <Text mt="12px" fontSize="14px" fontWeight={400} color="#FFF3CD" w="100%">
                  You can choose the urn.
                </Text>
                <Button mt="12px" variant="primary" onClick={() => showItemHandler('urn')} isDisabled={!isUrnEnabled()} isLoading={fetching}>
                  {urnButtonText}
                </Button>
              </Flex>
            </Flex>
            <Flex justifyContent="space-evenly" p="0 30px" mb="20px">
              <Box>
                <Image alt="img" src={isSupportWebp ? SkullItemImgWebp.src : SkullItemImg.src} />
              </Box>
              <Flex wrap="wrap" w="40%" justifyContent="flex-start">
                <Text fontSize="18px" fontWeight={700} color="#FFF3CD" w="100%">
                  Bone list
                </Text>
                <Text mt="12px" fontSize="14px" fontWeight={400} color="#FFF3CD" w="100%">
                  You can choose the bone.
                </Text>
                <Button
                  mt="12px"
                  variant="primary"
                  onClick={() => showItemHandler('bone')}
                  isDisabled={!connected || isEmpty(choiseUrn)}
                  isLoading={fetching}
                >
                  {connected ? 'Select bone' : 'Connect wallet'}
                </Button>
              </Flex>
            </Flex>
          </Box>
          <Flex
            mt={{ base: '24px', mid: '1.5rem' }}
            bgImage={{
              base: isSupportWebp ? CardBrandImgWebp.src : CardBrandImg.src,
            }}
            w="100%"
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            h={{ base: '150px', mid: '167px' }}
            justifyContent="center"
            alignItems="center"
          >
            {isEmpty(showItem.name) && (
              <Text color="#FFF3CD" textAlign="center" fontSize="16px" fontWeight={400}>
                Hey, you are not select yet. Need some help?
              </Text>
            )}
            {!isEmpty(showItem.name) &&
              (isEmpty(showItem.list) ? (
                <Text color="#FFF3CD" textAlign="center" fontSize="16px" fontWeight={400}>
                  Poor guy. You don&apos;t have anything.
                </Text>
              ) : (
                <Carousel
                  NftList={showItem}
                  choiseItem={showItem.name === 'urn' ? choiseUrn : choiseBone}
                  selectItem={(item) => {
                    if (showItem.name === 'urn') {
                      setChoiseUrn(item);
                    }
                    if (showItem.name === 'bone') {
                      setChoiseBone(item);
                    }
                  }}
                />
              ))}
          </Flex>
        </Flex>

        <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={closeModalHandler}>
          <ModalOverlay />
          <ModalContent p="28px" bg="#292229">
            <ModalHeader p="0 0 20px 0px" alignItems="center" color="#FFF3CD">
              Time to Reincarnate
            </ModalHeader>
            <ModalCloseButton m="20px" color="#FFF3CD" />
            <ModalBody p="0">
              {teleportData ? (
                teleportError || 'Reincarnate Succeed, check your polygon account!'
              ) : (
                <>
                  <Box w="100%" m="12px 0">
                    <Text color="#FFF3CD" textAlign="left" fontSize="16px" fontWeight={700}>
                      Reincarnate to polygon mumbai testnet
                    </Text>
                  </Box>
                  <Input placeholder="0x..." onChange={(e) => setInputPolygonAddress(e.target.value)} />

                  <Center mt="24px">
                    <Button isDisabled={!inputPolygonAddress || teleportIsLoading} isLoading={teleportIsLoading} onClick={submitReincarnate}>
                      Reincarnate
                    </Button>
                  </Center>
                </>
              )}
            </ModalBody>
          </ModalContent>
        </Modal>
      </Box>
    </Layout>
  );
};

Altar.prototype = {
  isSupportWebp: PropTypes.bool.isRequired,
};
export default Altar;
