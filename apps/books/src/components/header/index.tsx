'use client'

import React from 'react'

import { SettingsTabsProps } from './types'
import {
  getDescriptionClassName,
  getLayoutClasses,
  getTitleClassName
} from './variant'

const Header: React.FC<SettingsTabsProps> = ({
  mainTitle,
  mainDescription,
  // children,
  startContent,
  endContent
}) => {
  const layout = getLayoutClasses()
  const titleClass = getTitleClassName()
  const descClass = getDescriptionClassName()

  return (
    <div className={layout.container}>
      <div className={layout.leftSection}>
        {startContent}
        <div>
          <h1 className={titleClass}>{mainTitle}</h1>
          <h2 className={`${descClass}`}>{mainDescription}</h2>
        </div>
      </div>
      <div> {endContent}</div>
    </div>
  )
}

export default Header
