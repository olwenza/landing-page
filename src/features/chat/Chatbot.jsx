import { useDispatch, useSelector } from "react-redux";
import { addUserMessage, sendMessage } from "../chat/chatSlice";
import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const dispatch = useDispatch();
  const { messages, loading } = useSelector((state) => state.chat);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;

    // Add user message locally
    dispatch(addUserMessage(input));

    // Send conversation to backend
    dispatch(
      sendMessage({
        messages: [
          ...messages,
          { role: "user", content: input },
        ],
      })
    );

    setInput("");
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.header}>Bedrock RAG Chatbot</div>

      <div style={styles.messages}>
        {messages.map((m, i) => (
          <div
            key={i}
            style={m.role === "user" ? styles.userMessage : styles.botMessage}
          >
            {m.content}

            {m.citations && m.citations.length > 0 && (
              <ul style={styles.citations}>
                {m.citations.map((c, idx) => (
                  <li key={idx}>{c.text?.slice(0, 80)}...</li>
                ))}
              </ul>
            )}
          </div>
        ))}
        {loading && <div style={styles.botMessage}>Typing...</div>}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputRow}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask me anything..."
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          style={styles.button}
          disabled={loading}
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatContainer: {
    position: "fixed",
    bottom: 20,
    right: 20,
    width: 350,
    maxHeight: "70vh",
    display: "flex",
    flexDirection: "column",
    borderRadius: 12,
    boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
    backgroundColor: "#fff",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    backgroundColor: "#4A90E2",
    color: "#fff",
    padding: "10px 15px",
    fontWeight: "bold",
    fontSize: 16,
  },
  messages: {
    flex: 1,
    padding: 10,
    overflowY: "auto",
    backgroundColor: "#f9f9f9",
  },
  userMessage: {
    alignSelf: "flex-end",
    background: "#DCF8C6",
    padding: 8,
    margin: "4px 0",
    borderRadius: "12px 12px 0 12px",
    maxWidth: "80%",
    wordWrap: "break-word",
  },
  botMessage: {
    alignSelf: "flex-start",
    background: "#EEE",
    padding: 8,
    margin: "4px 0",
    borderRadius: "12px 12px 12px 0",
    maxWidth: "80%",
    wordWrap: "break-word",
  },
  citations: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
    paddingLeft: 16,
  },
  inputRow: {
    display: "flex",
    borderTop: "1px solid #ddd",
    padding: 8,
    backgroundColor: "#fff",
  },
  input: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    border: "1px solid #ccc",
    marginRight: 8,
    outline: "none",
  },
  button: {
    padding: "8px 12px",
    borderRadius: 8,
    border: "none",
    backgroundColor: "#4A90E2",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
