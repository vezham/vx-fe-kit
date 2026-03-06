import { Icon } from '@iconify/react'
import { useContext, useEffect } from 'react'

import { Button } from '@vezham/react/v2'

import { HeaderActionContext } from '../../context/header-action'

const AlarmSection = () => {
  const setHeaderActions = useContext(HeaderActionContext)

  useEffect(() => {
    setHeaderActions({
      showAdd: true,
      onAdd: () => console.log('add alarm')
    })

    return () => setHeaderActions({})
  }, [])

  return <div>Alarm</div>
}

export { AlarmSection }
