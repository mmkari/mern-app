import * as React from 'react'

import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'

const SimpleTabs = () => {
  //   const classes = useStyles()
  const [value, setValue] = React.useState(0)

  function handleChange (event, newValue) {
    setValue(newValue)
  }

  return (
    <div style={{ background: 'lightgreen' }}>
      <div>
        <Tabs value={value} onChange={handleChange}>
          <Tab label="Item One" />
          <Tab label="Item Two" />
          <Tab label="Item Three" />
        </Tabs>
      </div>
      {value === 0 && <div>Item One</div>}
      {value === 1 && <div>Item Two</div>}
      {value === 2 && <div>Item Three</div>}
    </div>
  )
}

export default SimpleTabs
