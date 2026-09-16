import { useSelector } from "react-redux";
import { Avatar, Box } from "@mui/material";
import type { RootState } from "../store/store";


export default function MessageList() {

    // ======== select a conversation from the store ======== //
    const selectedConversation = useSelector((state: RootState) =>
        state.chat.conversations.find((conv) => conv.id === state.chat.selectedConversationId));


    if (!selectedConversation) {
        return null;
    }


    if (selectedConversation.messages.length === 0) {
        return (
            <Box
                sx={{
                    height: "60%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <h2>No messages yet. Start the conversation!</h2>
            </Box>
        );
    }

    return (
        <div>
            {selectedConversation.messages.map((message) => (
                <Box
                    key={message.id}
                    sx={{
                        display: "flex",
                        justifyContent:
                            message.sender === "me" ? "flex-end" : "flex-start",
                        gap: "8px",
                        marginBottom: "12px"
                    }}>

                    {message.sender === "them" && (
                        <Avatar
                            src={selectedConversation.avatar}
                            alt={selectedConversation.name}
                        />
                    )}

                    <Box sx={{
                        padding: "10px 14px",
                        borderRadius: "14px",
                        backgroundColor:
                            message.sender === "me" ? "#dbeafe" : "#eeeeee",
                        maxWidth: "65%",
                    }}>
                        {message.text}
                    </Box>
                </Box>
            ))}

        </div>
    );
}