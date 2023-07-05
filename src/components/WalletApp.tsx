import React, {useEffect} from 'react'
import {TokenList} from './TokenList'
import {useSessionContext} from '../context';
import {ERC20Token} from '../web3/erc20';
import TOKENS from "../web3/addresses.json";
import {injectedProvider, isInjectedProvider} from "../web3/web3";

export const WalletApp = () => {
    const {wallet, setWallet, setTokenList} = useSessionContext()

    useEffect(() => {
        if (isInjectedProvider) {
            const init = async () => {
                const accounts = await injectedProvider.request({method: 'eth_requestAccounts', params: []})
                setWallet({address: String(accounts[0])})
                const list = []
                for (const t of TOKENS.slice(0, TOKENS.length - 1)) {
                    const token = new ERC20Token(t)
                    await token.init()
                    list.push(token)
                }
                setTokenList([...list])
            }
            init().catch(console.error)
        }
    }, [setTokenList, setWallet, wallet?.address])

    if (wallet?.address) {
        return (
            <TokenList/>
        )
    } else {
        return <div>
            Need to setup injected provider
        </div>
    }
}