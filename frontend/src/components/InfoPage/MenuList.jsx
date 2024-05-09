import React from 'react'
import MenuItem from './MenuItem'
function MenuList({List}) {
  return (
    <div >
        { List && List.length ?
        <ul className='ml-4'>
            {List.map((Item)=>(
                <MenuItem key={Item.label} Item={Item}/>
            ))}
        </ul>
         :null}
    </div>
  )
}

export default MenuList