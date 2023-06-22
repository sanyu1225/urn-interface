import { useState, useRef } from 'react';
import Image from 'next/image';
import PropTypes from 'prop-types';
import { Box, Flex, Text, Grid } from '@chakra-ui/react';
import Layout from '../layout';
import Typewriter from '../component/Typewriter';
import TombstoneImg from '../assets/images/faq/faq_tombstone.png';
import TombstoneImgWebp from '../assets/images/faq/faq_tombstone.webp';
import HomeBaseBg from '../assets/images/faq/faq_1024.jpg';
import HomeBaseBgWebp from '../assets/images/faq/faq_1024.webp';
import Home1440Bg from '../assets/images/faq/faq_1440.png';
import Home1440BgWebp from '../assets/images/faq/faq_1440.webp';
import HomeBg1920 from '../assets/images/faq/faq_bg.png';
import HomeBg1920Webp from '../assets/images/faq/faq_bg.webp';
import StoneImg from '../assets/images/faq/faq_stone.png';
import StoneImgWebp from '../assets/images/faq/faq_stone.webp';
import MediaIcon from '../assets/images/faq/Media.svg';
import KeyboardAudio from '@/assets/music/keyboard.mp3';

const FAQ_LIST = [{
    title: 'What will I earn?',
    description: 'you earn fun',
}, {
    title: 'Will you rug?',
    description: 'Nah, soft rug at most',
}, {
    title: 'What will happen if I fill the urn?',
    description: 'Congratulations! Your grandma has now secured her eternal digital residency on the blockchain.',
}, {
    title: 'What the heck are you doing?',
    description: "Hold onto your hats, this wild ride is just getting started - we're only in phase one! For now, kick back and relish the delicious chaos of our gameplay NFTs.",
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
        if (info === item.title) return;
        setInfo(item.description);
        handlePlay();
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
                            left={{ base: '14%', mid: '20%' }}
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
                    zIndex={1}
                />
                <Box
                    bgImage={{
                        base: isSupportWebp ? TombstoneImgWebp.src : TombstoneImg.src,
                    }}
                    bgRepeat="no-repeat"
                    bgSize="100% 100%"
                    w={{ base: '512px', mid: '684px' }}
                    h={{ base: '678', mid: '906px' }}
                    position="absolute"
                    bottom="0"
                    left={{ base: '30%', mid: '31%', desktop: '35%' }}
                >
                    <Grid position="absolute" bottom={{ base: '20%', mid: '25%' }} textAlign="center" justifyItems="center" w="85%">
                        <Text color="#FFF3CD" fontSize={{ base: '24px', mid: '28px' }} fontWeight={700}>
                            Need some help?
                        </Text>
                        <Grid w="55%" zIndex={2} mt={{ base: '20px', mid: '32px' }} gap={{ base: '10px', mid: '18px' }}>
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
                                        <Image src={MediaIcon} alt="media" />
                                        <Text color="#CCC2A1" fontSize={{ base: '14px', mid: '16px' }} fontWeight={500}>{item.title}</Text>
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
