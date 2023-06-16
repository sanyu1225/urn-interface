/* eslint-disable */
import { useQuery } from 'urql';
import PropTypes from 'prop-types';
import { Button } from '@chakra-ui/react';
import { queryAltarData, CREATOR_ADDRESS } from '../constant';
import { useWalletContext } from '../context';
import useSound from 'use-sound';
import ButtonClickAudio from '../assets/music/clickButton.mp3';

const RobButton = ({ choiseUrnPropertyVersion, victimAddress, isDisabled, isLoading, buttonText }) => {

    const { mint } = useWalletContext();
    const [playButton] = useSound(ButtonClickAudio);

    console.log(`💥 victimAddress: ${JSON.stringify(victimAddress, null, '	')}`);
  
    const [victimResult, reexecuteQuery] = useQuery({
        query: queryAltarData,
        variables: {
            address: victimAddress,
            offset: 0,
            creator_address: CREATOR_ADDRESS,
        },
    });

    const { data, fetching, error } = victimResult;

    console.log(`💥 error: ${JSON.stringify(error, null, '	')}`);
    console.log(`💥 robHandler data: ${JSON.stringify(data, null, '	')}`);

    const robHandler = async (victim) => {
        // console.log('todo put in contract.', choiseUrn);
        console.log(`💥 victim: ${JSON.stringify(victim, null, '	')}`);
        let res;
        if (!victim) {
            return;
        }

        const victimUrnList = data && data?.current_token_ownerships?.filter((item) => item?.name === 'urn' || item?.name === 'golden urm');
        if (!victimUrnList) {
            return;
        }
        const maxUrn = victimUrnList.reduce((accumulator, current) => (accumulator.token_properties.ash > current.token_properties.ash ? accumulator : current));
        const params = [
            choiseUrnPropertyVersion,
            victim,
            maxUrn.property_version,
        ];
        console.log(`💥 params: ${JSON.stringify(params, null, '	')}`);
        res = await mint('rob', params);
    
        console.log('res: ', res);
        if (res) {
            console.log('todo reload nft.');
            reexecuteQuery();
        }
        playButton();
    };

    return (
        <Button
            variant="primary"
            onClick={() => robHandler(victimAddress)}
            h="47px"
            isDisabled={isDisabled}
            isLoading={isLoading || fetching}
        >
            {buttonText}
        </Button>
    );
  };

  RobButton.prototype = {
    choiseUrnPropertyVersion: PropTypes.string.isRequired,
    victimAddress: PropTypes.string,
    isDisabled: PropTypes.bool.isRequired,
    isLoading: PropTypes.bool.isRequired,
    buttonText: PropTypes.string.isRequired,
  };

  export default RobButton;