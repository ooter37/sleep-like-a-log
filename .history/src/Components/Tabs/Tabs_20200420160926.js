import React from 'react'
import {Tabs} from 'react-tabs'

export default function Component(){
    return (
        <div>

    <Tabs>
        <TabList>
            <Tab>Derek</Tab>
            <Tab>Meghan</Tab>
            <Tab>Eloise</Tab>
        </TabList>

        <TabPanel>
            Derek's tab here
        </TabPanel>
        <TabPanel>
            Meghan's tab here
        </TabPanel>
        <TabPanel>
            Eloise's tab here
        </TabPanel>
    </Tabs>
        </div>
    )
}
