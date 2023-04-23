import { Flex } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Hamburger from '../component/Hamburger';
import useWindowSize from '../hooks/useWindowSize';

const Layout = ({ children }) => {
    const [width] = useWindowSize();
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
                    width > 1024 && (
                        <Hamburger />
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
