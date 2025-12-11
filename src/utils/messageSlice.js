import { createSlice } from "@reduxjs/toolkit";

const messageSlice = createSlice({
    name: "message",
    initialState: {
        message: null,
        type: null, // 'success', 'error', 'info'
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload.message;
            state.type = action.payload.type;
        },
        clearMessage: (state) => {
            state.message = null;
            state.type = null;
        },
    },
});

export const { setMessage, clearMessage } = messageSlice.actions;
export default messageSlice.reducer;