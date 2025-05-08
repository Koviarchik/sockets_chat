import { Message } from "~/server/models/message.model";

export default defineEventHandler(async (event) => {
  const currentUser = getRouterParam(event, "name");
  const receiver = getQuery(event).receiver;

  return await Message.find({
    $or: [
      { sender: currentUser, receiver: receiver },
      { sender: receiver, receiver: currentUser },
    ],
  })
    .sort({ createdAt: 1 })
    .exec();
});
