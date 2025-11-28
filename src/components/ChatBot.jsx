import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, sendMessage } from "../features/chat/chatSlice"
import { useState } from "react";

export default function ChatBot() {
    const dispatch = useDispatch();
    const { messages, loading } = useSelector((state) => state.chat);
    const [input, setInput] = useState("");

    const handleSend = async () => {
        if (!input.trim()) return;

        dispatch(addUserMessage(input));
        dispatch(sendMessage({
            messages: [...messages, { role: "user", content: input }]
        }));
        setInput("");
    };

    return (
        <div style={styles.container}>
            <div style={styles.messages}>
                {messages.map((m, i) => (
                    <div key={i} style={m.role === "user" ? styles.user : styles.bot}>
                        {m.content}
                    </div>
                ))}
                {loading && <div style={styles.bot}>Typing...</div>}
            </div>

            <div style={styles.inputRow}>
                <input
                    style={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask me anything..."
                />
                <button onClick={handleSend} style={styles.button}>Send</button>
            </div>
        </div>
    );
}

const styles = {
    container: { width: 400, border: "1px solid #ccc", padding: 20 },
    messages: { height: 300, overflowY: "scroll", marginBottom: 10 },
    user: { background: "#DCF8C6", padding: 8, margin: 4, borderRadius: 5 },
    bot: { background: "#EEE", padding: 8, margin: 4, borderRadius: 5 },
    inputRow: { display: "flex" },
    input: { flex: 1, padding: 8 },
    button: { marginLeft: 8, padding: "8px 12px" },
};
