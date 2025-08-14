import {
  Button,
  ButtonGroup,
  cn,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { ActionButtonProps, ActionToolbarProps } from './types'
import {
  getBaseContainerClasses,
  getButtonVariantClasses,
  getDropdownMenuClasses,
  getDropdownTriggerClasses
} from './variant'

const ActionButton = ({
  icon,
  label,
  color = 'default',
  isDarkMode = false
}: ActionButtonProps & { isDarkMode: boolean }) => (
  <Button
    isIconOnly
    variant="light"
    aria-label={label}
    className={cn(
      getButtonVariantClasses({ color, isDarkMode }),
      '!rounded-full'
    )}>
    <Icon icon={icon} width={20} />
  </Button>
)

export const ActionToolbar = ({
  showSearch = true,
  searchAction,
  showViewActions = true,
  viewActions = [],
  showOtherActions = true,
  otherActions = [],
  className = '',
  isDarkMode = false // The prop is now required, with a fallback default.
}: ActionToolbarProps & {
  showSearch?: boolean
  showViewActions?: boolean
  showOtherActions?: boolean
  isDarkMode: boolean
}) => {
  const [screen, setScreen] = React.useState<'lg' | 'md' | 'sm' | 'xs'>('lg')

  React.useEffect(() => {
    const updateScreen = () => {
      const width = window.innerWidth
      if (width >= 1024) setScreen('lg')
      else if (width >= 768) setScreen('md')
      else if (width >= 640) setScreen('sm')
      else setScreen('xs')
    }
    updateScreen()
    window.addEventListener('resize', updateScreen)
    return () => window.removeEventListener('resize', updateScreen)
  }, [])

  const getVisibleCount = (type: 'view' | 'other') => {
    if (screen === 'lg') return type === 'view' ? viewActions.length : 2
    if (screen === 'md') return type === 'view' ? viewActions.length : 1
    if (screen === 'sm') return 1
    return 0
  }

  const visibleViewActions = viewActions.slice(0, getVisibleCount('view'))
  const moreViewActions = viewActions.slice(getVisibleCount('view'))

  const visibleOtherActions = otherActions.slice(0, getVisibleCount('other'))
  const moreOtherActions = otherActions.slice(getVisibleCount('other'))

  const hasMoreView = moreViewActions.length > 0
  const hasMoreOther = moreOtherActions.length > 0

  return (
    <div className={cn('flex items-center justify-end gap-2', className)}>
      {showSearch && searchAction && (
        <div className={getBaseContainerClasses(isDarkMode)}>
          <ActionButton {...searchAction} isDarkMode={isDarkMode} />
        </div>
      )}

      {screen !== 'xs' && showViewActions && viewActions.length > 0 && (
        <div className={getBaseContainerClasses(isDarkMode)}>
          <ButtonGroup variant="light" className="overflow-hidden rounded-full">
            {visibleViewActions.map((action, index) => (
              <Button
                key={index}
                isIconOnly
                aria-label={action.label}
                className={cn(
                  getButtonVariantClasses({ isDarkMode }),
                  '!rounded-full'
                )}>
                <Icon icon={action.icon} width={18} />
              </Button>
            ))}

            {hasMoreView && (
              <Dropdown className={getDropdownMenuClasses(isDarkMode)}>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    aria-label="More view actions"
                    className={getDropdownTriggerClasses(isDarkMode)}>
                    <Icon icon="lucide:more-horizontal" width={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="More view actions">
                  {moreViewActions.map((action, index) => (
                    <DropdownItem
                      key={index}
                      startContent={<Icon icon={action.icon} width={18} />}>
                      {action.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </ButtonGroup>
        </div>
      )}

      {showOtherActions && otherActions.length > 0 && screen !== 'xs' && (
        <div
          className={cn(
            getBaseContainerClasses(isDarkMode),
            'flex overflow-hidden rounded-full'
          )}>
          <ButtonGroup
            className={cn(
              getBaseContainerClasses(isDarkMode),
              'overflow-hidden rounded-full'
            )}>
            {visibleOtherActions.map((action, index) => (
              <ActionButton key={index} {...action} isDarkMode={isDarkMode} />
            ))}

            {hasMoreOther && (
              <Dropdown className={getDropdownMenuClasses(isDarkMode)}>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    aria-label="More other actions"
                    className={getDropdownTriggerClasses(isDarkMode)}>
                    <Icon icon="lucide:more-horizontal" width={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="More other actions">
                  {moreOtherActions.map((action, index) => (
                    <DropdownItem
                      key={index}
                      shortcut={action.shortcut}
                      startContent={
                        <Icon
                          icon={action.icon}
                          width={18}
                          className={
                            action.color === 'danger' ? 'text-red-500' : ''
                          }
                        />
                      }>
                      {action.label}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            )}
          </ButtonGroup>
        </div>
      )}

      {screen === 'xs' &&
        ((showViewActions && viewActions.length > 0) ||
          (showOtherActions && otherActions.length > 0)) && (
          <div className={getBaseContainerClasses(isDarkMode)}>
            <Dropdown className={getDropdownMenuClasses(isDarkMode)}>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  aria-label="More options"
                  className={getDropdownTriggerClasses(isDarkMode)}>
                  <Icon icon="lucide:more-horizontal" width={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="All actions">
                {showViewActions ? (
                  <>
                    {viewActions.map((action, index) => (
                      <DropdownItem
                        key={`view-${index}`}
                        startContent={<Icon icon={action.icon} width={18} />}>
                        {action.label}
                      </DropdownItem>
                    ))}
                  </>
                ) : null}

                {showViewActions &&
                showOtherActions &&
                otherActions.length > 0 ? (
                  <DropdownItem
                    key=""
                    className="bg-transparent hover:bg-transparent">
                    <Divider
                      className={isDarkMode ? 'bg-zinc-700' : 'bg-neutral-300'}
                    />
                  </DropdownItem>
                ) : null}

                {showOtherActions ? (
                  <>
                    {otherActions.map((action, index) => (
                      <DropdownItem
                        key={`other-${index}`}
                        shortcut={action.shortcut}
                        startContent={
                          <Icon
                            icon={action.icon}
                            width={18}
                            className={
                              action.color === 'danger' ? 'text-red-500' : ''
                            }
                          />
                        }>
                        {action.label}
                      </DropdownItem>
                    ))}
                  </>
                ) : null}
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
    </div>
  )
}
