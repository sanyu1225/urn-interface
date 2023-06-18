import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
// import { Box, Flex, Text, Button, Input, Image, Grid } from '@chakra-ui/react';
import RobButton from 'src/component/RobBlock';
import { useQuery } from 'urql';
// import { useState, useEffect, useRef} from 'react';
import useSound from 'use-sound';

import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import CardBrandImg from '../assets/images/altar/cardbrand.png';
import CardBrandImgWebp from '../assets/images/altar/cardbrand.webp';
import Robber from '../assets/images/robbery/robber.png';
import RobberWebp from '../assets/images/robbery/robber.webp';
import HomeBaseBg from '../assets/images/robbery/robbery_1024.jpg';
import HomeBaseBgWebp from '../assets/images/robbery/robbery_1024.webp';
import Home1440Bg from '../assets/images/robbery/robbery_1440.jpg';
import Home1440BgWebp from '../assets/images/robbery/robbery_1440.webp';
import HomeBg1920 from '../assets/images/robbery/robbery_1920.jpg';
import HomeBg1920Webp from '../assets/images/robbery/robbery_1920.webp';
import ButtonClickAudio from '../assets/music/clickButton.mp3';
import { CREATOR_ADDRESS, queryAllUrnData } from '../constant';
import { useWalletContext } from '../context';
import Layout from '../layout';

// import RobberyBrand from '../assets/images/robbery/robbery_brand.png';
// import RobberyBrandWebp from '../assets/images/robbery/robbery_brand.webp';
// import CopyIcon from '@/assets/images/icons/CopyLight.svg';
// import useCopyToClipboard from '@/hooks/useCopyToClipboard';
// import { shortenAddress } from '@/utils';
import Carousel from '@/component/Carousel';
import { isEmpty } from '@/plugin/lodash';

// const fakeAddressList = [{
//     address: '0x1234567890123456789012345678901234567890',
//     success: false,
//     account: '50',
// }, {
//     address: '0x1234567890123456789012345678901234567891',
//     success: true,
//     account: '40',
// }, {
//     address: '0x1234567890123456789012345678901234567892',
//     success: false,
//     account: '30',
// }, {
//     address: '0x1234567890123456789012345678901234567893',
//     success: true,
//     account: '20',
// }, {
//     address: '0x1234567890123456789012345678901234567894',
//     success: false,
//     account: '10',
// }, {
//     address: '0x1234567890123456789012345678901234567895',
//     success: true,
//     account: '5',
// }, {
//     address: '0x1234567890123456789012345678901234567896',
//     success: false,
//     account: '1',
// }, {
//     address: '0x1234567890123456789012345678901234567897',
//     success: true,
//     account: '0.5',
// }];

const Robbery = ({ isSupportWebp }) => {
    console.log('robbery page');
    // const [copyToClipboard] = useCopyToClipboard();
    const [choiseUrn, setChoiseUrn] = useState({});
    const [victimAddress, setVictimAddress] = useState('');
    const [playButton] = useSound(ButtonClickAudio);

    const { connected, account, mint } = useWalletContext();
    const address = account && account.address;

    const [result, reexecuteQuery] = useQuery({
        query: queryAllUrnData,
        variables: {
            address,
            offset: 0,
            creator_address: CREATOR_ADDRESS,
        },
    });

    const { data, fetching } = result;
    console.log('data: ', data);
    const UrnList = data && data?.current_token_ownerships;

    useEffect(() => {
        if (connected) {
            reexecuteQuery();
        } else {
            setChoiseUrn({});
        }
    }, [connected, reexecuteQuery]);

    const robHandler = async () => {
        console.log('todo put in contract.', choiseUrn);
        const params = [choiseUrn.property_version];
        const res = await mint('random_rob', params);
        console.log('res: ', res);
        if (res) {
            console.log('todo reload nft.');
            reexecuteQuery();
        }
        playButton();
    };

    const isUrnEnabled = () => {
        if (!connected) return false;
        if (!choiseUrn || Object.keys(choiseUrn).length === 0) return false;
        return UrnList && UrnList.length > 0;
    };

    const urnButtonText = (random) => {
        if (!connected) return 'Not connected';
        if (UrnList && UrnList.length > 0) {
            return random ? 'Rob a fucker' : 'Rob specific fucker';
        }
        return 'Buy one first';
    };

    return (
        <Layout>
            <Box
                maxW="1920px"
                bgImage={{
                    base: isSupportWebp ? HomeBaseBgWebp.src : HomeBaseBg.src,
                    mid: isSupportWebp ? Home1440BgWebp.src : Home1440Bg.src,
                    desktop: isSupportWebp ? HomeBg1920Webp.src : HomeBg1920.src,
                }}
                bgRepeat="no-repeat"
                bgSize={{ base: '100% 100%', desktop: 'cover' }}
                minH={{ base: '768px', mid: '900px', desktop: '100vh' }}
                minW={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
                bgPosition="bottom"
                position="relative"
            >
                <Flex
                    wrap="wrap"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w="444px"
                    position="absolute"
                    bottom="42px"
                    left={{ base: '433px' }}
                    justifyContent="center"
                >
                    <Flex
                        w="600px"
                        h="500px"
                        flexDirection="column"
                        p="20px"
                        bg="#292229"
                        borderRadius="20px"
                        border="1px solid #FFF3CD"
                        rowGap="20px"
                        justifyContent="space-evenly"
                    >
                        <Text
                            fontSize="20px"
                            fontWeight={500}
                            color="#FFF3CD"
                            textAlign="center"
                            w="100%"
                            lineHeight="28px"
                            whiteSpace="pre-line"
                        >
                            Stop digging like a dumb ass, rob random fuckers make your life easier.
                        </Text>
                        <Flex
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
                            {isEmpty(UrnList) ? (
                                <Text color="#FFF3CD" textAlign="center" fontSize="16px" fontWeight={400}>
                                    Poor guy. You don&apos;t have anything.
                                </Text>
                            ) : (
                                <Carousel
                                    NftList={{
                                        name: 'urn',
                                        list: UrnList,
                                    }}
                                    choiseItem={choiseUrn}
                                    selectItem={setChoiseUrn}
                                />
                            )}
                        </Flex>
                        <Flex
                            flexDirection="row"
                            p="20px"
                            columnGap="16px"
                            justifyContent="space-evenly"
                            alignItems="center"
                        >
                            <Button
                                variant="primary"
                                onClick={robHandler}
                                h="47px"
                                isDisabled={!isUrnEnabled()}
                                isLoading={fetching}
                            >
                                {urnButtonText(true)}
                            </Button>
                            <Flex width="1px" height="80%" bg="#FFF3CD" />
                            <Flex flexDirection="column" rowGap="16px">
                                <Input
                                    color="#FFF3CD"
                                    placeholder="who's the fucker?"
                                    value={victimAddress}
                                    onChange={(e) => setVictimAddress(e.target.value)}
                                />
                                <RobButton
                                    choiseUrnPropertyVersion={choiseUrn.property_version}
                                    victimAddress={victimAddress}
                                    isDisabled={!isUrnEnabled()}
                                    isLoading={fetching}
                                    buttonText={urnButtonText(false)}
                                />
                            </Flex>
                        </Flex>
                    </Flex>
                    <Flex justify="flex-end" w="100%">
                        <Box
                            w={{ base: '337px' }}
                            h={{ base: '423px' }}
                            bgImage={{
                                base: isSupportWebp ? RobberWebp.src : Robber.src,
                            }}
                            bgRepeat="no-repeat"
                            bgSize="100% 100%"
                        />
                    </Flex>
                </Flex>
                {/* <Box
                    bgImage={{
                        base: isSupportWebp ? RobberyBrandWebp.src : RobberyBrand.src,
                    }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    position="absolute"
                    top="140px"
                    right={{ base: '440px' }}
                    w={{ base: '510px' }}
                    h={{ base: '599px' }}
                    p="76px"
                    pl="84px"
                    display="block"
                >
                    <Text
                        color="#FFF5CE"
                        fontSize={{ base: '20px' }}
                        fontWeight={700}
                        h="26px"
                        mb="8px"
                    >
                        Who robbed you?
                    </Text>
                    <Flex w="100%"
                     flexWrap="wrap"
                     maxH={{ base: '400px' }}
                     overflow="auto"
                     position="relative">
                        {
                            fakeAddressList?.length && fakeAddressList.map((item, index) => (
                                <Flex flexWrap="wrap" borderBottom="1px solid #383732" mt="12px">
                                    <Flex
                                     justifyContent="flex-start"
                                     w="100%"
                                     key={index}
                                     h="20px"
                                     gap="12px">
                                        <Text color="#FFF3CD" fontSize="14px" fontWeight={700}>
                                            {item.address && shortenAddress(item.address, 8)}
                                        </Text>
                                        <Box
                                        cursor="pointer"
                                        onClick={() => copyToClipboard(item.address)}>
                                            <Image alt="copy" src={CopyIcon} />
                                        </Box>
                                    </Flex>
                                    <Flex alignItems="center" mt="4px" mb="12px">
                                        <Text
                                            color="#CCC2A1"
                                            fontSize="14px"
                                            fontWeight={700}
                                            _after={{
                                                content: '""',
                                                display: 'inline-block',
                                                background: '#CCC2A1',
                                                width: '1px',
                                                height: '10px',
                                                marginLeft: '5px',
                                            }}
                                            mr="10px"
                                        >
                                            Success: {String(item.success)}
                                        </Text>
                                        <Text color="#CCC2A1" fontSize="14px" fontWeight={700}>
                                            Account: {item.account}
                                        </Text>
                                    </Flex>
                                </Flex>
                            ))
                        }
                        <Box
                            position="sticky"
                            left="0"
                            bottom="0"
                            w="100%"
                            h="80px"
                            pointerEvents="none"
                            bgGradient="linear-gradient(transparent, rgb(27 26 29))"
                        />
                    </Flex>

                </Box> */}
            </Box>
        </Layout>
    );
};

Robbery.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
};
export default Robbery;
