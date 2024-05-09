import React, { useContext, useEffect, useState } from 'react'
import {useLocation, useNavigate} from "react-router-dom"
import { category } from '../helper/category'
import {baseURL} from "../helper/baseURL"
import FilterProduct from '../components/FilterProduct'
import {useGlobalContent} from "../useContext/useContext"
export default function ProductHomePage() {
  const [products, setProducts]=useState()
  const [loading, setLoading]=useState(false)
  const location=useLocation()
  const urlSearch=new URLSearchParams(location.search)
  const urlCategoryListArray=urlSearch.getAll("category")
  const urlCategoryListObject={};
  urlCategoryListArray.forEach((el=>{
    urlCategoryListObject[el]=true;
  }))
  const [selectCategory, setSelectCategory]=useState(urlCategoryListObject)
  const [filterCategory, setFilterCategory]=useState([])
  const [sortBy, setSortBy]=useState("")
  const {token}=useContext(useGlobalContent)
  const navigate=useNavigate()
  const fetchData=async()=>{
    setLoading(true)
    try {
      const response=await fetch(`${baseURL}/product/filter-product`,{
        method:"post",
        headers:{"Content-Type":"application/json", Authorization:`Bearer ${token}`},
        body:JSON.stringify({category:filterCategory})
      })
      const data=await response.json()
      console.log(data)
      if(data){
        setProducts(data.products)
      }
      setLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }
  const handleSelect=async(ev)=>{
    const {name, value, checked}=ev.target
    console.log(name, value, checked)

    setSelectCategory((prev)=>{
      return {
        ...prev,
        [value]:checked
      }
    })
  }
  useEffect(()=>{
  fetchData()
  },[filterCategory])
  useEffect(()=>{
    const elementOfArray=Object.keys(selectCategory).map(categoryName=>{
      if(selectCategory[categoryName]){
        return categoryName
      }else{
        return;
      }
    }).filter(el=>el)
    
    setFilterCategory(elementOfArray)

    const urlFormat=elementOfArray.map((el, index)=>{
      if((elementOfArray.length-1)===index){
        return `category=${el}`
      }else{
        return `category=${el}&&`
      }
    })

    navigate(`/product-category?${urlFormat.join("")}`)
  }, [selectCategory])

  const handleSort=(ev)=>{
    const {value}=ev.target
    setSortBy(value)
    if(value==="asc"){
     setProducts(prev=>prev.sort((a,b)=>a.sellingPrice-b.sellingPrice))
    } else if(value==="dsc"){
      setProducts(prev=>prev.sort((a,b)=>b.sellingPrice-a.sellingPrice))
    }else{
      return;
    }
  }
  return (
    <div className='h-full w-full'>
  <div className='grid md:grid-cols-[200px_minmax(300px,_1fr)] bg-white h-full w-full'>
    {/* left side */}
    <div className='h-full hidden md:block  bg-slate-200 px-2'>
      <h2 className='text-gray-500 border-2 border-b-slate-500  pb-2 px-3'>Sort By</h2>
      <form>
        <div>
          <input type='radio' name='sort' checked={sortBy==="asc"} value={"asc"} onChange={handleSort}/>
          <label> sort from low to high</label>
        </div>
        <div>
          <input type='radio' name='sort' checked={sortBy==="dsc"} value={"dsc"} onChange={handleSort}/>
          <label> sort from high to low</label>
        </div>

      </form>
      <div>
        <h2 className='text-gray-500 border-2 border-b-slate-500 pb-2 px-3'> Category</h2>
      {
        category.map((product, index)=>(
          <div key={product.label} className='flex gap-2'>
           <input type='checkbox' name='category' id={product.value} checked={selectCategory.value} value={product.value} onChange={handleSelect}/>
           <label htmlFor={product.value}>{product.label}</label>
          </div>
        ))
      }
      </div>
   
    </div>
    {/* right side */}
    <div className='bg-slate-300 w-full h-full'>
     <FilterProduct products={products} loading={loading}/>
    
    </div>
  </div>
</div>
  )
}
