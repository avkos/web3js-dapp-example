import {createContext, Dispatch, SetStateAction, useContext, useState} from 'react';
import {ERC20Token} from "../web3/erc20";


type SessionType = {
    wallet?: {address:string}
    setWallet: Dispatch<SetStateAction<{address:string} | undefined>>
    tokenList?: ERC20Token[]
    setTokenList: Dispatch<SetStateAction<ERC20Token[]>>
}

const SessionContext = createContext<SessionType>({
    setWallet: ((wallet: {address:string}) => {
    }) as Dispatch<SetStateAction<{address:string} | undefined>>,
    setTokenList: ((list: ERC20Token[]) => {
    }) as Dispatch<SetStateAction<ERC20Token[]>>,
});
export const useSessionContext = () => useContext(SessionContext);
export const SessionProvider = ({children}: { children: any }) => {
    const [wallet, setWallet] = useState<{address:string}>();
    const [tokenList, setTokenList] = useState<ERC20Token[]>([]);

    return <SessionContext.Provider value={{
        wallet,
        setWallet,
        tokenList,
        setTokenList,
    }}>{children}</SessionContext.Provider>;
};
