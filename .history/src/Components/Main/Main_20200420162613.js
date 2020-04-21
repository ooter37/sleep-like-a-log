import React from 'react'
import './Main.scss'
import BabyDisplay from '../BabyDisplay/BabyDisplay'
import LogDisplay from '../LogDisplay/LogDisplay'
import AddBaby from '../AddBaby/AddBaby'
export default function Main (){
    return(
         <div className='main'>
             <BabyDisplay/>
             <AddBaby/>
             </div>
    )
}