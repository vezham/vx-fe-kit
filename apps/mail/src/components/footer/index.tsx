import { Icon } from '@iconify/react'
import { useMatchRoute, useNavigate } from '@tanstack/react-router'
import React, { useState } from 'react'

import { Button } from '@vezham/react/v2'

import type { FooterProps } from './types'

const Footer: React.FC<FooterProps> = ({ footer }) => {
  const navigate = useNavigate()
  const matchRoute = useMatchRoute()

  if (!footer || footer.length === 0) return null

  return (
    <div className="flex gap-3">
      {footer.map(item => {
        const isActive = Boolean(matchRoute({ to: item.href, fuzzy: true }))
        return (
          <Button
            key={item.href}
            isIconOnly
            size="sm"
            variant="light"
            onClick={() => navigate({ to: item.href })}
            className={isActive ? 'bg-primary text-white' : ''}>
            <Icon icon={item.icon} width={20} />
          </Button>
        )
      })}
    </div>
  )
}

export default Footer
