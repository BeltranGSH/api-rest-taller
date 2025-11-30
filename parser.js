const express = require("express")

const jsonParser = express.json()

const urlencoded = express.urlencoded({ extended: true })

module.exports = {
  jsonParser,
  urlencoded,
}
