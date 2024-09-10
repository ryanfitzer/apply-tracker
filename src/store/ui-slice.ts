import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
    name: "ui",
    initialState: {
        modalIsVisible: false,
        chartsModalIsVisible: false,
        showMenu: false
    },
    reducers: {
        toggleModal(state, action) {
            state.modalIsVisible = action.payload;
        },
        toggleChartsModal(state, action) {
            state.chartsModalIsVisible = action.payload;
        },
        toggleMenu(state) {
            return {
                ...state,
                showMenu: !state.showMenu
            };
        }
    }
});

export const selectToggleModal = (state) => state.toggleModal;
export const selectToggleChartsModal = (state) => state.toggleChartsModal;
export const selectShowMenu = (state) => state.showMenu;
export const uiActions = uiSlice.actions;

export default uiSlice;
