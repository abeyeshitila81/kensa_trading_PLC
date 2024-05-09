import React from 'react'
import MenuList from './MenuList'
import Data from '../../helper/Data'

function TreeView() {
  return (
    <div className='bg-white mt-10 px-6 h-screen'>
    <MenuList List={Data}/>
    </div>
  )
}

export default TreeView