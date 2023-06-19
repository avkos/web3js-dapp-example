import React, {useState, useCallback, ChangeEvent} from 'react'
import {useSessionContext} from "../../context";
import {Input} from "../common/Input";
import {Button} from "../common/Button";
import {ERC20Token} from "../../web3/erc20";

export const TokenSend = ({token, onUpdateBalance}: { token: ERC20Token, onUpdateBalance: () => void }) => {
    const {wallet} = useSessionContext()
    const [toAddress, setToAddress] = useState('')
    const [amount, setAmount] = useState('')

    const onChangeToAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setToAddress(e.target.value)
    }, [setToAddress])

    const onChangeAmount = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setAmount(e.target.value)
    }, [setAmount])

    const sendToken = useCallback(async () => {
        await token.instance.methods.transfer(toAddress, token.toWei(amount)).send({
            from: wallet?.address,
        })
        onUpdateBalance()
    }, [token, wallet, amount, toAddress, onUpdateBalance])

    return (
        <div className='SendForm'>
            <Input label='Send to Address' value={toAddress} onChange={onChangeToAddress}/>
            <Input label='Amount' value={amount} onChange={onChangeAmount}/>
            <Button label='Send' onClick={sendToken}/>
        </div>
    )
}