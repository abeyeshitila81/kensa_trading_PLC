import {createBrowserRouter, RouterProvider} from "react-router-dom"
import App from "../App";
import SignUp from "../pages/SignUp";
import Home from "../pages/Home";
import ProductHomePage from "../pages/ProductHomePage";
import AdminPanel from "../components/AdminPanel";
import AllProduct from "../components/AllProduct";
import AllUser from "../components/AllUser";
import ProductDetail from "../components/ProductDetail";
import Cart from "../components/Cart";
import Search from "../pages/Search";
import About from "../components/InfoPage/About";
import Contact from "../components/InfoPage/Contact";
import CustomerService from "../components/InfoPage/CustomerService";
const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
          {
            path:"/",
            element:<Home/>
          },
            {
                path:"sign-up",
                element:<SignUp/>
            },
            {
              path:"product-category",
              element:<ProductHomePage/>
            },
            {
            path:"product-detail/:id",
            element:<ProductDetail/>
            },
            {
            path:"cart",
            element:<Cart/>
            },
            {
              path:"search",
              element:<Search/>
            },
            {
              path:"/admin-panel",
              element:<AdminPanel/>,
              children:[
                {
                  path:"all-user",
                  element:<AllUser/>

                },
                {
                  path:"all-product",
                  element:<AllProduct/>
                }
              ]
            },

            {
            path:"about",
            element:<About/>
            },
            {
              path:"contact",
              element:<Contact/>
            },
            {
              path:"customer-service",
              element:<CustomerService/>
            }
        ]
    }
])

export default function index() {
  return (
    <RouterProvider router={router}/>
  )
}
