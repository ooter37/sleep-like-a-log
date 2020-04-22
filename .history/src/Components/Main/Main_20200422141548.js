import React from 'react'
import './Main.scss'
import BabyDisplay from '../BabyDisplay/BabyDisplay'
import Header from '../Header/Header'

export default function Main (){
    return(
         <div className='main'>
             <Header/>
             <BabyDisplay/>
             </div>
    )
}