/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import { Grid, Flex, Box, Button, keyframes, Text, Divider, Link, MenuItem } from '@chakra-ui/react';
import { useWalletContext } from '../context'
import { BloctoWalletName } from '@manahippo/aptos-wallet-adapter';
import Cusmenu from "./Cusmenu";
import useCopyToClipboard from "../hooks/useCopyToClipboard";
import useWindowSize from '../hooks/useWindowSize';
import { shortenAddress } from '../utils'
import { HamburgerIcon } from '@chakra-ui/icons';
import { ReactComponent as CloseIcon } from '../assets/images/icons/Close.svg';
import { ReactComponent as LogoIcon } from '../assets/images/icons/Logo.svg';
import { ReactComponent as TwitterIcon } from '../assets/images/icons/Twitter.svg';
import { ReactComponent as TgIcon } from '../assets/images/icons/Tg.svg';
import { ReactComponent as CopyIcon } from '../assets/images/icons/Copy.svg';
import { ReactComponent as LogoutIcon } from '../assets/images/icons/Logout.svg';

const display = keyframes`
    from {
        opacity: 0;
        height: 0;
    }
    to {
        opacity: 1;
        height: 644px;
    }`;
const displayAnimation = `${display} 1 0.2s linear`;

// TODO: 跟設計討論hover樣式
// eslint-disable-next-line react/prop-types
function AnimationLink({ children, path, disabled = false }) {
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <Link
      color={disabled ? "#676765" : "#FFF3CD"}
      cursor={disabled ? "not-allowed" : "pointer"}
      display="inline-flex"
      alignItems="center"
      w="100%"
      ml={disabled || isActive ? '' : '28px'}
      wordBreak="keep-all"
      href={path}
      _hover={{
        textDecoration: "none",
      }}
      sx={!disabled && !isActive ? {
        "&::before": {
          content: "\">\"",
          fontSize: 16,
          opacity: 0,
          marginLeft: -12,
          transition: "all 0.3s ease",
          marginRight: '12px',
        },
        "&:hover::before": {
          opacity: 1,
          marginLeft: 0,
        },
      } : {}}
    >
      {isActive && <Box mr="12px">&gt;</Box>}
      <Text as="span" mr={disabled ? '0' : '2px'} fontSize={disabled ? '14px' : '18px'}>
        {children}
      </Text>
    </Link>
  );
}

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { connect, disconnect, connected, account } = useWalletContext();
  const [copyToClipboard] = useCopyToClipboard();
  const [width] = useWindowSize();

  const address = account && account.address;

  return (
    <Grid textAlign="right" position="absolute" top="32px" zIndex={2}
      right={{
        base: `${(width - 1024) / 2 + 32}px`,
        mid: `${(width - 1440) / 2 + 32}px`,
        desktop: `${(width - 1920) / 2 + 32}px`
      }} gridAutoFlow="column"
    >
      {
        connected ? (
          <Cusmenu buttonText="Wallet">
            <MenuItem
              bg="#292229"
              _hover={{
                opacity: 0.8,
              }}
              p="16 28px"
            >
              <Flex flexWrap="wrap" w="100%" onClick={() => copyToClipboard(address)}>
                <Text color="#FFF3CD" fontSize="14px" fontWeight={700} w="100%">
                  Your Address
                </Text>
                <Flex justifyContent="space-between" w="100%">
                  <Text color="#FFF3CD" fontSize="14px" fontWeight={700}>
                    {account && shortenAddress(account.address)}
                  </Text>
                  <CopyIcon />
                </Flex>
              </Flex>
            </MenuItem>
            <MenuItem
              mt="14px"
              bg="#292229"
              _hover={{
                opacity: 0.8,
              }}
              p="16 28px"
            >
              <Flex justifyContent="space-between" w="100%" onClick={disconnect}>
                <Text color="#FFF3CD" fontSize="14px" fontWeight={700}>
                  Log out
                </Text>
                <LogoutIcon />
              </Flex>
            </MenuItem>
          </Cusmenu>
        ) : (
          <Button variant="hamburger" mr="14px" onClick={() => connect(BloctoWalletName)}>
            Connect Wallet
          </Button>
        )
      }


      <Box position="relative">
        <Box w="100%">
          <Button w="54px" variant="hamburger" onClick={() => setIsOpen((state) => !state)}>
            <HamburgerIcon color="#FFF3CD" />
          </Button>
        </Box>

        {isOpen && (
          <Box
            p="28px"
            animation={displayAnimation}
            borderRadius="10px"
            h="644px"
            w="280px"
            bg="#292229"
            position="absolute"
            right="0"
            top="0"
            color="#FFF3CD"
            fontWeight={700}
            fontSize="18px"
          >
            <Flex w="100%" justifyContent="flex-end">
              <CloseIcon cursor="pointer" onClick={() => setIsOpen((state) => !state)} />
            </Flex>
            <Flex alignItems="center" p="12px">
              <LogoIcon />
              <Text ml="12px" >Urn2urn</Text>
            </Flex>
            <Grid gap="40px" alignItems="center" wrap="wrap" p="12px">
              <AnimationLink path="/">Home</AnimationLink>
              <AnimationLink path="/merchant">Merchant</AnimationLink>
              <AnimationLink path="/graveyard">Graveyard</AnimationLink>
              <AnimationLink path="/altar">Altar</AnimationLink>
              <AnimationLink disabled path="/teleport">Reincarnation *Coming soon</AnimationLink>
              <AnimationLink path="/faq">FAQ</AnimationLink>
            </Grid >
            <Flex wrap="wrap">
              <Divider mt="40px" mb="25px" borderColor="#FFF3CD" />
              <Flex w="100%">
                <Box mr="20px" cursor="pointer">
                  <TwitterIcon />
                </Box>
                <Box cursor="pointer">
                  <TgIcon />
                </Box>
              </Flex>
            </Flex>
          </Box>
        )}
      </Box>
    </Grid >
  );
};

export default Landing;
