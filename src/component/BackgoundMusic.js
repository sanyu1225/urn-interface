import { useRef, useEffect } from 'react';
import Image from 'next/image';
import { Grid, Box, Button } from '@chakra-ui/react';
import useWindowSize from '@/hooks/useWindowSize';
import { useWalletContext } from '../context';
import Mute from '@/assets/images/icons/Mute.svg';
import Voice from '@/assets/images/icons/Voice.svg';
import BackgroundAudio from '@/assets/music/background.mp3';

const BackgroundMusic = () => {
    const [width] = useWindowSize();
    const { isPlayBackground, setIsPlayBackground } = useWalletContext();
    const audioRef = useRef();

    const playOrMute = () => {
        if (isPlayBackground) {
            audioRef.current.pause();
            setIsPlayBackground(false);
        } else {
            audioRef.current.play();
            setIsPlayBackground(true);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            if (isPlayBackground) {
                audioRef.current.play();
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlayBackground, audioRef]);

    return (
        <Grid
            textAlign="right"
            position="fixed"
            bottom="40px"
            zIndex={2}
            right={{
                base: `${(width - 1024) / 2 + 32}px`,
                mid: `${(width - 1440) / 2 + 32}px`,
                desktop: `${(width - 1920) / 2 + 32}px`,
            }}
            gridAutoFlow="column"
        >
            <audio
                autoPlay
                ref={audioRef}
                src={BackgroundAudio}
                preload="metadata"
            />
            <Box position="relative">
                <Box w="100%">
                    <Button w="54px" p="0" variant="hamburger" onClick={() => playOrMute()}>
                        {
                            isPlayBackground ? (
                                <Image width={20} height={20} src={Mute} alt="Mute" />
                            ) : (
                                <Image width={20} height={20} src={Voice} alt="Mute" />
                            )
                        }
                    </Button>
                </Box>
            </Box>
        </Grid>
    );
};

export default BackgroundMusic;
