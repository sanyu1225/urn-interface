import { Flex, useMediaQuery } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Hamburger from '../component/Hamburger';
import BackgroundMusic from '@/component/BackgoundMusic';

const Layout = ({ children }) => {
    const [isDesktop] = useMediaQuery('(min-width: 1024px)');

    return (
        <Flex justify="center" bgColor="#14181b">
            <Flex
                justify="center"
                maxW="1920px"
                w="100%"
                minH={{ base: '100vh' }}
                position="relative"
                m="0 auto"
            >
                {
                    isDesktop && (
                        <>
                            <Hamburger />
                            <BackgroundMusic />
                        </>
                    )
                }
                {children}
            </Flex>
        </Flex>
    );
};

Layout.prototype = {
    children: PropTypes.node.isRequired,
};
export default Layout;
