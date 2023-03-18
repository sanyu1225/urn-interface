import React, { useState, useRef } from 'react';
import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import TombstoneImg from '../assets/images/faq/faq_tombstone.png'
import { ReactComponent as MediaIcon } from '../assets/images/faq/Media.svg';
import Typewriter from '../component/Typewriter';
import Layout from '../layout';
import HomeBg from '../assets/images/faq/faq_bg.png';
import StoneImg from '../assets/images/faq/faq_stone.png'
import KeyboardAudio from '../assets/keyboard.mp3'

const FAQ_LIST = [{
    title: 'What will I earn?'
}, {
    title: 'Fun and a god damn cool NFT'
}, {
    title: 'Will you rug?'
}, {
    title: 'Nah, soft rug at most'
}, {
    title: 'What will happen if I fill the urn?'
}, {
    title: 'Congrats, your grandma lives on-chain permanently.'
}]

const Altar = () => {

    const audioRef = useRef();
    const [info, setInfo] = useState('')

    const handlePlay = () => {
        audioRef.current.play();
    };

    const handlePause = () => {
        audioRef.current.pause();
    };

    const showInfo = (item) => {
        // TODO: show info message not title..
        if (info === item.title) return
        setInfo(item.title)
        handlePlay()
    }

    return (
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
                <audio
                    ref={audioRef}
                    src={KeyboardAudio}
                    preload="metadata"
                />
                {
                    info && (
                        <Box
                            w="300px"
                            position="absolute"
                            top="20%"
                            left="20%"
                        >
                            <Typewriter key={info} content={info} onComplete={handlePause} />
                        </Box>
                    )
                }
                <Box
                    bgImage={TombstoneImg}
                    w="42.8rem"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '56.5rem' }}
                    position="absolute"
                    bottom="0"
                    left={{ base: '35%' }}
                >
                    <Grid position="absolute" bottom="15%" textAlign="center" justifyItems="center" w="85%">
                        <Text color="#FFF3CD" fontSize="28px" fontWeight={700}>
                            Need some help?
                        </Text>
                        <Grid w="60%" mt="32px" gap="18px">
                            {
                                FAQ_LIST.map(item => (
                                    <Flex
                                        textAlign="left"
                                        key={item.title}
                                        _hover={{
                                            cursor: 'pointer',
                                            transform: 'scale(0.98)',
                                            color: '#FFF3CD'
                                        }}
                                        _active={{
                                            transform: 'scale(0.96)',
                                            color: '#FFF3CD'
                                        }}
                                        onClick={() => showInfo(item)}
                                    >
                                        <MediaIcon /> <Text color="#CCC2A1" fontSize="16px" fontWeight={500}>{item.title}</Text>
                                    </Flex>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    bgImage={StoneImg}
                    w="100%"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '18.4rem' }}
                    position="absolute"
                    bottom="0"
                />
            </Box>
        </Layout>
    )
};

export default Altar;
