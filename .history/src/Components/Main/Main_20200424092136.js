import React from 'react'
import './Main.scss'
import BabyDisplay from '../BabyDisplay/BabyDisplay'
import Header from '../Header/Header'

export default function Main (props){
    console.log(this.props.location)
    return(
         <div className='main'>
             <Header/>
             <BabyDisplay/>
             </div>
    )
}