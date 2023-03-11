import React from 'react';
import { Flex, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import Hamburger from '../component/Hamburger'

const Layout = ({ children }) => (
    <Flex justify="center" bgColor="#14181b">
        <Box
            maxW="1920px"
            w="100%"
            minH={{ base: '100vh' }}
            position="relative"
        >
            <Hamburger />
            {children}
        </Box>
    </Flex>
)

Layout.prototype = {
    children: PropTypes.node.isRequired,
}
export default Layout