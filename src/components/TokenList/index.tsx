import React from 'react'
import {useSessionContext} from "../../context";
import {AddToken} from "./AddToken";
import {TokenItem} from "./TokenItem";

export const TokenList = () => {
    const {tokenList = []} = useSessionContext()

    return (
        <>
            <AddToken/>
            <div className='Card'>
                <div className='CardHead'>
                    <h2>My ERC20 Tokens</h2>
                </div>
                {tokenList.map((token) => <TokenItem token={token} key={token.symbol}/>)}
            </div>
        </>

    )
}