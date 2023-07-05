import Web3, {eth} from 'web3'

export const web3 = new Web3(process.env.REACT_APP_PROVIDER)
export const addAccount = (pk: string): eth.accounts.Web3Account => {
    const acc = web3.eth.accounts.privateKeyToAccount(pk)
    web3.eth.accounts.wallet.add(acc)
    return acc
}