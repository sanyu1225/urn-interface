/* eslint-disable no-unused-vars */
import NextImage from 'next/image';
import { useEffect, useState } from 'react';

import placeholderImg from '@/assets/images/altar/placeholder_img.png';
import PackageIcon from '@/assets/images/icons/backpack.svg';
import {
  Box,
  Button,
  Center,
  Flex,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useDisclosure,
} from '@chakra-ui/react';

import { useWalletContext } from '../context';

const buttonGroup = [
  {
    id: 'basic',
    label: 'Basic',
  },
  {
    id: 'normal',
    label: 'Normal',
  },
  {
    id: 'golden',
    label: 'Golden',
  },
];

const Backpack = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [buttonType, setButtonType] = useState('basic');
  const { connected, boneList, shovelList, goldenlList } = useWalletContext();
  const [showList, setShowList] = useState(shovelList);
  console.log('boneList: ', boneList);

  useEffect(() => {
    if (buttonType === 'basic') {
      setShowList(shovelList);
    }
    if (buttonType === 'normal') {
      setShowList(boneList);
    }
    if (buttonType === 'golden') {
      setShowList(goldenlList);
    }
  }, [boneList, buttonType, shovelList, goldenlList]);

  return (
    <>
      <Button w="54px" p="0" variant="hamburger" onClick={onOpen}>
        <NextImage width={20} height={20} src={PackageIcon} alt="package" />
      </Button>
      <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          w="480px"
          maxW="auto"
          p="28px"
          bg="#292229"
          borderRadius={10}
          border="1px solid #49473E"
          boxShadow="0px 5px 20px 0px rgba(0, 0, 0, 0.25)"
        >
          <ModalHeader p="0 0 20px 0px" alignItems="center" fontSize="18px" fontWeight={700} color="#FFF3CD">
            Equipment
          </ModalHeader>
          <ModalCloseButton m="20px" color="#FFF3CD" />
          <ModalBody p="0">
            <Flex gap="12px">
              {buttonGroup.map((btn) => (
                <Button key={btn.id} variant="basic" onClick={() => setButtonType(btn.id)} isActive={buttonType === btn.id}>
                  {btn.label}
                </Button>
              ))}
            </Flex>
            <Flex
              bg="#211C21"
              h="437px"
              w="424px"
              overflow="scroll"
              p="20px 16px 0 20px"
              mt="18px"
              borderRadius={20}
              flexWrap="wrap"
              gap="14px"
              justifyContent="left"
            >
              {showList?.map((item, idx) => (
                <Box w="120px" h="120px" key={idx}>
                  {/* {item?.current_token_data?.name === 'shovel' && (
                        <>
                          <Box bg="#383030/" h="5px" w="100%" position="absolute" top="5px" />
                          <Box bg="#413636" h="5px" w="100%" position="absolute" top="10px" />
                        </>
                      )} */}
                  <Tooltip label={item?.current_token_data?.name} placement="top">
                    <Box position="relative">
                      <Image
                        width={120}
                        height={120}
                        src={item?.current_token_data?.metadata_uri}
                        alt={item?.current_token_data?.name}
                        fallbackSrc={placeholderImg.src}
                        border="1px solid #49473E"
                        borderRadius="12px"
                        // border={choiseItem.property_version === item.property_version ? '1px solid #FFF3CD' : 'none'}
                      />
                      {item?.current_token_data?.name === 'urn' && (
                        <Text position="absolute" top="6px" right="6px" fontSize="12px" color="#FFF3CD" fontWeight="600">
                          {item?.token_properties?.ash ?? '0'}
                        </Text>
                      )}
                      {/* TODO golden sholvel */}
                      {item?.current_token_data?.name !== 'urn' && item?.current_token_data?.name !== 'shovel' && (
                        <Text position="absolute" top="6px" right="6px" fontSize="12px" color="#FFF3CD" fontWeight="600">
                          {item?.token_properties?.amount ?? ''}
                        </Text>
                      )}
                      {item?.current_token_data?.name === 'shovel' && (
                        <Center bg="#FFF3CD" borderRadius={100} position="absolute" w="18px" bottom="6px" left="6px">
                          <Text fontSize="12px" color="#363121" fontWeight="600">
                            {item?.amount ?? ''}
                          </Text>
                        </Center>
                      )}
                    </Box>
                  </Tooltip>
                </Box>
              ))}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Backpack;
