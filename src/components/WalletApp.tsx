import React, {useEffect} from 'react'
import {InitWallet} from './InitWallet'
import {TokenList} from './TokenList'
import {useSessionContext} from '../context';
import {ERC20Token} from '../web3/erc20';
import TOKENS from "../web3/addresses.json";
// import {addAccount} from "../web3/web3";

// const MY_WALLET = String(process.env.REACT_APP_PK)
export const WalletApp = () => {
    const {wallet, setWallet, setTokenList} = useSessionContext()

    useEffect(() => {
        if (!wallet?.address) {
            const init = async () => {
                const list = []
                for (const t of TOKENS.slice(0, TOKENS.length - 1)) {
                    const token = new ERC20Token(t)
                    await token.init()
                    list.push(token)
                }
                setTokenList([...list])
                // setWallet(addAccount(MY_WALLET))
            }
            init().catch(console.error)
        }
    }, [setTokenList, setWallet, wallet?.address])
    if (wallet?.address) {
        return (
            <TokenList/>
        )
    } else {
        return <InitWallet/>
    }
}