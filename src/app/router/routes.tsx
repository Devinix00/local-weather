import type { RouteObject } from "react-router-dom";
import HomePage from "../../pages/home";
import FavoritesPage from "../../pages/favorites";
import FavoriteDetailPage from "../../pages/favorites/detail";
import NotFoundPage from "../../pages/not-found";
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
        path: PATH.FAVORITE.LIST,
        element: <FavoritesPage />,
      },
      {
        path: `${PATH.FAVORITE.DETAIL}/:id`,
        element: <FavoriteDetailPage />,
      },
      {
        path: PATH.NOT_FOUND,
        element: <NotFoundPage />,
      },
    ],
  },
];

export default routes;
