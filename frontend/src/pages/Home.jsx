import React from 'react'
import CategoryList from '../components/CategoryList'
import Banner from '../components/Banner'
import HorizontalCard from '../components/HorizontalCard'
import VerticalCard from '../components/VerticalCard'
export default function Home() {
  return (
    <div className=' h-auto'>
      <CategoryList/>
      <Banner/>
      <HorizontalCard category={"AirPods"} heading={"Top of AirPods"}/>
      <HorizontalCard category={"TV"} heading={"Popular smart TV"}/>
      <HorizontalCard category={"Mobile"} heading={"Popular Mobile"}/>
      <VerticalCard category={"TV"} heading={"Popular smart TV"}/>
      <VerticalCard category={"Mouse"} heading={"Modern Mouse wireless"}/>

    </div>
  )
}
