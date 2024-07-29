import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../components/Home/Home";
import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";
import MovieDetail from "../components/MovieDetails/MovieDetail";
import PlayMovie from "../components/MovieDetails/PlayMovie";
import PageNotFound from "../components/PageNotFound/PageNotFound";
import Dashboard from "../layout/Dashboard";
import Profile from "../components/Dashboard/Profile";
import Admin from "../components/Dashboard/Admin";
import Allusers from "../components/Dashboard/Admin/Allusers";
import Addmovies from "../components/Dashboard/Admin/Addmovies";
import Premium from "../components/Dashboard/Admin/Premium";
import Editmovies from "../components/Dashboard/Admin/Editmovies";
import Allmovies from "../components/Dashboard/Admin/Allmovies";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <PageNotFound></PageNotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/movie/:imdbID",
        element: <MovieDetail></MovieDetail>,
      },
      {
        path: "/playmovie",
        element: <PlayMovie></PlayMovie>,
      },
    ],
  },

  // Dashboard
  {
    path: "/dashboard",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "profile",
        element: <Profile></Profile>,
      },
      {
        path: "admin",
        element: <Admin></Admin>,
      },
      {
        path: "admin/allusers",
        element: <Allusers></Allusers>,
      },
      {
        path: "admin/primiumusers",
        element: <Premium></Premium>,
      },
      {
        path: "admin/addmovies",
        element: <Addmovies></Addmovies>,
      },
      {
        path: "admin/editmovies",
        element: <Editmovies></Editmovies>,
      },
      {
        path: "admin/movieslist",
        element: <Allmovies></Allmovies>,
      },
    ],
  },
]);
