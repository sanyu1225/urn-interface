/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import React, { useState, useRef } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import { Grid, Flex, Box, Button, Text, Divider, Link, MenuItem, useOutsideClick } from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import WalletConnector from '@/component/WalletConnector';
import { useWalletContext } from '../context';
import Cusmenu from './Cusmenu';
import useCopyToClipboard from '@/hooks/useCopyToClipboard';
import useWindowSize from '@/hooks/useWindowSize';
import { shortenAddress } from '@/utils';
import CloseIcon from '@/assets/images/icons/Close.svg';
import LogoIcon from '@/assets/images/icons/Logo.svg';
import TwitterIcon from '@/assets/images/icons/Twitter.svg';
import TgIcon from '@/assets/images/icons/Tg.svg';
import CopyIcon from '@/assets/images/icons/Copy.svg';
import LogoutIcon from '@/assets/images/icons/Logout.svg';

// eslint-disable-next-line react/prop-types
function AnimationLink({ children, path, disabled = false }) {
  const { pathname } = useRouter();
  const isActive = pathname === path;
  return (
    <Link
      as={NextLink}
      color={disabled ? '#676765' : '#FFF3CD'}
      cursor={disabled ? 'not-allowed' : 'pointer'}
      display="inline-flex"
      alignItems="center"
      w="100%"
      ml={disabled || isActive ? '' : '28px'}
      wordBreak="keep-all"
      href={path}
      _hover={{
        textDecoration: 'none',
      }}

    >
      {isActive && <Box mr="12px">&gt;</Box>}
      <Text
        as="span"
        mr={disabled ? '0' : '2px'}
        fontSize={disabled ? '14px' : '18px'}
        // FIXME: hover animation.
        sx={!disabled && !isActive ? {
          '&::before': {
            content: '">"',
            fontSize: 16,
            opacity: 0,
            marginLeft: -12,
            transition: 'all 0.3s ease ',
            marginRight: '12px',
          },
          '&:hover::before': {
            opacity: 1,
          },
        } : {}}
      >
        {children}
      </Text>
    </Link>
  );
}

const Hamburger = ({ hideMenu }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { connect, disconnect, connected, account } = useWalletContext();
  const [copyToClipboard] = useCopyToClipboard();
  const [width] = useWindowSize();
  const ref = useRef();

  useOutsideClick({
    ref,
    handler: () => setIsOpen(false),
  });
  const address = account && account.address;

  const containerStyle = {
    opacity: isOpen ? 1 : 0,
    transition: 'opacity 0.2s linear',
    display: isOpen ? 'block' : 'none',
  };

  return (
    <Grid
      textAlign="right"
      position="absolute"
      top="32px"
      zIndex={2}
      right={{
        base: `${(width - 1024) / 2 + 32}px`,
        mid: `${(width - 1440) / 2 + 32}px`,
        desktop: `${(width - 1920) / 2 + 32}px`,
      }}
      gridAutoFlow="column"
    >
      {connected ? (
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
                <Image alt="copy" src={CopyIcon} cursor="pointer" />
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
              <Image alt="logout" src={LogoutIcon} cursor="pointer" />
            </Flex>
          </MenuItem>
        </Cusmenu>
      ) : (
        <Box mr="14px">
          <WalletConnector />
        </Box>
        // only blocto wallet connect ⬇️
        // <Button variant="hamburger" mr="14px" onClick={() => connect()}>
        //   Connect Wallet
        // </Button>
      )}

      {!hideMenu && (
        <Box position="relative">
          <Box w="100%" zIndex={isOpen ? 1 : 2}>
            <Button w="54px" variant="hamburger" onClick={() => setIsOpen((state) => !state)}>
              <HamburgerIcon color="#FFF3CD" />
            </Button>
          </Box>

          <Box
            ref={ref}
            zIndex={isOpen ? 2 : -1}
            p="28px"
            style={containerStyle}
            borderRadius="10px"
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
              <Box
                zIndex={2}
                cursor="pointer"
                transition="transform 0.3s ease"
                _hover={{
                  transform: 'rotate(90deg)',
                }}
              >
                <Image
                  src={CloseIcon}
                  alt="colse"
                  onClick={() => setIsOpen((state) => !state)}
                />
              </Box>
            </Flex>
            <Flex alignItems="center" p="12px">
              <Image src={LogoIcon} alt="loto" />
              <Text ml="12px">Urn2urn</Text>
            </Flex>
            <Grid gap="40px" alignItems="center" wrap="wrap" p="12px">
              <AnimationLink path="/">Home</AnimationLink>
              <AnimationLink path="/merchant">Merchant</AnimationLink>
              <AnimationLink path="/graveyard">Graveyard</AnimationLink>
              <AnimationLink path="/altar">Altar</AnimationLink>
              <AnimationLink path="/robbery">Robbery</AnimationLink>
              <AnimationLink disabled path="/teleport">
                Reincarnation *Coming soon
              </AnimationLink>
              <AnimationLink path="/faq">FAQ</AnimationLink>
            </Grid>
            <Flex wrap="wrap">
              <Divider mt="40px" mb="25px" borderColor="#FFF3CD" />
              <Flex w="100%">
                <Box mr="20px" cursor="pointer">
                  <Image src={TwitterIcon} alt="twitter" />
                </Box>
                <Box cursor="pointer">
                  <Image src={TgIcon} alt="telegram" />
                </Box>
              </Flex>
            </Flex>
          </Box>
        </Box>
      )}
    </Grid>
  );
};

export default Hamburger;
