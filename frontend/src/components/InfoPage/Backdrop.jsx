import React from 'react'
import ReactDom from "react-dom"
import TreeView from './TreeView'
export default function Backdrop({onClose}) {
  return (
    ReactDom.createPortal(
        <div onClick={onClose} className='fixed bg-black bg-opacity-60 z-40 inset-0'>
            <div className='bg-black text-center bg-opacity-95 z-50 h-full w-64' onClick={(ev)=>(ev.stopPropagation())}>
              <div>
              <h2 className='text-white'> Side Display</h2>
               <TreeView/>
              </div>
              
            </div>
        </div>,
        document.getElementById("backdrop-root")
    )
  )
}

