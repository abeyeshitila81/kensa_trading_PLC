import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaSearch , FaShoppingCart, FaRegUser} from "react-icons/fa";
import { useState, useContext, useEffect } from "react";
import { useGlobalContent } from "../useContext/useContext";
import LinkPage from "../components/InfoPage/LinkPage";
export default function Header() {
  const [showAdmin, setShowAdmin]=useState(false)
  const searchInput=useLocation()
  const urlSearch=new URLSearchParams(searchInput.search)
  const searchQuery=urlSearch.getAll("q")
  const [search, setSearch]=useState(searchQuery)
  const {user, token, Logout, countProduct, fetchDataCount}=useContext(useGlobalContent)
  const navigate=useNavigate()

useEffect(()=>{
  fetchDataCount(token)
},[token])
const handleOnChange=async(ev)=>{
const {value}=ev.target;
setSearch(value)
if(value){
  navigate(`/search?q=${value}`)
}else{
  navigate("search")
}
}
useEffect(()=>{
 
},[])
  return (
    <header >
      <div className="container flex mx-auto px-8 py-3 items-center justify-between
     bg-white shadow-xl aside-shadow-custom">
      <Link to="/"><img src="/logo4.png" width={60} height={60} alt="logo" className="rounded-full"/></Link>
       <div className="sm:flex items-center w-[50%] hidden ">
        <input type="text" placeholder="search" className="border-solid border-2 w-full py-[2px] focus:py-[1px]
         border-sky-500 rounded-s-full border-r-0 focus:outline outline-offset-[1px] outline-1 outline-sky-500 "
         value={search}
          onChange={handleOnChange}/>
       
       <div className="bg-sky-400 text-white border-2 flex items-center justify-center text-2xl cursor-pointer px-3 py-1 rounded-e-full ">
       <FaSearch />
        </div> 
       </div>
       <div className="flex justify-between items-center gap-10 group">
        {user?._id && <div className={`relative ${showAdmin && "pr-6"}`} onClick={()=>setShowAdmin(prev=>!prev)}>
        <div className="cursor-pointer text-sky-500 font-bold text-2xl">
          {user && user?.image? <img src={user?.image} alt={user?.name} className="w-10 h-10 rounded-full"/> :<FaRegUser/>}
        </div>
       {  user?.role==="ADMIN" && showAdmin &&
          <div className="absolute py-3 px-2 bg-white rounded">
          <Link to={"/admin-panel"} className="text-nowrap text-center text-xs">Admin Panel</Link>
        </div>
        }
        </div>}
       
        {user && 
        <Link to={"/cart"} className="cursor-pointer text-sky-500 relative">
          <span className="absolute top-[-16px] right-0 text-red-700 text-lg">{countProduct}</span>
          <FaShoppingCart className="text-4xl"/>
        </Link>}
        {token 
        ?
        <button className="px-4 py-1 rounded-md bg-sky-500 text-white" onClick={Logout}>Logout</button>
        :
        <Link to="/sign-up" className="px-4 py-1 rounded-md bg-sky-500 text-white">Login</Link>

        }
       </div>
      </div>
       
       <div className=" w-full  bg-slate-500">
         <LinkPage/>
       </div>
    </header>
  )
}
