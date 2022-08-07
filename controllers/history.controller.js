require("dotenv").config()
const { default: axios } = require("axios")
const ethers = require("ethers")
const abi = require("../abi.json")

exports.getHistory = async (req, res) => {
  const { address, page = 1, offset = 10, sort = desc } = req.query
  bscProvider = new ethers.providers.JsonRpcProvider(
    "https://bsc-dataseed.binance.org/",
    { name: "binance", chainId: 56 }
  )

  let history = await bscProvider.listAccounts()

  try {
    await axios
      .get(
        `https://api.bscscan.com/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=${offset}&sort=${sort}&apikey=${process.env.BSCSCAN_API}`
      )
      .then((response) => {
        console.log(response)
        res.send(response.data)
      })
  } catch (error) {
    console.log(error)
  }
}
