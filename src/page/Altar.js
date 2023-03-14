/* eslint-disable no-unused-vars */
import React from 'react';
import { Box, Flex, Text, Button, Grid, Image } from '@chakra-ui/react';
import Layout from '../layout';
import HomeBg from '../assets/images/altar/altar_bg.png';
import CardBrandImg from '../assets/images/altar/cardbrand.png';
import SkullItemImg from '../assets/images/altar/skull_item.png';
import UrnItemImg from '../assets/images/altar/urn_item.png';
import AltarImg from '../assets/images/altar/altar.png';
import HandImg from '../assets/images/altar/hand.png';
import BoardImg from '../assets/images/altar/board.png';

const CollectionListData = [{
    title: 'Urn list',
    description: 'You can choose the urn.',
    image: UrnItemImg,
    type: 'urn'
}, {
    title: 'Bone list',
    description: "You can choose the bone.",
    image: SkullItemImg,
    type: 'bone'
}]

const CollectionList = ({
    title,
    description,
    image,
    type
}) => (
    <Flex justifyContent="space-evenly" p="0 30px" mb="20px">
        <Box>
            <Image src={image} />
        </Box>
        <Flex wrap="wrap" w="40%" justifyContent="flex-start">
            <Text fontSize="18px" fontWeight={700} color="#FFF3CD" w="100%">
                {title}
            </Text>
            <Text mt="12px" fontSize="14px" fontWeight={400} color="#FFF3CD" w="100%">
                {description}
            </Text>
            <Button mt="12px" variant="primary">
                Select {type}
            </Button>
        </Flex>
    </Flex>
)

const Altar = () => (
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
                w="436px"
                position="absolute"
                minH={{ base: '688px' }}
                bottom="9vh"
                right={{ base: '22%' }}
            >
                <Box
                    bgImage={AltarImg}
                    w="19.6rem"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '52.2vh' }}
                    position="absolute"
                    bottom="0"
                />
                <Box
                    bgImage={HandImg}
                    w="15.3rem"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '26rem' }}
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
                            - -
                        </Text>
                        <Button variant="putIn">
                            Put in
                        </Button>
                    </Flex>
                </Box>

            </Box>

            <Flex
                wrap="wrap"
                w="24.6rem"
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                position="absolute"
                top="12%"
                left={{ base: '24.5%' }}
            >
                <Box
                    bgImage={BoardImg}
                    w="100%"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '34rem' }}
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
                                type={item.type}
                            />
                        ))
                    }
                </Box>
                <Flex
                    mt="1.5rem"
                    bgImage={CardBrandImg}
                    w="100%"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '10.5rem' }}
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

export default Altar;
