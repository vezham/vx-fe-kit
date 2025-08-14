'use client'

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
import type { Key } from 'react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ActionBar from '../../layouts/actionbar'
import { DatePickerProps, SettingsTabsProps } from './types'
import {
  getAvatarSectionClasses,
  getControlSectionClasses,
  getDescriptionClassName,
  getFirstActionClasses,
  getFlexGap2,
  getLayoutClasses,
  getOrderClasses,
  getTabsClassNames,
  getTitleClassName,
  getTruncateMax150
} from './variant'

type SettingsTabsWithDateProps = SettingsTabsProps &
  DatePickerProps & {
    showLeftHeader?: boolean
    showAvatarSection?: boolean
    showRefreshButton?: boolean
    showDateSection?: boolean
    showDownloadButton?: boolean
    showControlSection?: boolean
    isDarkmode?: boolean
  }

const Header: React.FC<SettingsTabsWithDateProps> = ({
  tabs,
  mainTitle,
  mainDescription,
  avatars,
  onRefresh,
  onDownload,
  showLeftHeader = true,
  showAvatarSection = false,
  showRefreshButton = true,
  showDateSection = true,
  showDownloadButton = true,
  showControlSection = true,
  isDarkmode = false
}) => {
  const [dateValue, setDateValue] = useState<DateValue | null>(
    parseDate(new Date().toISOString().split('T')[0])
  )
  const [periodType, setPeriodType] = useState<string>('Monthly')
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const formatter = useDateFormatter({ dateStyle: 'medium' })
  const navigate = useNavigate()

  const [avatarList, setAvatarList] = useState(avatars)
  const [activeTab, setActiveTab] = useState(tabs[0]?.key || '')

  const layout = getLayoutClasses()
  const avatar = getAvatarSectionClasses()
  const control = getControlSectionClasses()
  const tabsClassNames = getTabsClassNames(isDarkmode)
  const titleClass = getTitleClassName()
  const descClass = getDescriptionClassName()
  const actionClass = getFirstActionClasses(isDarkmode)
  const truncate150 = getTruncateMax150()
  const flexGap2 = getFlexGap2()
  const order = getOrderClasses()

  const handleDateChange = (date: DateValue | null) => {
    setDateValue(date)
    if (date) {
      setPeriodType(
        `Date: ${formatter.format(date.toDate(getLocalTimeZone()))}`
      )
    } else {
      setPeriodType('Select Date') // Handle null case
    }
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

  const handleAddAvatar = () => {
    const newAvatar = {
      name: `User ${avatarList.length + 1}`,
      src: `https://i.pravatar.cc/150?u=new-user-${avatarList.length + 1}`
    }
    setAvatarList(prev => [...prev, newAvatar])
  }

  // A helper function to safely cast the key to a string before updating the state
  const handleTabChange = (key: Key) => {
    setActiveTab(String(key))
  }

  return (
    <div className={layout.container}>
      {/* Header */}
      <div className={layout.headContainer}>
        <div className={layout.leftSection}>
          {showLeftHeader && (
            <Button
              isIconOnly
              radius="full"
              size="sm"
              className={actionClass}
              onPress={() => navigate(-1)}>
              <Icon icon="lucide:chevron-left" width={15} />
            </Button>
          )}
          <div>
            <h1 className={titleClass}>{mainTitle}</h1>
            <h2 className={`${descClass} ${truncate150}`}>{mainDescription}</h2>
          </div>
        </div>
        <div className={layout.rightSection}>
          <ActionBar />
        </div>
      </div>

      {/* Tabs + Controls */}
      <div className={layout.tabsWrapper}>
        <div className={layout.tabsScroll}>
          <Tabs
            size="sm"
            fullWidth
            selectedKey={activeTab}
            onSelectionChange={handleTabChange}
            classNames={tabsClassNames}>
            {tabs.map(({ key, title }) => (
              <Tab key={key} title={title} />
            ))}
          </Tabs>
        </div>

        {/* Avatar Section */}
        {showAvatarSection && (
          <div className={avatar.wrapper}>
            <AvatarGroup size="sm" total={avatarList.length}>
              {avatarList.map((av, i) => (
                <Tooltip key={i} content={av.name} placement="bottom">
                  <Avatar className={avatar.avatar} src={av.src} />
                </Tooltip>
              ))}
            </AvatarGroup>

            <Divider className={avatar.divider} orientation="vertical" />

            <Tooltip content="Add new avatar" placement="bottom">
              <Button
                isIconOnly
                radius="full"
                size="sm"
                variant="faded"
                onClick={handleAddAvatar}>
                <Icon className={avatar.addButtonIcon} icon="lucide:plus" />
              </Button>
            </Tooltip>
          </div>
        )}

        {/* Control Section */}
        {showControlSection && (
          <div className={control.wrapper}>
            <div className={control.row}>
              <div className={flexGap2}>
                <div className={order.refreshOrder}>
                  {showRefreshButton && (
                    <Button
                      size="sm"
                      isIconOnly
                      className={`${control.refreshBtnBase} ${actionClass}`}
                      onPress={onRefresh}>
                      <Icon icon="lucide:refresh-cw" className={control.icon} />
                    </Button>
                  )}
                </div>
                <div className={order.dateOrder}>
                  {showDateSection && (
                    <Dropdown className={`${actionClass}`}>
                      <DropdownTrigger>
                        <Button
                          size="sm"
                          variant="flat"
                          className={`${control.dateBtnBase} ${actionClass}`}
                          endContent={
                            <Icon
                              icon="lucide:chevron-down"
                              className={control.icon}
                            />
                          }
                          startContent={
                            <Icon
                              icon="lucide:calendar"
                              className={control.icon}
                            />
                          }>
                          <span className={control.dateText}>
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
                    className={control.downloadBtn}
                    startContent={
                      <Icon
                        icon="lucide:download"
                        className={control.downloadIcon}
                      />
                    }
                    onPress={onDownload}>
                    <span className="hidden sm:flex">Download</span>
                  </Button>
                )}
              </div>
            </div>
            {showDateSection && showCalendar && (
              <div className={control.calendarWrapper}>
                <DatePicker
                  className={`${actionClass}`}
                  label="Select Date"
                  value={dateValue}
                  onChange={handleDateChange}
                />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tab Content */}
      <div className="mt-4 md:px-5">
        {tabs.find(t => t.key === activeTab)?.content}
      </div>
    </div>
  )
}

export default Header
