import { createContext, useContext, useState, useMemo } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosClient } from 'aptos';
import useCusToast from '../hooks/useCusToast';

import CONTRACT_ADDR from '../constant';

export const TESTNET_NODE_URL = 'https://fullnode.testnet.aptoslabs.com/v1';

const aptosClient = new AptosClient(TESTNET_NODE_URL, {
    WITH_CREDENTIALS: false,
});

const Context = createContext();

export function useWalletContext() {
    return useContext(Context);
}

export function ContextProvider({ children }) {
    const { connect, connected, signAndSubmitTransaction, account, disconnect } = useWallet();
    const [isLoading, setLoading] = useState(false);
    const [isPlayBackground, setIsPlayBackground] = useState(true);
    const { toastSeccess, toastError, toastLoading } = useCusToast();

    const checkLogin = async () => {
        if (connected) {
            return true;
        }
        return false;
    };

    const signAndSubmitTransactionFnc = async (
        payload,
        options = {
            max_gas_amount: '20000',
            gas_unit_price: '200',
        },
    ) => {
        try {
            setLoading(true);
            const { hash } = await signAndSubmitTransaction(payload, options);
            if (hash) {
                return hash;
            }
            throw new Error('hash is null');
        } catch (error) {
            console.error(error);
            return null;
        } finally {
            setLoading(false);
        }
    };

    // FIXME for default contract function name
    const mint = async (functionName, args = []) => {
        try {
            const isLogin = await checkLogin();
            if (!isLogin || isLoading) return null;
            const params = {
                arguments: args,
                function: `${CONTRACT_ADDR}::urn_to_earn::${functionName}`,
                type: 'entry_function_payload',
                type_arguments: [],
            };
            const hash = await signAndSubmitTransactionFnc(params);
            if (hash) {
                toastSeccess(hash);
                return hash;
            }
            toastError('error');
            return null;
        } catch (error) {
            toastError(error);
        }
    };

    const wlMint = async (collectionName, toastId) => {
        const isLogin = await checkLogin();
        if (!isLogin) return null;
        if (isLoading) return null;
        const shovel = {
            arguments: [collectionName],
            function: `${CONTRACT_ADDR}::urn_to_earn::wl_mint_shovel`,
            type: 'entry_function_payload',
            type_arguments: [],
        };
        const hash = await signAndSubmitTransactionFnc(shovel);
        if (hash) {
            console.log(hash);
            toastLoading('pending confirmation', toastId);
            try {
                await waitForTransaction(hash);
                toastSeccess(hash, toastId);
            } catch (error) {
                console.log(error);
                toastError(JSON.stringify(error), toastId);
            }
        } else {
            toastError('hash not found', toastId);
        }
    };

    const waitForTransaction = async (txhash) => {
        await aptosClient.waitForTransaction(txhash);
    };

    const value = useMemo(() => ({
        mint,
        wlMint,
        checkLogin,
        connect,
        connected,
        signAndSubmitTransaction,
        waitForTransaction,
        isLoading,
        account,
        disconnect,
        isPlayBackground,
        setIsPlayBackground,
        // eslint-disable-next-line react-hooks/exhaustive-deps, max-len
    }), [connect, connected, mint, signAndSubmitTransaction, isLoading, account, disconnect, isPlayBackground]);

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}
