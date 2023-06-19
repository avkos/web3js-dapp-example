import React, {useState, useCallback, ChangeEvent} from 'react'
import {Input} from '../common/Input'
import {Button} from '../common/Button'
import {useSessionContext} from "../../context";
import {ERC20Token} from "../../web3/erc20";

export const AddToken = () => {
    const {setTokenList, tokenList = []} = useSessionContext()
    const [newAddress, setNewAddress] = useState<string>('')

    const onChangeNewAddress = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewAddress(e.target.value)
    }, [setNewAddress])

    const addTokenContract = useCallback(async () => {
        const contract = await ERC20Token.factory(newAddress)
        setTokenList([...tokenList, contract])
    }, [setTokenList, newAddress, tokenList])

    return (
        <div className='Card'>
            <div className='CardHead'>
                <h2>Add new ERC20 Token</h2>
            </div>
            <div className='CardBody'>
                <div>
                    <div className='Block'>
                        <Input label='ERC20 token address:' value={newAddress} onChange={onChangeNewAddress}/>
                    </div>
                    <div className='Block'>
                        <Button label='Add new token' onClick={addTokenContract}/>
                    </div>
                </div>
            </div>
        </div>
    )
}