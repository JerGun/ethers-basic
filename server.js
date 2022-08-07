const express = require("express")
const ethers = require("ethers")
const balanceController = require("./controllers/balance.controller")
const historyController = require("./controllers/history.controller")

const app = express()

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Methods", "DELETE, PUT")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  )
  if ("OPTIONS" == req.method) {
    res.sendStatus(200)
  } else {
    next()
  }
})

app.get("/", (req, res) => {
  res.send("### Ethers Server Started! ###")
})

app.get("/balance", balanceController.getBalance)
app.get("/history", historyController.getHistory)

const PORT = process.env.PORT || 9000
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })
}

module.exports = app
