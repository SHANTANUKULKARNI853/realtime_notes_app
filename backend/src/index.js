require("dotenv").config();
const express = require("express");
const cors = require("cors");
const prisma = require("./services/prisma");
const authRoutes = require("./routes/auth.routes");
const notesRoutes = require("./routes/notes.routes");
const collabRoutes = require("./routes/collab.routes");
const publicRoutes = require("./routes/public.routes");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API Running...");
});

app.get("/test-db", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});
app.get("/logs", async (req,res)=>{
  const logs = await prisma.activityLog.findMany();
  res.json(logs);
});


app.use("/auth", authRoutes);
app.use("/notes", notesRoutes);
app.use("/collab", collabRoutes);
app.use("/public", publicRoutes);


const http = require("http");
const server = http.createServer(app);

const { Server } = require("socket.io");

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  socket.on("typing", (noteId) => {
  socket.to(noteId).emit("user-typing");
});


  // join note room
  socket.on("join-note", (noteId) => {
    socket.join(noteId);
    console.log(`Joined room ${noteId}`);
  });

  // live edits
  socket.on("note-update", ({ noteId, content }) => {
    socket.to(noteId).emit("receive-update", content);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});


const PORT = process.env.PORT || 5000;
server.listen(PORT, () =>
  console.log(`Server running on ${PORT}`)
);