import React, { useState } from 'react'
import { FaAngleRight, FaAngleDown } from "react-icons/fa";

import MenuList from './MenuList'

function MenuItem({Item}) {
    const [displayCurrentChildren , setDisplayCurrentChildren]=useState({})
    const handleToggleChildren=(getCurrentLabel)=>{
      setDisplayCurrentChildren({...displayCurrentChildren,
        [getCurrentLabel]:!displayCurrentChildren[getCurrentLabel]})
    }

  return (
    <li>
        <div className='flex items-center'>
            <h4> {Item.label}</h4>
            {
         Item && Item.children && Item.children.length ?
         <span onClick={()=>handleToggleChildren(Item.label)} className='ml-4'>
            {
                displayCurrentChildren[Item.label] ?<FaAngleDown/> :<FaAngleRight/>
            }
         </span>
         :null
         }
        </div>

    {
        Item && Item.children && Item.children.length >0 && displayCurrentChildren[Item.label]?
        <MenuList List={Item.children} />
         :null
    }
    </li>
  )
}

export default MenuItem