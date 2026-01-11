import type { RouteObject } from "react-router-dom";
import HomePage from "../../pages/home";
import FavoritesPage from "../../pages/favorites";
import PATH from "./path";
import { MainLayout } from "../layouts";

const routes: RouteObject[] = [
  {
    element: <MainLayout />,
    children: [
      {
        path: PATH.HOME,
        element: <HomePage />,
      },
      {
        path: PATH.FAVORITES,
        element: <FavoritesPage />,
      },
    ],
  },
];

export default routes;
