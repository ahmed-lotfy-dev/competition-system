import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import "./index.css"
import App from "./App.js"

import { createBrowserRouter } from "react-router"
import { RouterProvider } from "react-router"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
])



const root = document.getElementById("root")

if (root) {
  createRoot(root).render(<RouterProvider router={router} />)
}
