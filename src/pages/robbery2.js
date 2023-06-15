/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import useSound from 'use-sound';
import { Box, Flex, Text, Button, Image, Input } from '@chakra-ui/react';
import { useQuery } from 'urql';
import RobButton from 'src/component/RobBlock';
import { isEmpty } from '@/plugin/lodash';
import { queryAltarData, CREATOR_ADDRESS } from '../constant';
import { useWalletContext } from '../context';
import Layout from '../layout';
import Carousel from '@/component/Carousel';
import HomeBg from '../assets/images/robbery/robbery_1920.jpg';
import HomeBgWebp from '../assets/images/robbery/robbery_1920.webp';
import Home1440Bg from '../assets/images/robbery/robbery_1440.jpg';
import Home1440BgWebp from '../assets/images/robbery/robbery_1440.webp';
import HomeBaseBg from '../assets/images/robbery/robbery_1024.jpg';
import HomeBaseBgWebp from '../assets/images/robbery/robbery_1024.webp';
import CardBrandImg from '../assets/images/altar/cardbrand.png';
import CardBrandImgWebp from '../assets/images/altar/cardbrand.webp';
import RobberImg from '../assets/images/robbery/robber.png';
import RobberImgWebp from '../assets/images/robbery/robber.webp';
import ButtonClickAudio from '../assets/music/clickButton.mp3';

const Robbery = ({ isSupportWebp }) => {
    const [choiseUrn, setChoiseUrn] = useState({});
    const [victimAddress, setVictimAddress] = useState('');
    const [playButton] = useSound(ButtonClickAudio);

    const { connected, account, mint } = useWalletContext();
    const address = account && account.address;

    const [result, reexecuteQuery] = useQuery({
        query: queryAltarData,
        variables: {
            address,
            offset: 0,
            creator_address: CREATOR_ADDRESS,
        },
    });

    const { data, fetching, error } = result;
    console.log('data: ', data);
    const UrnList = data && data?.current_token_ownerships?.filter((item) => item?.name === 'urn' || item?.name === 'golden urm');

    useEffect(() => {
        if (connected) {
            reexecuteQuery();
        } else {
            setChoiseUrn({});
        }
    }, [connected, reexecuteQuery]);

    const robHandler = async () => {
        console.log('todo put in contract.', choiseUrn);
        const params = [
            choiseUrn.property_version,
        ];
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
                    desktop: isSupportWebp ? HomeBgWebp.src : HomeBg.src,
                }}
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '768px', mid: '900px', desktop: '1080px' }}
                w={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
                position="relative"
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
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
                        Stop digging like a dumb ass, rob random
        fuckers make your life easier.
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
                        {
                            (
                                isEmpty(UrnList) ? (
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
                                )
                            )
                        }
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
                            <Input color="#FFF3CD" placeholder="who's the fucker?" value={victimAddress} onChange={(e) => setVictimAddress(e.target.value)} />
                            <RobButton choiseUrnPropertyVersion={choiseUrn.property_version} victimAddress={victimAddress} isDisabled={!isUrnEnabled()} isLoading={fetching} buttonText={urnButtonText(false)} />
                        </Flex>
                    </Flex>
                </Flex>

            </Box>
        </Layout>
    );
};

Robbery.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
};
export default Robbery;
