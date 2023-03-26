import React from 'react'
import PropTypes from 'prop-types';
import { MenuButton, Portal, MenuList, Menu } from '@chakra-ui/react'


const Cusmenu = ({ buttonText, children }) => (
    <Menu>
        <MenuButton
            mr="17px"
            p="14px 32px"
            color="#FFF3CD"
            background='#292229'
            backgroundColor='#292229'
            transition='all 0.2s ease-in-out'
            borderRadius="10"
            fontSize='16px'
            fontWeight='600'
            _hover={{
                borderColor: 'transparent',
                backgroundColor: '#292229',
                opacity: 0.8,
                transform: 'scale(0.98)',
            }}
            _active={{

                borderColor: 'transparent',
                backgroundColor: '#292229',
                opacity: 0.9,
                transform: 'scale(0.96)',
            }}
            _focus={{
                borderColor: 'transparent',
                boxShadow: 'none',
            }}
        >{buttonText}</MenuButton>
        <Portal>
            <MenuList bg="#292229" borderColor="#292229" >
                {children}
            </MenuList>
        </Portal>
    </Menu >
)

Cusmenu.prototype = {
    buttonText: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
}

export default Cusmenu