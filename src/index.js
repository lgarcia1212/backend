/* import http from 'http'

const app = http.createServer((req, res) => {
    res.end
})

app.listen(8000, () => {
    console.log("Server on port 8000")
}) */

import express from 'express'

const app = express()
const PORT = 8000

app.get('/', (req, res) => {
    res.send("Servidor Express")
})

app.get('/despedida', (req, res) => {
    res.send("Gracias por utilizar el servidor")
})

app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})