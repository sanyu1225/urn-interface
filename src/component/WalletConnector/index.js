import {
    Button,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
    Flex,
    Image,
    Grid,
    Box,
} from '@chakra-ui/react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

const WalletConnector = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { wallets, connect } = useWallet();

    const onWalletSelect = (walletName) => {
        connect(walletName);
        onClose();
    };

    return (
        <>
            <Button
                variant="hamburger"
                onClick={onOpen}
            >
                Connect Wallet
            </Button>
            <Modal
                blockScrollOnMount={false}
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent p="28px" bg="#292229">
                    <ModalHeader p="0 0 20px 0px" alignItems="center" color="#FFF3CD">Connect Wallet</ModalHeader>
                    <ModalCloseButton m="20px" color="#FFF3CD" />
                    <ModalBody p="0">
                        <Grid gap="10px">
                            {
                                wallets.map((wallet) => (
                                    <Flex
                                        key={wallet.name}
                                        justifyContent="space-between"
                                        alignItems="center"
                                        bg="#352D35"
                                        _hover={{
                                            bg: '#484148',
                                        }}
                                        p="12px 24px"
                                        h="72px"
                                        borderRadius="10px"
                                        rowGap="16px"
                                    >
                                        <Flex alignItems="center" rowGap="20px">
                                            <Image w="32px" h="32px" src={wallet.icon} alt={wallet.name} />
                                            <Text ml="20px" as="span" w="" textAlign="left" textColor="#FFF3CD" fontWeight={600}>
                                                {wallet.name}
                                            </Text>
                                        </Flex>
                                        <Box>
                                            {
                                                wallet.readyState === 'Installed' || wallet.readyState === 'Loadable' ? (
                                                    <Button variant="lightGray" w="100px" textAlign="center" p="10px 18px" bg="#FFF3CD" bgColor="#FFF3CD" color="#292229" h="70%" onClick={() => onWalletSelect(wallet.name)}>
                                                        connect
                                                    </Button>
                                                ) : (
                                                    <Button w="100px" variant="ghost" textAlign="center" color="#FFF3CD" h="70%" _hover={{ textColor: '#E3D4A2' }} onClick={() => window.open(wallet.url)}>
                                                        Install
                                                    </Button>
                                                )
                                            }
                                        </Box>
                                    </Flex>
                                ))
                            }

                        </Grid>
                        {/* <Text fontWeight="bold" mb="1rem">
                            You can scroll the content behind
                            the modal
                        </Text> */}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default WalletConnector;
