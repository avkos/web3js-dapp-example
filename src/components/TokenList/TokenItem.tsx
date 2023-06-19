import React, {useState, useEffect, useCallback} from 'react'
import {useSessionContext} from "../../context";
import {ERC20Token} from "../../web3/erc20";
import {TokenSend} from "./TokenSend";
import {Button} from "../common/Button";

export const TokenItem = ({token}: { token: ERC20Token }) => {
    const {wallet, tokenList = [], setTokenList} = useSessionContext()
    const [isShowSendForm, setIsShowSendForm] = useState(false)
    const address = token?.address ?? ''

    const updateBalance = useCallback(() => {
        token.updateBalance(wallet?.address as string).then(() => {
            setTokenList([...tokenList])
        })
    }, [setTokenList, tokenList, token, wallet?.address])

    useEffect(() => {
        updateBalance()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onShowSendForm = useCallback(() => {
        setIsShowSendForm(!isShowSendForm)
    }, [isShowSendForm])

    return (
        <>
            <div className='TokenItem'>
                <div>
                    <div className='TokenSymbol'>{token.symbol}</div>
                    <div className='TokenAddress'>{address}</div>
                </div>

                <div className='TokenBalance'>{token.balance}</div>
                <div><Button label={isShowSendForm ? 'Cancel' : 'Send'} onClick={onShowSendForm}/></div>
            </div>
            {isShowSendForm && (
                <TokenSend token={token} onUpdateBalance={updateBalance}/>
            )}
        </>
    )
}