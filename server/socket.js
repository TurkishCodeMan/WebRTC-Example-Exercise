const socket = require("socket.io");
const io = socket();

const socketApi = { io };


io.on("connection", (socket) => {
    console.log("Connected")


    // Kullanıcı Giriş Yaptığında
    socket.on("join-room", (userId) => {
        console.log(userId)
        //Diğer kullanıcılara bildiriyoruz user geldigini   
        socket.broadcast.emit("userConnected", userId)
        
    socket.on('disconnect', () => {
        socket.broadcast.emit('userDisconnected', userId)
      })

    })


})

module.exports = socketApi;