const express = require('express');
const app = express();
const server = require('http').Server(app);
const {v4: uuidv4} = require('uuid');
const io = require('socket.io')(server);
const { ExpressPeerServer } = require('peer');
const peerServer = ExpressPeerServer(server, {
    debug:true
}) 


app.use(express.static('public'))

app.set('view engine' , 'ejs')    // Set our view engine as ejs 

app.use('/peerjs',peerServer);

app.get('/',(req,res)=>{
    // res.sendStatus(200) // render room.ejs file from views
    res.redirect(`/${uuidv4()}`);
}) 

app.get('/:room', (req,res) =>{
    res.render('room',{ roomId: req.params.room}) 
})

io.on('connection' , socket => {
    socket.on('join-room', (roomId , userId) => {
        console.log(`Joined `);
        socket.join(roomId);
        socket.to(roomId).broadcast.emit('user-connected',userId);
        
        socket.on('message',(InputValue)=>{
            io.to(roomId).emit('createMessage',InputValue)
        })
    })
})

const port = process.env.PORT || 3030
server.listen(port,()=>{
    console.log(`started at ${port}`)
});