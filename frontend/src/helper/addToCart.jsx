import { useContext } from "react"
import { toast } from "react-toastify"
import {useGlobalContent} from "../useContext/useContext"

import { baseURL } from "./baseURL"

export default function AddToCart(){
    const {token,fetchDataCount }=useContext(useGlobalContent)

    const addToCart=async(ev, productId)=>{
        ev.stopPropagation(), 
        ev.preventDefault()
        
        try {
            const response=await fetch(`${baseURL}/cart/add-to-cart`,
        {
            method:"POST",
            headers:{"Authorization":"Bearer "+token, "Content-Type":"application/json"},
            body:JSON.stringify({productId})
        })
        const data=await response.json()
        if(data && data.product){
            toast.success(data.msg)
            fetchDataCount(token)
        }else{
         toast.error(data.msg)
        }
        } catch (error) {
            console.log(error.message)
            toast.error(error.message)
        }
    }
    return addToCart
}
 