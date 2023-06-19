import Web3 from 'web3'
import {Web3Account} from "web3-eth-accounts/lib/types";

export const web3 = new Web3(process.env.REACT_APP_PROVIDER)
export const addAccount = (pk: string): Web3Account => {
    const acc = web3.eth.accounts.privateKeyToAccount(pk)
    web3.eth.accounts.wallet.add(acc)
    return acc
}