import { useState, useRef } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import Layout from '../layout';
import Typewriter from '../component/Typewriter';
import TombstoneImg from '../assets/images/faq/faq_tombstone.png';
import TombstoneImgWebp from '../assets/images/faq/faq_tombstone.webp';
import HomeBg from '../assets/images/faq/faq_bg.png';
import HomeBgWebp from '../assets/images/faq/faq_bg.webp';
import HomeBaseBg from '../assets/images/faq/faq_1440.png';
import HomeBaseBgWebp from '../assets/images/faq/faq_1440.webp';
import StoneImg from '../assets/images/faq/faq_stone.png';
import StoneImgWebp from '../assets/images/faq/faq_stone.webp';
import MediaIcon from '../assets/images/faq/Media.svg';
import KeyboardAudio from '@/assets/music/keyboard.mp3';

const FAQ_LIST = [{
    title: 'What will I earn?',
}, {
    title: 'Fun and a god damn cool NFT',
}, {
    title: 'Will you rug?',
}, {
    title: 'Nah, soft rug at most',
}, {
    title: 'What will happen if I fill the urn?',
}, {
    title: 'Congrats, your grandma lives on-chain permanently.',
}];

const FAQ = ({ isSupportWebp }) => {
    const audioRef = useRef();
    const [info, setInfo] = useState('');

    const handlePlay = () => {
        audioRef.current.play();
    };

    const handlePause = () => {
        audioRef.current.pause();
    };

    const showInfo = (item) => {
        // TODO: show info message not title..
        if (info === item.title) return;
        setInfo(item.title);
        handlePlay();
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
                minW={{ base: '1024px', mid: '1440px', desktop: '1920px' }}
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
                    bgImage={{
                        base: isSupportWebp ? StoneImgWebp.src : StoneImg.src,
                    }}
                    w="100%"
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    minH={{ base: '220px', mid: '220px', desktop: '294px' }}
                    position="absolute"
                    bottom="0"
                />
                <Box
                    bgImage={{
                        base: isSupportWebp ? TombstoneImgWebp.src : TombstoneImg.src,
                    }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w={{ base: '684px' }}
                    minH={{ base: '906px' }}
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
                                FAQ_LIST.map((item) => (
                                    <Flex
                                        textAlign="left"
                                        key={item.title}
                                        _hover={{
                                            cursor: 'pointer',
                                            transform: 'scale(0.98)',
                                            color: '#FFF3CD',
                                        }}
                                        _active={{
                                            transform: 'scale(0.96)',
                                            color: '#FFF3CD',
                                        }}
                                        onClick={() => showInfo(item)}
                                    >
                                        <Image src={MediaIcon} alt="media" /><Text color="#CCC2A1" fontSize="16px" fontWeight={500}>{item.title}</Text>
                                    </Flex>
                                ))
                            }
                        </Grid>
                    </Grid>
                </Box>

            </Box>
        </Layout>
    );
};

FAQ.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
};
export default FAQ;
