import { useState } from "react";
import type { RootState } from "../store/store";
import { useDispatch, useSelector } from "react-redux";
import { Box, TextField, Button } from "@mui/material";
import { sendMessageAction, changeMessageStatusAction } from "../store/chatSlice";


export default function MessageComposer() {

    const dispatch = useDispatch();
    const [typingText, setTypingText] = useState("");

    // ==== for all the effect & calc of any chosen conversation ==== //
    const selectedConversationId = useSelector((state: RootState) =>
        state.chat.selectedConversationId);


    // ==== for the online status ("send" or "failed") ==== // 
    const selectedConversation = useSelector((state: RootState) =>
        state.chat.conversations.find((conv) => conv.id === selectedConversationId)
    );


    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                padding: "10px 14px",
                borderTop: "2px solid #a8b8d0",
                backgroundColor: "#e8edf4",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    backgroundColor: "#ffffff",
                    borderRadius: "22px",
                    padding: "2px 6px 2px 14px",
                }}
            >
                <TextField
                    placeholder="Type a message..."
                    value={typingText}
                    onChange={(event) => setTypingText(event.target.value)}
                    variant="standard"
                    fullWidth
                    slotProps={{
                        input: {
                            disableUnderline: true,
                        },
                    }}
                />

                <Button
                    sx={{
                        minWidth: "70px",
                        borderRadius: "18px",
                    }}
                    onClick={() => {
                        if (selectedConversationId && typingText.trim() !== "") {

                            const messageId = Date.now();

                            dispatch(sendMessageAction({
                                conversationId: selectedConversationId,
                                messageId: messageId,
                                message: typingText
                            }));
                            setTypingText("");


                            setTimeout(() => {

                                dispatch(changeMessageStatusAction({
                                    conversationId: selectedConversationId,
                                    messageId: messageId,
                                    status: selectedConversation?.online ? "sent" : "failed"
                                }));

                            }, 1500);
                        }
                    }}
                >
                    SEND
                </Button>
            </Box>
        </Box>
    );
}