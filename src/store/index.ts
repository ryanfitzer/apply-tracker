import applicationsSlice from "./applications-slice";
import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./ui-slice";

const store = configureStore({
    reducer: { ui: uiSlice.reducer, appList: applicationsSlice.reducer }
});

/* "If you're trying to dispatch a function, you need to use a useAppDispatch
 * hook" - user18867426
 * https://stackoverflow.com/questions/73451395/typescript-error-ts2345-argument-of-type-dispatch-dispatch-promisevoid
 */
export type AppDispatch = typeof store.dispatch;

export default store;
