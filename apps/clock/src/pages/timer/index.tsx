import React, { useContext, useEffect } from 'react'

import { HeaderActionContext } from '../../context/header-action'

const TimerSection = () => {
  const setHeaderActions = useContext(HeaderActionContext)

  useEffect(() => {
    setHeaderActions({
      showAdd: true
    })
  }, [])

  return <div>TimerSection</div>
}

export { TimerSection }
