import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.jsx'
import BlockChain from './routes/BlockChain.jsx'
import Dashboard from './routes/Dashboard.jsx'
import './assets/css/output.css'
import './assets/css/style.css'
import { ModalProvider } from './components/LoginPageContext.jsx'
import { LoginProvider } from './components/AuthContext.jsx'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Transaction from './routes/Transactions.jsx'


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/blockchain",
    element: <BlockChain />,

  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/transactions",
    element: <Transaction />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <LoginProvider>
        <RouterProvider router={router} />
      </LoginProvider>
    </ModalProvider>
  </React.StrictMode>,
)
