const io = require('socket.io')(8800, {
    cors :{
        origin: 'http://localhost:3000'
    }
})


let activeUsers = []
io.on("connection" , (socket)=> {
    // add new user
    socket.on('new-user-add', (newUserId)=> {
        if(!activeUsers.some((user)=> user.userId === newUserId))
        {
            activeUsers.push({
                userId : newUserId,
                socketId: socket.id
            })
        }
        console.log("User connected" , activeUsers)
        io.emit('get-users' , activeUsers)
    } )

    socket.on("disconnect" , ()=>{
        activeUsers = activeUsers.filter((user)=> user.socketId !== socket.id);
        console.log("User disconnected" , activeUsers)
        io.emit('get-users' , activeUsers)
    } )
} )