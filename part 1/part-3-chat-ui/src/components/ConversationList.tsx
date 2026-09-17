import { Avatar, Box } from "@mui/material";
import type { RootState } from "../store/store";
import { useSelector, useDispatch } from "react-redux";
import { selectConversationAction } from "../store/chatSlice";


export default function ConversationList() {

    const dispatch = useDispatch();

    const conversations = useSelector((state: RootState) => state.chat.conversations);
    const selectedConversationId = useSelector((state: RootState) => state.chat.selectedConversationId);

    return (
        <div>
            <h2>Conversations: </h2>

            {conversations.map((conversation) => (

                <Box
                    key={conversation.id}
                    onClick={() => dispatch(selectConversationAction(conversation.id))}

                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "12px",

                        backgroundColor:
                            selectedConversationId === conversation.id
                                ? "#dbeafe"
                                : "transparent",

                        padding: "8px",
                        borderRadius: "10px",
                        cursor: "pointer",
                    }}
                >
                    <Avatar
                        src={conversation.avatar}
                        alt={conversation.name}
                    />
                    <span>{conversation.name}</span>
                </Box>
            ))}
        </div>
    );
}