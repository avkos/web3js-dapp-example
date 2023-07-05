import React, {useState, useCallback, ChangeEvent} from 'react'
import {Input} from './common/Input'
import {Button} from './common/Button'
import {useSessionContext} from "../context";
import {addAccount} from "../web3/web3";

export const InitWallet = () => {
    const {setWallet} = useSessionContext()
    const [pk, setPk] = useState('')

    const onChangePk = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setPk(e.target.value)
    }, [setPk])

    const createNewWallet = useCallback(() => {
        setWallet(addAccount(pk))
    }, [pk, setWallet])

    return (
        <div className='Card'>
            <div className='CardHead'>
                <h2>Init Wallet</h2>
                <h3>Set your private key to open your wallet</h3>
            </div>
            <div className='CardBody'>
                <div>
                    <div className='Block'>
                        <Input label='Set Private Key:' value={pk} onChange={onChangePk}/>
                    </div>
                    <div className='Block'>
                        <Button label='Sign In' onClick={createNewWallet}/>
                    </div>
                </div>
            </div>
        </div>
    )
}