import Tabs from 'react-tabs'

const Component = (
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
)

render(Component)