import "./index.css";
import "./i18n";

import App from "./App";
import { Provider } from "react-redux";
import React from "react";
import ReactDOM from "react-dom/client";
import setupStore from "./store/index";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={setupStore()}>
            <App />
        </Provider>
    </React.StrictMode>
);
