import Message from "../models/Message.js";

const messageService = {
  async createMessage({ message, sender, users }) {
    const mess = await Message.create({ message, sender, users });
    return await mess.save();
  },
};

export default messageService;
