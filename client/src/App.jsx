import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Home } from "./pages";
import { DetailPost, Login, Protect, Signup } from "./components";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protect>
        <Home />
      </Protect>
    ),
  },
  {
    path: "/details/:id",
    element: (
      <Protect>
        <DetailPost />
      </Protect>
    ),
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: (
      <Protect>
        <Login />
      </Protect>
    ),
  },
]);

const App = () => {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
