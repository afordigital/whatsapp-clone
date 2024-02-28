import express from 'express'
import http from 'http'
import {Server} from 'socket.io'

const app = express()
const server = http.createServer(app)

app.set('PORT', 5000)

const io = new Server(server, {
    cors: {origin: '*'}
})

io.on('connection', socket => {

    // server que está en escucha
    socket.on('inicio-sesion', (user: any)=> {
        // socket.who = user
        socket.join(user)
    })

    socket.on('mensaje-server', (data)=> {
        // const {user, text} = data
        console.log(data)
        // io.to(user).emit('mensaje-client', {who: socket.who, text, date: Date.now()})
    })
})

server.listen(app.get('PORT'), async ()=>{
    console.log('Server listening')
})