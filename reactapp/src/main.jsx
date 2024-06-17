import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.jsx'
import BlockChain from './routes/BlockChain.jsx'

import './assets/css/output.css'
import './assets/css/style.css'
import { ModalProvider } from './components/LoginPageContext.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blockchain",
    element: <BlockChain />,

  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <RouterProvider router={router} />
    </ModalProvider>
  </React.StrictMode>,
)
