import React from 'react'
import './Main.scss'
import BabyDisplay from '../BabyDisplay/BabyDisplay'
import NewLogEntry from '../../Components/NewLogEntry/NewLogEntry'

export default function Main (){
    return(
         <div className='main'>
             <BabyDisplay/>
             <NewLogEntry/>
             </div>
    )
}