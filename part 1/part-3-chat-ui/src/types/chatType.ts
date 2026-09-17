
export type Message = {
    id: number;
    text: string;
    sender: "me" | "them";
    status: "sending" | "sent" | "failed"; 
};


export type Conversation = {
    id: number;
    name: string;
    online: boolean;
    avatar: string;
    messages: Message[];
};