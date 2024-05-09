import { Outlet } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalContext from './useContext/useContext.jsx'
import Header from "./pages/Header"
import Footer from "./pages/Footer"
import "./App.css"
function App() {
  return (
    <GlobalContext>
    <Header/>
    <main className="container bg-slate-100 min-h-[calc(100vh-100px)] mx-auto py-4">
       <Outlet/>
     </main>
     <Footer/>
     <ToastContainer position="top-center"/>
    </GlobalContext>
        )
}
export default App
