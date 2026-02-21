import { createBrowserRouter } from "react-router";
import { LoginPage } from "./pages/LoginPage";
import { DashboardLayout } from "./pages/DashboardLayout";
import { DashboardHome } from "./pages/DashboardHome";
import { UploadReport } from "./pages/UploadReport";
import { Medications } from "./pages/Medications";
import { Symptoms } from "./pages/Symptoms";
import { ChatAssistant } from "./pages/ChatAssistant";
import { Settings } from "./pages/Settings";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LoginPage,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: DashboardHome },
      { path: "upload", Component: UploadReport },
      { path: "medications", Component: Medications },
      { path: "symptoms", Component: Symptoms },
      { path: "chat", Component: ChatAssistant },
      { path: "settings", Component: Settings },
    ],
  },
]);
