import { useSelector } from "react-redux";
import type { RootState } from "../store/store";


export default function ChatHeader() {

    const selectedConversationId = useSelector((state: RootState) => state.chat.selectedConversationId);

    const selectedConversation = useSelector((state: RootState) =>
        state.chat.conversations.find((conv) => conv.id === selectedConversationId));

    return (
        <div>
            {selectedConversation ? (
                <>
                    <h2>{selectedConversation.name}</h2>

                    <span>
                        {selectedConversation.online ? "🟢 Online" : "⚫ Offline"}
                    </span>
                </>
            ) : (
                <h2>Select a conversation</h2>
            )}
        </div>
    );
}