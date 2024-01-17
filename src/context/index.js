/* eslint-disable no-unused-vars */

/* eslint-disable function-paren-newline */

/* eslint-disable operator-linebreak */
import { ApiError, AptosClient, CoinClient, FailedTransactionError, WaitForTransactionError } from 'aptos';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useQuery } from 'urql';

import { isEmpty } from '@/plugin/lodash';
import { useWallet } from '@aptos-labs/wallet-adapter-react';

import CONTRACT_ADDR, { CREATOR_ADDRESS, normaBoneList, queryAltarData } from '../constant';
import useCusToast from '../hooks/useCusToast';

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
      (event) =>
        event.type === '0x3::token::MutateTokenPropertyMapEvent' &&
        event.data &&
        event.guid.account_address === transaction.sender
    );
    const hexString = event.data.values[0]?.substr(0, 4);
    const decimal = parseInt(hexString, 16);
    return `Your urn now contains ${decimal} ashes`;
  }
  if (transaction.payload.function.includes('random_rob') || transaction.payload.function.includes('rob')) {
    const event = transaction.events.find((event) => event.type.includes('::knife::BeenRobbedEvent'));
    const status = event.data.success;
    return `Your robbery ${status ? 'succeeded' : 'failed'}`;
  }

  const event = transaction.events.find(
    (event) =>
      event.type === '0x3::token::DepositEvent' && event.guid && event.guid.account_address === transaction.sender
  );
  const tokenName = +event.data.amount > 1 ? event.data.id.token_data_id.name : `${event.data.id.token_data_id.name}s`;
  return `You've got ${event.data.amount} ${tokenName}`;
};

export function ContextProvider({ children }) {
  const { connect, connected, signAndSubmitTransaction, account, disconnect, wallet } = useWallet();
  const [isLoading, setLoading] = useState(false);
  const [isPlayBackground, setIsPlayBackground] = useState(true);
  const { toastSeccess, toastError, toastLoading } = useCusToast();
  const address = account && account.address;
  const [data, reExecuteAltarQuery] = useQuery({
    query: queryAltarData,
    variables: {
      address,
      creator_address: CREATOR_ADDRESS,
    },
  });
  const boneList = data?.data?.current_token_ownerships?.filter((item) => normaBoneList.includes(item?.name)) || [];
  console.log('context boneList: ', boneList);
  // TODO: need check goledn_shovel name
  const shovelList =
    data?.data?.current_token_ownerships?.filter((item) => ['shovel', 'golden_shovel'].includes(item?.name)) || [];
  const goldenlList = data?.data?.current_token_ownerships?.filter((item) => item?.name.indexOf('golden') > -1);
  const urnList =
    data?.data?.current_token_ownerships?.filter((item) => ['urn', 'golden_urn'].includes(item?.name)) || [];
  // const zeroAshUrn = data.current_token_data.name === 'urn' && data.amount > 1
  const zeroAshUrn =
    data?.data &&
    data.data?.current_token_ownerships?.filter((e) => e.current_token_data.name === 'urn' && e.amount > 1);
  const hasAshUrn =
    data?.data &&
    data.data?.current_token_ownerships?.filter(
      (e) => e.current_token_data.name === 'urn' && !isEmpty(e.token_properties.ash)
    );
  const originalUrnList = [];
  if (zeroAshUrn?.length > 0) {
    for (let i = 0; i < zeroAshUrn[0].amount; i++) {
      originalUrnList.push(zeroAshUrn[0]);
    }
  }

  const checkLogin = async () => {
    if (connected) {
      return true;
    }
    return false;
  };
  if (data?.data) {
    boneList.unshift(...originalUrnList);
    if (!isEmpty(hasAshUrn)) {
      boneList.unshift(...hasAshUrn);
    }
  }

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
    }
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
      if (transaction) {
        const desc = interpretTransaction(transaction);
        toastSeccess({ title: desc, message: hash });
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
        toastError(String(error));
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
      toastLoading('pending confirmation', toastId);
      try {
        await waitForTransaction(hash);
        toastSeccess({ title: 'Success', message: hash }, toastId);
      } catch (error) {
        console.error(error);
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

  useEffect(() => {
    if (connected) {
      reExecuteAltarQuery();
    }
  }, [connected, reExecuteAltarQuery]);

  const value = useMemo(
    () => ({
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
      reExecuteAltarQuery,
      boneList,
      shovelList,
      goldenlList,
      urnList,
      fetching: data.fetching,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps, max-len
    [connect, connected, mint, signAndSubmitTransaction, isLoading, account, disconnect, isPlayBackground]
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
