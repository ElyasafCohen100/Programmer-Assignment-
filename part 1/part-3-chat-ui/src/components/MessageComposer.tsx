import { useState } from "react";
import { Box, TextField, Button } from "@mui/material";

export default function MessageComposer() {

    const [typingText, setTypingText] = useState("");


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
                >
                    SEND
                </Button>
            </Box>
        </Box>
    );
}