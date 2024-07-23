import applicationsSlice from "./applications-slice";
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: { ui: uiSlice.reducer, appList: applicationsSlice.reducer },
});

export default store;