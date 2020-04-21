import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';

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
