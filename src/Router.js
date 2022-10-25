import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Order from "./Page/Order";
import App from "./App";


const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/order",
        element: <Order />,
    },
]);
export default Router;
