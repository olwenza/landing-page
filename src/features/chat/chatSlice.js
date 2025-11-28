import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Thunk to send messages to backend
export const sendMessage = createAsyncThunk(
  "chat/sendMessage",
  async ({ messages }) => {
    const res = await axios.post(
      "https://i4whhkkx2a.execute-api.us-east-1.amazonaws.com/DEV/",
      { messages }
    );

    // Return full backend response
    return res.data; // { response: "...", citations: [...] }
  }
);

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],  // array of { role, content, citations? }
    loading: false,
  },
  reducers: {
    // Add user message to state
    addUserMessage: (state, action) => {
      state.messages.push({ role: "user", content: action.payload });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;

        // Push assistant message using correct fields
        state.messages.push({
          role: "assistant",
          content: action.payload.response,
          citations: action.payload.citations || [],
        });
      })
      .addCase(sendMessage.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
