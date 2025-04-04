const express = require("express");
const app = express();

const http = require("http"); 
const server = http.createServer(app);
const { Server } = require("socket.io");
//分割代入ってやつ。
// const Server = require("socket.io").Server;
//これと意味は同じ。

const io = new Server(server , {
    cors: {
        origin :["http://localhost:3000"],
    }
});
//Serverクラスに対してserverを渡して、ioというインスタンスを作った。
//このServerクラスの中身の部分(コンストラクタ)とかは、socket.ioの開発者しかわからんけど、
//とりあえずこのServerクラスの引数にserverを入れれば、ソケット通信ができるんや。

const PORT = 5000;

//onメソッドはもらう。emitは送る。
io.on("connection",(socket)=>{
    console.log("クライアントと接続しました！");

    //クライアントからの受信
    socket.on("send_message", (data)=>{
        console.log(data);
        //クライアントへ送信
        io.emit("received_message", data);
    })

    

    socket.on("disconnect",()=>{
        console.log("クライアントと接続が切れました！");
    })
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));