require('dotenv').config() // parse envs
const {Web3} = require('web3') // import web3
const fs = require('fs') // fs for saving file
const {abi, bytecodes} = require('./erc20') //bytecodes and abi artifacts

const init = async () => {
	const web3 = new Web3(process.env.REACT_APP_PROVIDER)
	// make account from private key
	const acc = web3.eth.accounts.privateKeyToAccount(process.env.REACT_APP_MAIN_PK)
	const myAcc = web3.eth.accounts.privateKeyToAccount(process.env.REACT_APP_PK)
	web3.eth.accounts.wallet.add(acc); // add account to a wallet

	const contractAddresses = []

	// generate ERC20 tokens
	for (const bytecode of bytecodes) {
		const c = new web3.eth.Contract(abi)
		const deployed = await c.deploy({
			data: bytecode,
			arguments: ['1000000000000000000000'],
		}).send({from: acc.address, gas: '2000000'})
		contractAddresses.push(deployed.options.address)
		// add some tokens to our account
		await deployed.methods.transfer(myAcc.address, String(web3.utils.toWei(Math.random() * 1000, 'ether'))).send({
			from: acc.address,
			gas: '2000000'
		})
	}
	// save results
	fs.writeFileSync('./src/web3/addresses.json', JSON.stringify(contractAddresses))
}

init().catch(console.error)