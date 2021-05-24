require('dotenv').config()
const express = require('express')
const axios = require('axios')
const bodyParser = require('body-parser')

const app = express()
app.use(bodyParser.json())

const TOKEN = process.env.TOKEN
const API_URL = `https://api.telegram.org/bot${TOKEN}`
const WEBHOOK = process.env.WEBHOOK + TOKEN

const setup = async () => {
    const res = await axios.get(`${API_URL}/setWebhook?url=${WEBHOOK}`)
    console.log(res.data)
}

app.post(`/webhook/${TOKEN}`, async (req, res) => {
    console.log(req.body)
    const message = req.body.message
    if (!message) return res.send()

    const data = {
        chat_id: message.chat.id,
        text: message.text
    }

    await axios.post(`${API_URL}/sendMessage`, data)
    return res.send()
})

app.listen(5000, async () => {
    console.log('App running on port 5000')
    await setup()
})