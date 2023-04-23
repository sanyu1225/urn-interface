import PropTypes from 'prop-types';
import { Box, Flex } from '@chakra-ui/react';
import Layout from '../layout';
import EventBg from '../assets/images/event/event_1920.jpg';
import EventBgWebp from '../assets/images/event/event_1920.webp';
import Event1440Bg from '../assets/images/event/event_1440.jpg';
import Event1440BgWebp from '../assets/images/event/event_1440.webp';
import Event1024Bg from '../assets/images/event/event_1024.jpg';
import Event1024BgWebp from '../assets/images/event/event_1024.webp';

const EventPage = ({ isSupportWebp }) => (
    <Layout>
        <Box
            maxW="1920px"
            bgImage={{
                base: isSupportWebp ? Event1024BgWebp.src : Event1024Bg.src,
                mid: isSupportWebp ? Event1440BgWebp.src : Event1440Bg.src,
                desktop: isSupportWebp ? EventBgWebp.src : EventBg.src,
            }}
            bgRepeat="no-repeat"
            bgSize="100% 100%"
            minH={{ base: '768', mid: '900px', desktop: '1080px' }}
            w={{ base: '1440px', mid: '1440px', desktop: '1920px' }}
            position="relative"
        >
            <Flex color="white">
                TODO event page
            </Flex>
        </Box>
    </Layout>
);

EventPage.prototype = {
    isSupportWebp: PropTypes.bool.isRequired,
};

export default EventPage;
