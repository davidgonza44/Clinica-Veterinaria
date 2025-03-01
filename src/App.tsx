import {
  AuthBindings,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { RefineThemes } from "@refinedev/antd";
import { ConfigProvider } from "antd";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";
import WelcomePage from "./pages/welcome";
import dataProvider, { GraphQLClient } from "@refinedev/graphql";
import routerBindings, {
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router";
import { App as AntdApp } from "antd";
import axios from "axios";
import { BrowserRouter, Outlet, Route, Routes } from "react-router";
import { ColorModeContextProvider } from "./contexts/color-mode";
import { CredentialResponse } from "./interfaces/google";
import { parseJwt } from "./utils/parse-jwt";
import { ThemedLayoutV2 } from "@refinedev/antd";
import CustomHeader from "./components/layout/Header";

import "./styles/global.css";

const API_URL = "https://your-graphql-url/graphql";

const client = new GraphQLClient(API_URL);
const gqlDataProvider = dataProvider(client);
const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const customTheme = {
    ...RefineThemes.Blue,
    token : {
      ...RefineThemes.Blue.token,
      fontFamily : "var(--font-instrument)",
      fontSize : 16
    },
    components : {
      ...RefineThemes.Blue.components,
      Typography : {
        ...RefineThemes.Blue.components?.Typography,
        titleFontFamily : "var(--font-fredoka)"
      }
    },
    Button : {
      ...RefineThemes.Blue.components?.Button,
      fontFamily : "var(--font-instrument",
      fontWeight : 600
    }
}


function App() {


  return (
    <BrowserRouter>
      <ConfigProvider theme={customTheme}>

      <Refine
        dataProvider={gqlDataProvider}
        notificationProvider={useNotificationProvider}
        routerProvider={routerBindings}
        options={{
          syncWithLocation: true,
          warnWhenUnsavedChanges: true,
          useNewQueryKeys: true,
          projectId: "3LAt8R-xrB12o-STDWQG",
        }}
      >
        <Routes>
          <Route element={
            <ThemedLayoutV2 Header={() => <CustomHeader />}>
              <Outlet />
            </ThemedLayoutV2>}>
            <Route index element={<WelcomePage />} />
          </Route>
        </Routes>
      </Refine>
      <DevtoolsPanel />
      </ConfigProvider>
    </BrowserRouter>
  );
}

export default App;
