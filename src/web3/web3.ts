import Web3 from 'web3'

export const injectedProvider = window?.ethereum
export const isInjectedProvider = typeof injectedProvider !== 'undefined'

if (!isInjectedProvider) {
    console.error('Need to setup injected provider')
}
export const web3 = new Web3(window.ethereum)
