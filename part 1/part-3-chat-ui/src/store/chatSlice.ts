import { createSlice } from "@reduxjs/toolkit";
import type { Conversation } from "../types/chatType";

import narutoAvatar from "../assets/avatars/naruto.jpg";
import sakuraAvatar from "../assets/avatars/sakura.jpg";
import sasukeAvatar from "../assets/avatars/sasuke.jpg";
import kakashiAvatar from "../assets/avatars/kakashi.jpg";


// ======= the State's ======= //
type ChatState = {
  conversations: Conversation[];
  selectedConversationId: number | null;
};

// ======== the Slice ======== //
const chatSlice = createSlice({

  name: "chat",

  initialState: {
    conversations: [
      {
        id: 1,
        name: "Naruto",
        online: true,
        avatar: narutoAvatar,
        messages: [
          { id: 1, text: "Believe it da-tebayu!", sender: "them", status: "sent" },
          { id: 2, text: "Hey Naruto!", sender: "me", status: "sent" },
        ],
      },
      {
        id: 2,
        name: "Sakura",
        online: true,
        avatar: sakuraAvatar,
        messages: [
          { id: 1, text: "Hi!", sender: "them", status: "sent" },
        ],
      },
      {
        id: 3,
        name: "Sasuke",
        online: false,
        avatar: sasukeAvatar,
        messages: [],
      },
      {
        id: 4,
        name: "Kakashi",
        online: true,
        avatar: kakashiAvatar,
        messages: [
          { id: 1, text: "You're late.", sender: "them", status: "sent" },
          { id: 2, text: "You're the one who's always late!", sender: "me", status: "sent" },
        ],
      },
    ],

    selectedConversationId: null,

  } as ChatState,


  reducers: {

    // =========== Action I =========== //
    selectConversationAction: (state, action) => {
      state.selectedConversationId = action.payload;
    },


    // =========== Action II =========== //
    sendMessageAction: (state, action) => {

      const { conversationId, messageId, message } = action.payload;

      const conversation = state.conversations.find(
        (conv) => conv.id === conversationId
      );

      if (conversation) {
        conversation.messages.push({
          id: messageId,
          text: message,
          sender: "me",
          status: "sending"
        });
      }
    },


    // =========== Action III =========== //
    changeMessageStatusAction: (state, action) => {

      const { conversationId, messageId, status } = action.payload;

      const conversation = state.conversations.find((conv) => conv.id === conversationId);
      if (conversation) {

        const message = conversation.messages.find((msg) => msg.id === messageId);
        if (message) {
          message.status = status;
        }
      }
    }
  },
});

export const { selectConversationAction, sendMessageAction, changeMessageStatusAction } = chatSlice.actions;
export default chatSlice.reducer;