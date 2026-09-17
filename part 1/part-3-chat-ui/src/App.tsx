import { Box, Typography } from "@mui/material";
import ChatHeader from "./components/ChatHeader";
import MessageList from "./components/MessageList";
import MessageComposer from "./components/MessageComposer";
import ConversationList from "./components/ConversationList";

export default function App() {

  return (
    <Box
      sx={{
        width: "900px",
        height: "600px",
        margin: "40px auto",
        border: "15px solid #a2b2cc",
        borderRadius: "12px",
        overflow: "hidden",
      }}
    >

      {/* ============= Main Header ============= */}
      <Box
        sx={{
          padding: "16px",
          borderBottom: "7px solid #a2b2cc",
          backgroundColor: "#CBD5E1"
        }}
      >
        <Typography variant="h4">
          🍥 Hidden Leaf - Chat 🍥
        </Typography>
      </Box>


      {/* ============= Main Content ============= */}
      <Box sx={{
        display: "flex",
        height: "calc(100% - 70px)"
      }}>


        {/* ========= Left Side ========= */}
        <Box
          sx={{
            width: "30%",
            padding: "16px",
            borderRight: "10px solid #a2b2cc",
            backgroundColor: "#F1F5F9"
          }}
        >
          <ConversationList />
        </Box>


        {/* ========= Right Side ========= */}
        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#f4f7fa",
          }}
        >
          <ChatHeader />

          <Box sx={{ flex: 1, padding: "10px", overflowY: "auto", minHeight: 0, }}>
            <MessageList />
          </Box>

          <Box sx={{ marginBottom: "15px" }}>
            <MessageComposer />
          </Box>

        </Box>
      </Box>
    </Box>
  );
}
