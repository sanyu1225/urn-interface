import { createContext, useContext, useState, useMemo } from 'react';
import { useWallet } from '@aptos-labs/wallet-adapter-react';
import { AptosClient, CoinClient, WaitForTransactionError, FailedTransactionError, ApiError } from 'aptos';
import useCusToast from '../hooks/useCusToast';

import CONTRACT_ADDR from '../constant';

export const TESTNET_NODE_URL = 'https://fullnode.testnet.aptoslabs.com/v1';

const aptosClient = new AptosClient(TESTNET_NODE_URL, {
    WITH_CREDENTIALS: false,
});

const coinClient = new CoinClient(aptosClient);

const Context = createContext();

export function useWalletContext() {
    return useContext(Context);
}

const interpretTransaction = (transaction) => {
    if (transaction.payload.function.includes('burn_and_fill')) {
        const event = transaction.events.find(
            (event) => event.type === '0x3::token::MutateTokenPropertyMapEvent'
            && event.data
            && event.guid.account_address === transaction.sender,
        );
        const hexString = event.data.values[0];
        const decimal = parseInt(hexString, 16);
        return `Your urn now contains ${decimal} ashes`;
    }
    const event = transaction.events.find(
        (event) => event.type === '0x3::token::DepositEvent'
        && event.guid
        && event.guid.account_address === transaction.sender,
    );
    return `You've got a ${event.data.id.token_data_id.name}`;
};

export function ContextProvider({ children }) {
    const { connect, connected, signAndSubmitTransaction, account, disconnect, wallet } = useWallet();
    const [isLoading, setLoading] = useState(false);
    const [isPlayBackground, setIsPlayBackground] = useState(true);
    const { toastSeccess, toastError, toastLoading } = useCusToast();

    const checkLogin = async () => {
        if (connected) {
            return true;
        }
        return false;
    };

    const getAptBalance = async () => {
        if (!connected) return null;
        if (!account) return null;
        if (!account.address) return null;
        const balance = await coinClient.checkBalance(account.address);
        return balance;
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
            const transaction = await waitForTransactionWithResult(hash);
            console.log(`💥 transaction: ${JSON.stringify(transaction, null, '  ')}`);
            if (transaction) {
                const desc = interpretTransaction(transaction);
                toastSeccess(desc);
                return transaction;
            }
            toastError(`transaction not found, hash ${hash}`);
            return null;
        } catch (error) {
            if (error instanceof WaitForTransactionError) {
                toastError(`${error.message} ${error.lastSubmittedTransaction.hash}`);
            } else if (error instanceof FailedTransactionError) {
                toastError(`${error.message} ${error.transaction.vm_status}`);
            } else if (error instanceof ApiError) {
                toastError(`${error.message} ${error.vmErrorCode}`);
            } else {
                toastError(error);
            }
            return null;
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

    const waitForTransactionWithResult = async (txhash) => {
        const transaction = await aptosClient.waitForTransactionWithResult(txhash, { checkSuccess: true });
        return transaction;
    };

    const getTransactionByHash = async (txhash) => {
        const transaction = await aptosClient.getTransactionByHash(txhash);
        return transaction;
    };

    const value = useMemo(() => ({
        mint,
        wlMint,
        checkLogin,
        connect,
        connected,
        wallet,
        getAptBalance,
        signAndSubmitTransaction,
        waitForTransaction,
        waitForTransactionWithResult,
        getTransactionByHash,
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
