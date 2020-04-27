import React from 'react'
import './Main.scss'
import BabyDisplay from '../BabyDisplay/BabyDisplay'
import Header from '../Header/Header'

export default function Main (props){
    return(
         <div className='main'>
             <Header location={props.location}/>
             <BabyDisplay/>
             </div>
    )
}