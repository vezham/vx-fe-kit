import {
  Avatar,
  AvatarGroup,
  Button,
  DatePicker,
  Divider,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Tab,
  Tabs,
  Tooltip
} from '@heroui/react'
import { Icon } from '@iconify/react'
import { DateValue, getLocalTimeZone, parseDate } from '@internationalized/date'
import { useDateFormatter } from '@react-aria/i18n'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionBar from '../../layouts/actionbar'
import { DatePickerProps, SettingsTabsProps } from './types'
import {
  avatarSectionClasses,
  controlSectionClasses,
  descriptionClassName,
  layoutClasses,
  tabsClassNames,
  titleClassName
} from './variant'

type SettingsTabsWithDateProps = SettingsTabsProps &
  DatePickerProps & {
    showLeftHeader?: boolean
    showAvatarSection?: boolean
    showRefreshButton?: boolean
    showDateSection?: boolean
    showDownloadButton?: boolean
    showControlSection?: boolean
  }

const Header: React.FC<SettingsTabsWithDateProps> = ({
  tabs,
  mainTitle,
  mainDescription,
  avatars,
  onRefresh,
  onDownload,
  // default all to true if not provided
  showLeftHeader = true,
  showAvatarSection = false,
  showRefreshButton = true,
  showDateSection = true,
  showDownloadButton = true,
  showControlSection = true
}) => {
  const [dateValue, setDateValue] = React.useState<DateValue | null>(
    parseDate(new Date().toISOString().split('T')[0])
  )
  const [periodType, setPeriodType] = React.useState<string>('Monthly')
  const [showCalendar, setShowCalendar] = React.useState<boolean>(false)
  const formatter = useDateFormatter({ dateStyle: 'medium' })
  const navigate = useNavigate()

  const handleDateChange = (date: DateValue) => {
    setDateValue(date)
    setPeriodType(`Date: ${formatter.format(date.toDate(getLocalTimeZone()))}`)
    setShowCalendar(false)
  }

  const handlePeriodChange = (type: string) => {
    if (type === 'Custom Date') {
      setShowCalendar(true)
    } else {
      setShowCalendar(false)
      setPeriodType(type)
    }
  }

  const [avatarList, setAvatarList] = useState(avatars)
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '')

  const handleAddAvatar = () => {
    const newAvatar = {
      name: `User ${avatarList.length + 1}`,
      src: `https://i.pravatar.cc/150?u=new-user-${avatarList.length + 1}`
    }
    setAvatarList(prev => [...prev, newAvatar])
  }

  return (
    <div className={layoutClasses.container}>
      {/* Header */}
      <div className={layoutClasses.headContainer}>
        <div className={layoutClasses.leftSection}>
          {showLeftHeader && (
            <Button
              isIconOnly
              radius="full"
              size="xs"
              className="p-1"
              onPress={() => navigate(-1)}>
              <Icon icon="lucide:chevron-left" width={15} />
            </Button>
          )}
          <div>
            <h1 className={titleClassName}>{mainTitle}</h1>
            <h2 className={`${descriptionClassName} max-w-[150px] truncate`}>
              {mainDescription}
            </h2>
          </div>
        </div>
        <div className={layoutClasses.rightSection}>
          <ActionBar />
        </div>
      </div>

      {/* Tabs + Controls */}
      <div className={layoutClasses.tabsWrapper}>
        <div className={layoutClasses.tabsScroll}>
          <Tabs
            size="sm"
            fullWidth
            selectedKey={activeTab}
            onSelectionChange={setActiveTab}
            classNames={tabsClassNames}>
            {tabs.map(({ key, title }) => (
              <Tab key={key} title={title} />
            ))}
          </Tabs>
        </div>

        {/* Avatar Section */}
        {showAvatarSection && (
          <div className={avatarSectionClasses.wrapper}>
            <AvatarGroup size="sm" total={avatarList.length}>
              {avatarList.map((avatar, index) => (
                <Tooltip key={index} content={avatar.name} placement="bottom">
                  <Avatar
                    className={avatarSectionClasses.avatar}
                    src={avatar.src}
                  />
                </Tooltip>
              ))}
            </AvatarGroup>

            <Divider
              className={avatarSectionClasses.divider}
              orientation="vertical"
            />

            <Tooltip content="Add new avatar" placement="bottom">
              <Button
                isIconOnly
                radius="full"
                size="sm"
                variant="faded"
                onClick={handleAddAvatar}>
                <Icon
                  className={avatarSectionClasses.addButtonIcon}
                  icon="lucide:plus"
                />
              </Button>
            </Tooltip>
          </div>
        )}

        {/* Control Section */}
        {showControlSection && (
          <div className={controlSectionClasses.wrapper}>
            <div className={controlSectionClasses.row}>
              <div className="flex gap-2">
                <div className="order-2 lg:order-1">
                  {showRefreshButton && (
                    <Button
                      size="sm"
                      isIconOnly
                      className={controlSectionClasses.refreshBtn}
                      onPress={onRefresh}>
                      <Icon
                        icon="lucide:refresh-cw"
                        className={controlSectionClasses.icon}
                      />
                    </Button>
                  )}
                </div>
                <div className="order-1 lg:order-2">
                  {showDateSection && (
                    <Dropdown>
                      <DropdownTrigger>
                        <Button
                          size="sm"
                          variant="flat"
                          className={controlSectionClasses.dateBtn}
                          endContent={
                            <Icon
                              icon="lucide:chevron-down"
                              className={controlSectionClasses.icon}
                            />
                          }
                          startContent={
                            <Icon
                              icon="lucide:calendar"
                              className={controlSectionClasses.icon}
                            />
                          }>
                          <span className={controlSectionClasses.dateText}>
                            {showCalendar
                              ? `Date: ${
                                  dateValue
                                    ? formatter.format(
                                        dateValue.toDate(getLocalTimeZone())
                                      )
                                    : 'Select Date'
                                }`
                              : periodType}
                          </span>
                        </Button>
                      </DropdownTrigger>
                      <DropdownMenu
                        aria-label="Date period options"
                        onAction={key => handlePeriodChange(key as string)}>
                        <DropdownItem key="Daily">Daily</DropdownItem>
                        <DropdownItem key="Weekly">Weekly</DropdownItem>
                        <DropdownItem key="Monthly">Monthly</DropdownItem>
                        <DropdownItem key="Quarterly">Quarterly</DropdownItem>
                        <DropdownItem key="Yearly">Yearly</DropdownItem>
                        <DropdownItem key="Custom Date">
                          Custom Date
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown>
                  )}
                </div>
              </div>
              <div>
                {showDownloadButton && (
                  <Button
                    size="sm"
                    color="primary"
                    className={controlSectionClasses.downloadBtn}
                    startContent={
                      <Icon
                        icon="lucide:download"
                        className={controlSectionClasses.downloadIcon}
                      />
                    }
                    onPress={onDownload}>
                    <span className="hidden sm:flex">Download</span>
                  </Button>
                )}
              </div>
            </div>
            {showDateSection && showCalendar && (
              <div className={controlSectionClasses.calendarWrapper}>
                <DatePicker
                  label="Select Date"
                  value={dateValue}
                  onChange={handleDateChange}
                />
              </div>
            )}
          </div>
        )}
      </div>
      <div className="mt-4 md:px-5">
        {tabs.find(t => t.key === activeTab)?.content}
      </div>
    </div>
  )
}

export default Header
