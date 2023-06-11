/* eslint-disable */
import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Flex, Text, Button, Icon } from '@chakra-ui/react';
import { useWalletContext } from '../context';
import CONTRACT_ADDR from '../constant';
import shovelMintingPrice from '../pages/merchant';

const FlexBlock = ({ title, collectionName }) => {
    const { connected, getAptBalance, wlMint, account, waitForTransaction } = useWalletContext();
    const BAR_COUNT = 12;
    const [desc, setDesc] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [buttonText, setButtonText] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);
  
    const fetchData = async () => {
      const requests = [];
      const quota = fetch('https://fullnode.testnet.aptoslabs.com/v1/view', {
        method: 'POST',
        body: JSON.stringify({
          function: `${CONTRACT_ADDR}::whitelist::get_collection_left_quota`,
          type_arguments: [],
          arguments: [collectionName],
        }),
        headers: {
          'content-type': 'application/json',
        },
      });
      requests.push(quota);
      if (account && account?.address) {
        const isWhitelistAndMinted = fetch('https://fullnode.testnet.aptoslabs.com/v1/view', {
          method: 'POST',
          body: JSON.stringify({
            function: `${CONTRACT_ADDR}::whitelist::view_is_whitelisted_and_minted`,
            type_arguments: [],
            arguments: [collectionName, account.address],
          }),
          headers: {
            'content-type': 'application/json',
          },
        });
        requests.push(isWhitelistAndMinted);
      } else {
        setIsDisabled(true);
      }
      const [qResponse, wResponse] = await Promise.all(requests);
      const aptBalance = await getAptBalance();
      const quotaResponse = await qResponse.json();
      const freeQuota = quotaResponse[0]
      const helfQuota = quotaResponse[1]
      if (Array.isArray(quotaResponse)) {
        setDesc(`Free: ${freeQuota}\n50% off: ${helfQuota}`);
      } else {
        console.log(`quotaResponse should be array instead of ${JSON.stringify(quotaResponse, null, '	')}`);
      }
      if (wResponse) {
        console.log(`💥 account?.address: ${JSON.stringify(account?.address, null, '	')}`);
        try {
          const isWhitelistAndMintedResponse = await wResponse.json();
          if (Array.isArray(isWhitelistAndMintedResponse)) {
            const mintable = isWhitelistAndMintedResponse[1];
            const whitelisted = isWhitelistAndMintedResponse[0];
            if (mintable) {
              if (whitelisted) {
                if (freeQuota == 0) {
                  if (aptBalance <= (BigInt(shovelMintingPrice) / 2)) {
                    setButtonText('You beggar');
                  } else {
                    setButtonText('Buy');
                  }
                } else {
                  setButtonText('Claim');
                }
              } else {
                setButtonText('Not eligible');
              }
              setIsDisabled(!whitelisted);
            } else if (whitelisted) {
              setButtonText('Minted');
              setIsDisabled(true);
            } else if (Number(quotaResponse[0]) + Number(quotaResponse[1]) === 0) {
              setButtonText('Sold out');
              setIsDisabled(true);
            } else {
              setButtonText('Not eligible');
              setIsDisabled(true);
            }
          } else {
            setButtonText('some thing wrong');
            console.log(
              `isWhitelistResponse should be array instead of ${JSON.stringify(isWhitelistAndMintedResponse, null, '	')}`
            );
          }
        } catch (error) {
          setButtonText('some thing wrong');
          console.log(error);
        }
        setIsLoading(false);
      }
    };
    useEffect(() => {
      fetchData();
    }, [account]);
  
    const mint = async () => {
      const toastId = Date.now();
      await wlMint(collectionName, toastId);
      await fetchData();
    };
  
    let buttonContent;
    if (!connected) {
      buttonContent = <Text>Not connected</Text>;
    } else if (isLoading) {
      buttonContent = (
        <Icon viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
          {Array.from(new Array(BAR_COUNT), (value, index) => index).map((index) => (
            <g key={index} transform={`rotate(${index * (360 / BAR_COUNT)} 50 50)`}>
              <rect x={47} y={12} rx={4} ry={4} width={6} height={18}>
                <animate
                  attributeName="opacity"
                  values="1;0"
                  dur="1s"
                  begin={`${index * (1 / BAR_COUNT) - 1}s`}
                  repeatCount="indefinite"
                />
              </rect>
            </g>
          ))}
        </Icon>
      );
    } else {
      buttonContent = <Text>{buttonText}</Text>;
    }
  
    return (
      <Flex
        w="200px"
        h="177px"
        flexDirection="column"
        p="20px"
        bg="#292229"
        borderRadius="20px"
        border="1px solid #FFF3CD"
        rowGap="16px"
      >
        <Text
          fontSize="20px"
          fontWeight={700}
          color="#FFF3CD"
          textAlign="center"
          w="100%"
          lineHeight="24px"
        >
          {title}
        </Text>
        <Text
          fontSize="14px"
          fontWeight={500}
          color="#FFF3CD"
          textAlign="center"
          w="100%"
          lineHeight="17px"
          whiteSpace="pre-line"
        >
          {desc}
        </Text>
        <Button
          variant="primary"
          onClick={mint}
          h="47px"
          isDisabled={isDisabled}
        >
          {buttonContent}
        </Button>
      </Flex>
    );
  };

  FlexBlock.prototype = {
    title: PropTypes.string.isRequired,
    collectionName: PropTypes.string.isRequired,
  };

  export default FlexBlock;