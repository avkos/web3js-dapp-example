import {web3} from '../web3';
import {abi} from "./artifact";
import {Contract} from "web3-eth-contract";

export class ERC20Token {
    public instance: Contract<typeof abi>
    public symbol: string
    private _balance: string

    constructor(address: string) {
        this._balance = '0'
        this.symbol = ''
        this.instance = new web3.eth.Contract(abi, address)
    }

    static async factory(address: string) {
        const erc20 = new ERC20Token(address)
        await erc20.init()
        return erc20
    }

    async init() {
        this.symbol = String(await this.methods.symbol().call())
    }

    get methods() {
        return this.instance.methods
    }

    get address() {
        return this.instance.options.address
    }

    fromWei(amount: string | number | bigint): string {
        return web3.utils.fromWei(amount, 'ether')
    }

    toWei(amount: string | number | bigint): string {
        return web3.utils.toWei(amount, 'ether')
    }

    async getBalance(address: string) {
        return this.fromWei(String(await (this.methods.balanceOf(address).call())))
    }

    async updateBalance(address: string) {
        this._balance = await this.getBalance(address)
    }

    get balance() {
        return Number(this._balance).toFixed(3)
    }
}
