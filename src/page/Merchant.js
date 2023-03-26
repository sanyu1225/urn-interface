/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Button } from '@chakra-ui/react';
import useCusToast from '../hooks/useCusToast';
import { BloctoWalletName, useWallet } from '@manahippo/aptos-wallet-adapter';
import Layout from '../layout';
import CONTRACT_ADDR from '../constant'
import HomeBg from '../assets/images/merchant/merchant_bg.png';
import HomeBgWebp from '../assets/images/merchant/merchant_bg.webp';
import HomeBaseBg from '../assets/images/merchant/merchant_1440.png';
import HomeBaseBgWebp from '../assets/images/merchant/merchant_1440.webp';
import FurnaceImg from '../assets/images/merchant/merchant_furnace.png';
import FurnaceImgWebp from '../assets/images/merchant/merchant_furnace.webp';
import BoardSmallImg from '../assets/images/merchant/merchant_board_small.png';
import BoardSmallImgWebp from '../assets/images/merchant/merchant_board_small.webp';
import SkullImg from '../assets/images/merchant/merchant_skull.png';
import SkullImgWebp from '../assets/images/merchant/merchant_skull.webp';
import BoardBigImg from '../assets/images/merchant/merchant_board_big.png';
import BoardBigImgWebp from '../assets/images/merchant/merchant_board_big.webp';
import { ReactComponent as BowlImg } from '../assets/images/merchant/bowl.svg';


const Merchant = ({ isSupportWebp }) => {

    const { connect, connected, signAndSubmitTransaction } = useWallet()
    const { toastSeccess, toastError } = useCusToast()
    const [isLoading, setLoading] = useState(false);

    const checkLogin = async () => {
        if (connected) {
            return true
        }
        await connect(BloctoWalletName)
        return false
    }

    const signAndSubmitTransactionFnc = async (payload,
        options = {
            max_gas_amount: "20000",
            gas_unit_price: "200",
        }) => {
        try {
            setLoading(true);
            const { hash } = await signAndSubmitTransaction(payload, options);
            if (hash) {
                return hash;
            }
            throw new Error('hash is null');
        } catch (error) {
            console.log(error);
            return null;
        } finally {
            setLoading(false)
        }
    }

    const mint = async (functionName) => {
        await checkLogin()
        if (isLoading) return null
        const shovel = {
            arguments: [],
            function: `${CONTRACT_ADDR}::urn_to_earn::${functionName}`,
            type: 'entry_function_payload',
            type_arguments: [],
        };
        const hash = await signAndSubmitTransactionFnc(shovel);
        if (hash) {
            toastSeccess(hash)
        } else {
            toastError('error')
        }
        return null
    }


    return (
        <Layout>
            <Box
                maxW="1920px"
                bgImage={{
                    base: isSupportWebp ? HomeBaseBgWebp : HomeBaseBg,
                    desktop: isSupportWebp ? HomeBgWebp : HomeBg
                }}
                w="100%"
                bgRepeat="no-repeat"
                bgSize="100% 100%"
                minH={{ base: '768px', mid: '900px', desktop: '1080px' }}
                minW={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
                position="relative"
            >
                <Box
                    bgImage={{
                        base: isSupportWebp ? BoardSmallImgWebp : BoardSmallImg,
                    }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w={{ base: '246px' }}
                    minH={{ base: '358px' }}
                    position="absolute"
                    bottom="32vh"
                    right={{ base: '12%' }}
                >
                    <Flex justifyContent="center" mt="4rem" wrap="wrap" p="0 49px" pb="2.3rem">
                        <Text w="100%" textAlign="center" color="#794D0B" fontSize="20px" fontWeight={700} mb="0.9rem">
                            Golden urn
                        </Text>
                        <BowlImg />
                        <Text w="100%" textAlign="center" color="#794D0B" fontSize="14px" fontWeight={500} mb="0.9rem" mt="0.9rem">
                            it&apos;s lame without the golden urn.
                        </Text>
                        <Button variant="gold" onClick={() => mint('mint_golden_bone')}>
                            Forge
                        </Button>
                    </Flex>
                </Box>
                <Box
                    bgImage={{
                        base: isSupportWebp ? FurnaceImgWebp : FurnaceImg,
                    }}
                    w="24.4rem"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '42.3vh' }}
                    position="absolute"
                    bottom="0px"
                    right={{ base: '19%' }}
                />
                <Flex
                    wrap="wrap"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w="34.8rem"
                    minH={{ base: '923px', mid: '923px' }}
                    position="absolute"
                    bottom="0px"
                    right={{ base: '42%' }}
                >
                    <Box
                        bgImage={{
                            base: isSupportWebp ? BoardBigImgWebp : BoardBigImg
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '556px', mid: '556px', desktop: '556px' }}
                        minH={{ base: '406px', mid: '406px', desktop: '406px' }}
                    >

                        <Flex justifyContent="space-evenly" mt="10rem">
                            <Flex wrap="wrap" w="40%" bg="#FCD791" borderRadius="20px" p="16px" justifyContent="center">
                                <Text fontSize="20px" fontWeight={700} color="#292229" textAlign="center" w="100%" >
                                    Buy shovel
                                </Text>
                                <Text mt="12px" fontSize="20px" fontWeight={500} color="#292229" textAlign="center" w="100%">
                                    Every grave robber needs a shovel.
                                </Text>
                                <Button mt="12px" variant="dark" onClick={() => mint('mint_shovel')}>
                                    Buy shovel
                                </Button>
                            </Flex>
                            <Flex wrap="wrap" w="40%" bg="#FCD791" borderRadius="20px" p="16px" justifyContent="center">
                                <Text fontSize="20px" fontWeight={700} color="#292229" textAlign="center" w="100%">
                                    Buy urn
                                </Text>
                                <Text mt="12px" fontSize="20px" fontWeight={500} color="#292229" textAlign="center" w="100%">
                                    I think... you need an urn for bones.
                                </Text>
                                <Button mt="12px" variant="dark" onClick={() => mint('mint_urn')}>
                                    Buy urn
                                </Button>
                            </Flex>
                        </Flex>
                    </Box>
                    <Box
                        bgImage={{
                            base: isSupportWebp ? SkullImgWebp : SkullImg
                        }}
                        bgRepeat="no-repeat"
                        bgSize="100% 100%"
                        w={{ base: '362px', mid: '491px' }}
                        minH={{ base: '381px', mid: '517px' }}
                    />
                </Flex>

            </Box>
        </Layout>
    )
};

Merchant.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
}
export default Merchant;
