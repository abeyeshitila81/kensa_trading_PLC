import React, { useContext } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useGlobalContent } from '../useContext/useContext'

export default function AdminPanel() {
  const {user}=useContext(useGlobalContent)
  return (
    <div className='sm:flex h-[calc(100vh-110px)] w-full hidden '>
      <aside className='bg-white min-h-full w-[25%] aside-shadow-custom border 
      flex flex-col items-center gap-10 pt-10'>
         <div>
            <img src={user?.image} alt={user?.name} className='w-32 h-32 rounded-full'/>
            <p>Name :{user?.name}</p>
            <p>Email: {user?.email}</p>
            <p>Role : {user?.role}</p>
         </div>
         <div >
          <div>
            <Link to="all-user">All user</Link>
          </div>
          <div>
            <Link to="all-product">Product</Link>
          </div>
         </div>
      </aside> 
      <main className='bg-blue-200 h-full w-[75%]'>
       <Outlet/>
      </main>
    </div>
  )
}
