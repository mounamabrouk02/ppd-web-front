import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/styles.scss";
import { NotificationsProvider } from "@mantine/notifications";
import {RecoilRoot} from "recoil"
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <NotificationsProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </NotificationsProvider>
  </React.StrictMode>
);
