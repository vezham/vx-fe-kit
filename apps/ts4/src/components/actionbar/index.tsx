import {
  Button,
  ButtonGroup,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  cn
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import { ActionButtonProps, ActionToolbarProps } from './types'
import { getBaseContainerClasses, getButtonVariantClasses } from './variant'

const ActionButton = ({
  icon,
  label,
  color = 'default',
  isDarkMode
}: ActionButtonProps & { isDarkMode: boolean }) => (
  <Button
    isIconOnly
    variant="light"
    aria-label={label}
    className={cn(
      getButtonVariantClasses({ color, isDarkMode }),
      // Force text-black for default color in light mode
      !isDarkMode && color === 'default' && 'text-black',
      // Force white text in dark mode if default color
      isDarkMode && color === 'default' && 'text-white'
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
  isDarkMode = false
}: ActionToolbarProps & {
  showSearch?: boolean
  showViewActions?: boolean
  showOtherActions?: boolean
  isDarkMode?: boolean
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

  const visibleCount = screen === 'lg' ? 2 : screen === 'md' ? 1 : 0

  const visibleActions = otherActions.slice(0, visibleCount)
  const moreActions = otherActions.slice(visibleCount)

  return (
    <div className={cn('flex items-center justify-end gap-2', className)}>
      {showSearch && searchAction && (
        <div className={getBaseContainerClasses(isDarkMode)}>
          <ActionButton {...searchAction} isDarkMode={isDarkMode} />
        </div>
      )}

      {screen !== 'xs' && showViewActions && viewActions.length > 0 && (
        <div className={getBaseContainerClasses(isDarkMode)}>
          <ButtonGroup variant="light">
            {viewActions.map((action, index) => (
              <Button
                key={index}
                isIconOnly
                aria-label={action.label}
                className={!isDarkMode ? 'text-black' : 'text-white'}>
                <Icon icon={action.icon} width={18} />
              </Button>
            ))}
          </ButtonGroup>
        </div>
      )}

      {showOtherActions && otherActions.length > 0 && screen !== 'xs' && (
        <div
          className={cn(
            getBaseContainerClasses(isDarkMode),
            'flex',
            'rounded-full'
          )}>
          <ButtonGroup className={cn(getBaseContainerClasses(isDarkMode))}>
            {visibleActions.map((action, index) => (
              <ActionButton key={index} {...action} isDarkMode={isDarkMode} />
            ))}
            {moreActions.length > 0 && (
              <Dropdown
                className={
                  isDarkMode
                    ? 'bg-white/10 text-white shadow-lg'
                    : 'bg-white text-black'
                }>
                <DropdownTrigger>
                  <Button
                    isIconOnly
                    variant="light"
                    aria-label="More options"
                    className={getButtonVariantClasses({
                      color: 'default',
                      isDarkMode
                    })}>
                    <Icon icon="lucide:more-horizontal" width={20} />
                  </Button>
                </DropdownTrigger>
                <DropdownMenu aria-label="More actions">
                  {moreActions.map((action, index) => (
                    <DropdownItem
                      key={index}
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
            <Dropdown
              className={
                isDarkMode ? 'bg-white/10 text-white' : 'bg-white text-black'
              }>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  variant="light"
                  aria-label="More options"
                  className={getButtonVariantClasses({
                    color: 'default',
                    isDarkMode
                  })}>
                  <Icon icon="lucide:more-horizontal" width={20} />
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="All actions">
                {showViewActions && viewActions.length > 0 && (
                  <>
                    {viewActions.map((action, index) => (
                      <DropdownItem
                        key={`view-${index}`}
                        startContent={<Icon icon={action.icon} width={18} />}>
                        {action.label}
                      </DropdownItem>
                    ))}
                    {showOtherActions && otherActions.length > 0 && (
                      <DropdownItem
                        key="divider"
                        isReadOnly
                        className="pointer-events-none my-1 h-px bg-gray-300 p-0 dark:bg-gray-600"
                      />
                    )}
                  </>
                )}
                {showOtherActions && otherActions.length > 0 && (
                  <>
                    {otherActions.map((action, index) => (
                      <DropdownItem
                        key={`other-${index}`}
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
                )}
              </DropdownMenu>
            </Dropdown>
          </div>
        )}
    </div>
  )
}
