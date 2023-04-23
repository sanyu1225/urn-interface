/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Button, Grid, Image } from '@chakra-ui/react';
import { gql, useQuery } from 'urql';
import Layout from '../layout';
import HomeBg from '../assets/images/altar/altar_bg.png';
import { useWalletContext } from '../context';
import HomeBgWebp from '../assets/images/altar/altar_bg.webp';
import HomeBaseBg from '../assets/images/altar/altar_1440.jpg';
import HomeBaseBgWebp from '../assets/images/altar/altar_1440.webp';
import CardBrandImg from '../assets/images/altar/cardbrand.png';
import CardBrandImgWebp from '../assets/images/altar/cardbrand.webp';
import SkullItemImg from '../assets/images/altar/skull_item.png';
import SkullItemImgWebp from '../assets/images/altar/skull_item.webp';
import UrnItemImg from '../assets/images/altar/urn_item.png';
import UrnItemImgWebp from '../assets/images/altar/urn_item.webp';
import AltarImg from '../assets/images/altar/altar.png';
import AltarImgWebp from '../assets/images/altar/altar.webp';
import HandImg from '../assets/images/altar/hand.png';
import HandImgWebp from '../assets/images/altar/hand.webp';
import BoardImg from '../assets/images/altar/board.png';
import BoardImgWebp from '../assets/images/altar/board.webp';

const CollectionListData = [{
    title: 'Urn list',
    description: 'You can choose the urn.',
    image: UrnItemImg,
    imageWebp: UrnItemImgWebp.src,
    type: 'urn',
}, {
    title: 'Bone list',
    description: 'You can choose the bone.',
    image: SkullItemImg,
    imageWebp: SkullItemImgWebp.src,
    type: 'bone',
}];

const CollectionList = ({
    title,
    description,
    image,
    imageWebp,
    type,
    onClick,
    isSupportWebp,
}) => (
    <Flex justifyContent="space-evenly" p="0 30px" mb="20px">
        <Box>
            <Image alt="img" src={isSupportWebp ? imageWebp : image} />
        </Box>
        <Flex wrap="wrap" w="40%" justifyContent="flex-start">
            <Text fontSize="18px" fontWeight={700} color="#FFF3CD" w="100%">
                {title}
            </Text>
            <Text mt="12px" fontSize="14px" fontWeight={400} color="#FFF3CD" w="100%">
                {description}
            </Text>
            <Button mt="12px" variant="primary" onClick={onClick}>
                Select {type}
            </Button>
        </Flex>
    </Flex>
);

const query = gql`
      query getAccountCurrentTokens($address: String!, $offset: Int, $limit: Int) {
        current_token_ownerships(
          where: {owner_address: {_eq: $address}, amount: {_gt: 0}}
          order_by: [{last_transaction_version: desc}, {creator_address: desc}, {collection_name: desc}, {name: desc}]
          offset: $offset
          limit: $limit
        ) {
          amount
          current_token_data {
            ...TokenDataFields
          }
          current_collection_data {
            ...CollectionDataFields
          }
          last_transaction_version
          property_version
          token_properties
        }
      }

      fragment TokenDataFields on current_token_datas {
        creator_address
        collection_name
        description
        metadata_uri
        name
        token_data_id_hash
        collection_data_id_hash
        default_properties
      }

      fragment CollectionDataFields on current_collection_datas {
        metadata_uri
        supply
        description
        collection_name
        collection_data_id_hash
        table_handle
        creator_address
      }
    `;

const Altar = ({ isSupportWebp }) => {
    const [showType, setShowType] = useState('');
    const { connected } = useWalletContext();

    // const [result, reexecuteQuery] = useQuery({
    //     query,
    //     variables: { address:
    // '0x7b251d07fcd75d1a9ea04875d81717fd096d8edcb945a6fab60e5bb2496dea2b', offset: 0, limit: 12 },
    //     // variables: { address:
    // '0x4ef96daa47a306111e877f792cd0b0682e881dde126a51f0e5e439f95c760eae', offset: 0, limit: 12 },
    // });
    // const { data, fetching, error } = result;
    // console.log('data: ', data);

    // useEffect(() => {
    //     console.log('connected: ', connected);
    //     if (connected) {
    //         // reexecuteQuery();
    //     }
    // }, [connected]);

    const showItemHandler = (item) => {
        console.log('item: ', item);
        // reexecuteQuery()
    };
    return (
        <Layout>
            <Box
                maxW="1920px"
                bgImage={{
                    base: isSupportWebp ? HomeBaseBgWebp.src : HomeBaseBg.src,
                    desktop: isSupportWebp ? HomeBgWebp.src : HomeBg.src,
                }}
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '768px', mid: '900px', desktop: '1080px' }}
                w={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
                position="relative"
            >
                <Box
                    w="436px"
                    position="absolute"
                    minH={{ base: '688px' }}
                    bottom="9vh"
                    right={{ base: '10%', desktop: '22%' }}
                >
                    <Box
                        bgImage={{
                            base: isSupportWebp ? AltarImgWebp.src : AltarImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '314px' }}
                        minH={{ base: '537px' }}
                        position="absolute"
                        bottom="0"
                    />
                    <Box
                        bgImage={{
                            base: isSupportWebp ? HandImgWebp.src : HandImg.src,
                        }}
                        minH={{ base: '420px' }}
                        w={{ base: '244px' }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        position="absolute"
                        bottom="32vh"
                        top={{ base: '1rem' }}
                        right={{ base: '0' }}
                    >
                        <Flex justifyContent="flex-end" mt="4rem" wrap="wrap" pr="2rem">
                            <Text
                                pr="1rem"
                                w="100%"
                                textAlign="right"
                                color="#794D0B"
                                fontSize="24px"
                                fontWeight={700}
                                mb="0.9rem"
                                mt="0.9rem"
                            >
                                {
                                    showType === '' ? '- -' : '0 %'
                                }
                            </Text>
                            <Button variant="putIn">
                                Put in
                            </Button>
                        </Flex>
                    </Box>

                </Box>

                <Flex
                    wrap="wrap"
                    w={{ base: '393px' }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    position="absolute"
                    top="12%"
                    left={{ base: '6.5%', mid: '24.5%' }}
                >
                    <Box
                        bgImage={{
                            base: isSupportWebp ? BoardImgWebp.src : BoardImg.src,
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w="100%"
                        minH={{ base: '544px' }}
                    >
                        <Text color="#fff5ce" fontWeight={700} fontSize="24px" w="100%" mt="8%" textAlign="center">
                            Collection list
                        </Text>
                        <Text mb="32px" color="#fff5ce" fontWeight={500} fontSize="16px" w="100%" mt="12%" textAlign="center">
                            Come on, bro. Your family need a rez.
                        </Text>
                        {
                            CollectionListData.map((item) => (
                                <CollectionList
                                    title={item.title}
                                    key={item.title}
                                    description={item.description}
                                    image={item.image}
                                    imageWebp={item.imageWebp}
                                    type={item.type}
                                    onClick={() => showItemHandler(item.type)}
                                    isSupportWebp={isSupportWebp}
                                />
                            ))
                        }
                    </Box>
                    <Flex
                        mt="1.5rem"
                        bgImage={{
                            base: isSupportWebp ? CardBrandImgWebp.src : CardBrandImg.src,
                        }}
                        w="100%"
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        minH={{ base: '167px' }}
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Text color="#FFF3CD" textAlign="center" fontSize="16px" fontWeight={400}>
                            Hey, you are not select yet. Need some help?
                        </Text>
                    </Flex>
                </Flex>

            </Box>
        </Layout>
    );
};

Altar.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
};
export default Altar;
