import type { NitroApp } from "nitropack";
import { Server as Engine } from "engine.io";
import { Server } from "socket.io";
import { defineEventHandler } from "h3";
import { Message } from "~/server/models/message.model";
import { User } from "~/server/models/user.model";
import mongoose from "mongoose";

export default defineNitroPlugin(async (nitroApp: NitroApp) => {
  const engine = new Engine();
  const io = new Server();

  try {
    await mongoose.connect("mongodb://localhost:27017/chat");
  } catch (e) {
    console.error(e);
  }

  let clients = new Map();

  io.bind(engine);

  io.on("connection", function (socket) {
    console.log("connected");
    socket.on("logged_in", async function (data) {
      clients.set(data.username, socket.id);
      let user = await User.findOne({ username: data.username });
      if (!user) {
        user = new User({ username: data.username });
        await user.save();
      }
      const allUsers = await User.find().exec();
      io.emit("users_updated", allUsers);
    });
    socket.on("request_users", async (callback) => {
      const users = await User.find().exec();
      callback(users.filter((u) => u.username !== socket.data.username));
    });

    socket.on("new_user", async (username) => {
      io.emit("user_connected", { username });
    });

    socket.on("chat message", async function (data, callback) {
      try {
        const duplicate = await Message.findOne({
          text: data.text,
          sender: data.sender,
          receiver: data.receiver,
          createdAt: { $gt: new Date(Date.now() - 1000) },
        });

        if (duplicate) {
          callback({ status: "duplicate" });
          return;
        }

        const message = new Message({
          text: data.text,
          receiver: data.receiver,
          sender: data.sender,
          createdAt: new Date(),
        });
        await message.save();

        if (clients.has(data.receiver)) {
          io.to(clients.get(data.receiver)).emit("chat message", {
            ...data,
            id: message._id,
            createdAt: message.createdAt,
          });
        }

        callback({
          status: "delivered",
          id: message._id,
        });
      } catch (error) {
        callback({ status: "error", error: error.message });
      }
    });
  });

  nitroApp.router.use(
    "/socket.io/",
    defineEventHandler({
      handler(event) {
        engine.handleRequest(event.node.req, event.node.res);
        event._handled = true;
      },
      websocket: {
        open(peer) {
          // @ts-expect-error private method and property
          engine.prepare(peer._internal.nodeReq);
          // @ts-expect-error private method and property
          engine.onWebSocket(peer._internal.nodeReq, peer._internal.nodeReq.socket, peer.websocket);
        },
      },
    })
  );
});
