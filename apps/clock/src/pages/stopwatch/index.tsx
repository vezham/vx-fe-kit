import React, { useContext, useEffect } from 'react'

import { HeaderActionContext } from '../../context/header-action'

const Stopwatch = () => {
  const setHeaderActions = useContext(HeaderActionContext)

  useEffect(() => {
    setHeaderActions({
      showAdd: false
    })
  }, [])

  return <div>Stopwatch</div>
}

export default Stopwatch
