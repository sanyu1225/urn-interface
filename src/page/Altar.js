/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Button, Grid, Image } from '@chakra-ui/react';
import Layout from '../layout';
import HomeBg from '../assets/images/altar/altar_bg.png';
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
    imageWebp: UrnItemImgWebp,
    type: 'urn'
}, {
    title: 'Bone list',
    description: "You can choose the bone.",
    image: SkullItemImg,
    imageWebp: SkullItemImgWebp,
    type: 'bone'
}]

const CollectionList = ({
    title,
    description,
    image,
    imageWebp,
    type,
    onClick,
    isSupportWebp
}) => (
    <Flex justifyContent="space-evenly" p="0 30px" mb="20px">
        <Box>
            <Image src={isSupportWebp ? imageWebp : image} />
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
)

const Altar = ({ isSupportWebp }) => {
    const [showType, setShowType] = useState('');
    return (
        <Layout>
            <Box
                maxW="1920px"
                bgImage={{
                    base: isSupportWebp ? HomeBaseBgWebp : HomeBaseBg,
                    desktop: isSupportWebp ? HomeBgWebp : HomeBg
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
                            base: isSupportWebp ? AltarImgWebp : AltarImg,
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
                            base: isSupportWebp ? HandImgWebp : HandImg,
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
                                    showType === '' ? '- -' : `0 %`
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
                            base: isSupportWebp ? BoardImgWebp : BoardImg,
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
                                    onClick={() => setShowType(item.type)}
                                    isSupportWebp={isSupportWebp}
                                />
                            ))
                        }
                    </Box>
                    <Flex
                        mt="1.5rem"
                        bgImage={{
                            base: isSupportWebp ? CardBrandImgWebp : CardBrandImg,
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
    )
};

Altar.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
}
export default Altar;
