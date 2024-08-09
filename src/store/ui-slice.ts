import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { modalIsVisible: false },
    reducers: {
        toggleModal(state, action) {
            console.log("modalopen", action);
            state.modalIsVisible = action.payload;
        }
    }
});

export const selectToggleModal = (state) => state.toggleModal;
export const uiActions = uiSlice.actions;

export default uiSlice;
