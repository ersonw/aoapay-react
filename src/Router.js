import React from "react";
import {createBrowserRouter} from "react-router-dom";
import Order from "./Page/Order";
import App from "./App";


const Router = createBrowserRouter([
    {
        path: "/order",
        element: <Order />,
    },
    {
        path: "/*",
        element: <App />,
    },
]);
export default Router;
