const express = require("express");
const app = express();

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");

// 🌟 環境変数から FRONTEND_URL を取得
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

// Socket.IO に CORS 設定を追加
const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  },
});

// ✅ これは socket.io の CORS 設定とは別に Express 側にも CORS ヘッダーをつける例
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL);
  res.setHeader("Access-Control-Allow-Methods", "GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const PORT = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("クライアントと接続しました！");

  socket.on("send_message", (data) => {
    console.log(data);
    io.emit("received_message", data);
  });

  socket.on("disconnect", () => {
    console.log("クライアントと接続が切れました！");
  });
});

server.listen(PORT, () => console.log(`server is running on ${PORT}`));

