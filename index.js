const express = require('express')
const cors = require('cors')
const bodyParser = require("body-parser")
const fs = require('fs')
const moment = require('moment')

const app = express()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cors())

const PORT = 4000

writeLog('Start API.....')

app.listen(PORT, () => {
    console.log(`API Listening on PORT ${PORT}`)
})

app.get('/', (req, res) => {
    res.send('This is my API running...')
})

app.get('/about', (req, res) => {
    res.send('This is my about route')
})

app.post('/jobs', async (req, res) => {
    console.log("POST jobs =>", req.body)
    writeLog(`POST: ${JSON.stringify(req.body)}`)
    return res.json({"result": 'Success'})
})

function writeLog(dat) {
    const now = moment(new Date()).format("YYYY/MM/DD h:mm:ss a")
    const path = moment(new Date()).format("YYYY_MM_DD")
    dat = `\r\n${now} => ${dat}`
    // console.log(dat)
    fs.appendFile(`./LOG/${path}.txt`, dat, function (err) {    // ADA
      if (err) {
        console.log('Write log issue')
      } 
    })
}

module.exports = app