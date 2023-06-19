import React from 'react';
import './App.css';
import logo from './logo.png'
import {SessionProvider} from './context'
import {WalletApp} from './components/WalletApp'

function App() {
    return (
        <div>
            <SessionProvider>
                <div className='Header'>
                    <img src={logo} alt='logo'/>
                </div>
                <div className='Body'>
                    <div className='Card'><h1>Example Web3js Crypto Wallet</h1></div>
                    <WalletApp/>
                </div>
            </SessionProvider>
        </div>
    );
}

export default App;

