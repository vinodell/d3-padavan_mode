import express from 'express'
import http from 'http'
import cookieParser from 'cookie-parser'
import io from 'socket.io'
import regeneratorRuntime from 'regenerator-runtime'
import csv2json from 'csv2json'
import fs from 'fs'

import config from './config'
import mongooseService from './services/mongoose'

import Html from '../client/html'

const { resolve } = require('path')

const server = express()
const httpServer = http.createServer(server)

const PORT = config.port

const middleware = [
  cookieParser(),
  express.json({ limit: '50kb' }),
  express.static(resolve(__dirname, '../dist'))
]

middleware.forEach((it) => server.use(it))

server.get('/', (req, res) => {
  res.send('Express Server')
})

server.get('/api/v1/graph', async (req, res) => {
  await fs
    .createReadStream(`${__dirname}/data/mydata.csv`)
    .pipe(
      csv2json({
        year: Number,
        level_1: String,
        level_2: String,
        value: Number,
      })
    )
    .pipe(fs.createWriteStream('data.json'))
  res.json({ result: 'ok' })
})

if (config.mongoStatus) {
  console.log('MongoDB Enabled: ', config.mongoStatus)
  mongooseService.connect()
}

if (config.socketStatus) {
  console.log('Sockets Enabled: ', config.socketStatus)
  const socketIO = io(httpServer, {
    path: '/ws'
  })

  socketIO.on('connection', (socket) => {
    console.log(`${socket.id} login`)

    socket.on('disconnect', () => {
      console.log(`${socket.id} logout`)
    })
  })
}

server.get('/*', (req, res) => {
  const initialState = {
    location: req.url
  }

  return res.send(
    Html({
      body: '',
      initialState
    })
  )
})

server.use('/api/', (req, res) => {
  res.status(404)
  res.end()
})

httpServer.listen(PORT)

console.log(`Serving at http://localhost:${PORT}`)
