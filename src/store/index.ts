import { combineReducers, configureStore } from "@reduxjs/toolkit";

import applicationsSlice from "./applications-slice";
import uiSlice from "./ui-slice";

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore["dispatch"];
export type AppStore = ReturnType<typeof setupStore>;

const rootReducer = combineReducers({
    ui: uiSlice.reducer,
    appList: applicationsSlice.reducer
});

const setupStore = (preloadedState?: Partial<RootState>) => {
    return configureStore({
        reducer: rootReducer,
        preloadedState
    });
};

export default setupStore;
