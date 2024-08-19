import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: { modalIsVisible: false, chartsModalIsVisible: false },
    reducers: {
        toggleModal(state, action) {
            state.modalIsVisible = action.payload;
        },
        toggleChartsModal(state, action) {
            state.chartsModalIsVisible = action.payload;
        }
    }
});

export const selectToggleModal = (state) => state.toggleModal;
export const selectToggleChartsModal = (state) => state.toggleChartsModal;
export const uiActions = uiSlice.actions;

export default uiSlice;
