import type { RouteObject } from "react-router-dom";
import HomePage from "../../pages/home";
import PATH from "./path";
import { MainLayout } from "../layouts";

export const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
    ],
  },
];
