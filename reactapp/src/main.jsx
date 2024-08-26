import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import Home from './routes/Home.jsx'
import BlockChain from './routes/BlockChain.jsx'
import Dashboard from './routes/Dashboard.jsx'
import Logout from './routes/Logout.jsx'
import Profile from './routes/Profile.jsx'
import './assets/css/output.css'
import './assets/css/style.css'
import { ModalProvider } from './components/ModalsContext.jsx'
import { LoginProvider } from './components/auth/AuthContext.jsx'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Transaction from './routes/Transactions.jsx'
import TokenVerify from './components/auth/TokenVerify.jsx'


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
  },
  {
    path: "/logout",
    element: <Logout />
  },
  {
    path: "/profile/:username",
    element: <Profile />
  }
]);

ReactDOM.createRoot(
  document.getElementById('root')).render(
    <React.StrictMode>


      <LoginProvider>

        <ModalProvider>
          <RouterProvider router={router} />
        </ModalProvider>

      </LoginProvider>
    </React.StrictMode>,
  )
