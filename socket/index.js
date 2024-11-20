import {Server} from 'socket.io';
const io = new Server(9000,{
    cors:{
        origin:'http://localhost:3000'
    }
});

let users = [];

const addUser = (userData,socketId)=>{
    !users.some(user => user.sub===userData.sub) && users.push({...userData,socketId});

}

const getUser = (userId) =>{
    return users.find(user => user.sub === userId);
}

io.on('connection',(socket)=>{
    console.log("user Connected!!!");
    console.log("Before login",users);
    // print();

    socket.on('addUsers',userData=>{
        addUser(userData,socket.id);
        console.log("Logged in ",users);

        io.emit('getUsers',users);
    });
    socket.on('sendMessage',data=>{
        const user = getUser(data.receiverId);
        io.to(user?.socketId).emit('getMessage',data);
    });

    socket.on('senderTyping',data=>{
        console.log("SEnder isTyping");
        const user = getUser(data.receiverId);
        io.to(user?.socketId).emit("OnTyping",data);
    })


    socket.on('disconnect',data=>{
        console.log("Disconneted");
        // print();
        // users={};
        console.log(socket.id);
        users = users.filter(item => item.socketId !== socket.id);

        console.log("After",users);
        io.emit('getUsers',users);
    })
});




