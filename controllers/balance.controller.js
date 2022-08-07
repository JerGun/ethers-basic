const ethers = require("ethers")
const abi = require("../abi.json")

exports.getBalance = async (req, res) => {
  const { address } = req.query
  console.log(address)
  bscProvider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/",
    { name: "binance", chainId: 56 }
  )
  const tempAddress = [
    "0xa6110f35970c28d4ca96bf93f6712e1a5ab83bd0",
    "0xa71707e411f73a0ad025023a13ac48e79a3c954b",
    "0xa724F587219efDBD60f5193F4e8ab99A581B7B16",
    "0x08bdC7037346936bF366D22804949816A9081f62",
    "0xA7b6b6D0D5Ab0F1e8A30fBa7DA896153bC4468b1",
  ]
  const xwelContractAddress = "0xA6110F35970C28d4ca96bf93F6712E1A5Ab83bd0"

  const contract = new ethers.Contract(xwelContractAddress, abi, bscProvider)
  const payload = {
    balance: "",
    xwel: "",
  }

  await bscProvider.getBalance(address).then(async (balance) => {
    console.log(balance)
    payload.balance = ethers.utils.formatEther(balance)
  })
  console.log(contract.balanceOf(address))

  await contract.balanceOf(address).then((token) => {
    console.log(ethers.utils.formatEther(token))
    payload.xwel = ethers.utils.formatEther(token)
  })

  res.send(payload)
}
