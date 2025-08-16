// import {
//   Button,
//   DatePicker,
//   Dropdown,
//   DropdownItem,
//   DropdownMenu,
//   DropdownTrigger
// } from '@heroui/react'
// import { Icon } from '@iconify/react'
// import { useTheme } from '../../common/context'
// import { DateValue, getLocalTimeZone, parseDate } from '@internationalized/date'
// import { useDateFormatter } from '@react-aria/i18n'
// import React, { useState } from 'react'
// import { DatePickerProps } from './types'
// import {
//   getControlSectionClasses,
//   getFirstActionClasses,
//   getFlexGap2,
//   getOrderClasses
// } from './variant'

// const ControlSection: React.FC<DatePickerProps> = ({
//   onRefresh,
//   onDownload,

// }) => {
//   const [dateValue, setDateValue] = useState<DateValue | null>(
//     parseDate(new Date().toISOString().split('T')[0])
//   )
//   const [periodType, setPeriodType] = useState<string>('Monthly')
//   const [showCalendar, setShowCalendar] = useState<boolean>(false)
//   const formatter = useDateFormatter({ dateStyle: 'medium' })
//  const { isDarkMode } = useTheme()
//   const control = getControlSectionClasses()
//   const actionClass = getFirstActionClasses(isDarkMode)
//   const flexGap2 = getFlexGap2()
//   const order = getOrderClasses()

//   const handleDateChange = (date: DateValue | null) => {
//     setDateValue(date)
//     if (date) {
//       setPeriodType(
//         `Date: ${formatter.format(date.toDate(getLocalTimeZone()))}`
//       )
//     } else {
//       setPeriodType('Select Date')
//     }
//     setShowCalendar(false)
//   }

//   const handlePeriodChange = (type: string) => {
//     if (type === 'Custom Date') {
//       setShowCalendar(true)
//     } else {
//       setShowCalendar(false)
//       setPeriodType(type)
//     }
//   }

//   return (
//     <div className={control.wrapper}>
//       <div className={control.row}>
//         <div className={flexGap2}>
//           <div className={order.refreshOrder}>
//             <Button
//               size="sm"
//               isIconOnly
//               className={`${control.refreshBtnBase} ${actionClass}`}
//               onPress={onRefresh}>
//               <Icon icon="lucide:refresh-cw" className={control.icon} />
//             </Button>
//           </div>
//           <div className={order.dateOrder}>
//             <Dropdown className={`${actionClass}`}>
//               <DropdownTrigger>
//                 <Button
//                   size="sm"
//                   variant="flat"
//                   className={`${control.dateBtnBase} ${actionClass}`}
//                   endContent={
//                     <Icon icon="lucide:chevron-down" className={control.icon} />
//                   }
//                   startContent={
//                     <Icon icon="lucide:calendar" className={control.icon} />
//                   }>
//                   <span className={control.dateText}>
//                     {showCalendar
//                       ? `Date: ${dateValue ? formatter.format(dateValue.toDate(getLocalTimeZone())) : 'Select Date'}`
//                       : periodType}
//                   </span>
//                 </Button>
//               </DropdownTrigger>
//               <DropdownMenu
//                 aria-label="Date period options"
//                 onAction={key => handlePeriodChange(key as string)}>
//                 <DropdownItem key="Daily">Daily</DropdownItem>
//                 <DropdownItem key="Weekly">Weekly</DropdownItem>
//                 <DropdownItem key="Monthly">Monthly</DropdownItem>
//                 <DropdownItem key="Quarterly">Quarterly</DropdownItem>
//                 <DropdownItem key="Yearly">Yearly</DropdownItem>
//                 <DropdownItem key="Custom Date">Custom Date</DropdownItem>
//               </DropdownMenu>
//             </Dropdown>
//           </div>
//         </div>
//         <div>
//           <Button
//             size="sm"
//             color="primary"
//             className={control.downloadBtn}
//             startContent={
//               <Icon icon="lucide:download" className={control.downloadIcon} />
//             }
//             onPress={onDownload}>
//             <span className="hidden sm:flex">Download</span>
//           </Button>
//         </div>
//       </div>
//       {showCalendar && (
//         <div className={control.calendarWrapper}>
//           <DatePicker
//             className={`${actionClass}`}
//             label="Select Date"
//             value={dateValue}
//             onChange={handleDateChange}
//           />
//         </div>
//       )}
//     </div>
//   )
// }

// export default ControlSection

import {
  Button,
  DatePicker,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@heroui/react'
import { Icon } from '@iconify/react'
import {
  DateValue,
  getLocalTimeZone,
  parseDate,
  today
} from '@internationalized/date'
import { useDateFormatter } from '@react-aria/i18n'
import React, { useState } from 'react'
import { useTheme } from '../../common/context'
import { DatePickerProps } from './types'
import {
  getControlSectionClasses,
  getFirstActionClasses,
  getFlexGap2,
  getOrderClasses
} from './variant'

const ControlSection: React.FC<DatePickerProps> = ({
  onRefresh = () => console.log('Refresh clicked'),
  onDownload = () => console.log('Download clicked')
}) => {
  const [dateValue, setDateValue] = useState<DateValue | null>(
    parseDate(new Date().toISOString().split('T')[0])
  )
  const [periodType, setPeriodType] = useState<string>('Monthly')
  const [showCalendar, setShowCalendar] = useState<boolean>(false)
  const formatter = useDateFormatter({ dateStyle: 'medium' })
  const { isDarkMode } = useTheme()
  const control = getControlSectionClasses()
  const actionClass = getFirstActionClasses(isDarkMode)
  const flexGap2 = getFlexGap2()
  const order = getOrderClasses()

  // Simplify handleClickOutside function
  const handleClickOutside = (e: MouseEvent) => {
    if (showCalendar && e.target instanceof Node) {
      const calendarElement = document.querySelector('.calendar-container')
      if (calendarElement && !calendarElement.contains(e.target)) {
        setShowCalendar(false)
      }
    }
  }

  // Add effect to handle outside clicks
  React.useEffect(() => {
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showCalendar])

  // Add quick date selection options
  const quickDateOptions = [
    { label: 'Today', days: 0 },
    { label: 'Yesterday', days: 1 },
    { label: 'Last Week', days: 7 },
    { label: 'Last Month', days: 30 },
    { label: 'Last 3 Months', days: 90 },
    { label: 'Last Year', days: 365 }
  ]

  // Function to get a date from X days ago
  const getDateFromDaysAgo = (days: number): DateValue => {
    const now = today(getLocalTimeZone())
    return now.subtract({ days })
  }

  // Handle quick date selection
  const handleQuickDateSelect = (days: number) => {
    const newDate = getDateFromDaysAgo(days)
    setDateValue(newDate)
    setPeriodType(
      `Date: ${formatter.format(newDate.toDate(getLocalTimeZone()))}`
    )
    setShowCalendar(false)
  }

  // Simplify handleDateChange function
  const handleDateChange = (date: DateValue | null) => {
    setDateValue(date)
    if (date) {
      setPeriodType(
        `Date: ${formatter.format(date.toDate(getLocalTimeZone()))}`
      )
      setShowCalendar(false) // Close immediately on selection
    } else {
      setPeriodType('Select Date')
    }
  }

  const handlePeriodChange = (type: string) => {
    if (type === 'Custom Date') {
      setShowCalendar(true)
    } else {
      setShowCalendar(false)
      setPeriodType(type)
    }
  }

  // Add state for manual input
  const [manualInputValue, setManualInputValue] = useState<DateValue | null>(
    dateValue
  )

  // Handle manual date input change
  const handleManualInputChange = (date: DateValue | null) => {
    setManualInputValue(date)
    if (date) {
      setDateValue(date)
    }
  }

  // Apply manual date
  const applyManualDate = () => {
    if (manualInputValue) {
      setDateValue(manualInputValue)
      setPeriodType(
        `Date: ${formatter.format(manualInputValue.toDate(getLocalTimeZone()))}`
      )
      setShowCalendar(false)
    }
  }

  return (
    <div className={control.wrapper}>
      <div className={control.row}>
        <div className={flexGap2}>
          <div className={order.refreshOrder}>
            <Button
              size="sm"
              isIconOnly
              className={`${control.refreshBtnBase} ${actionClass}`}
              onPress={onRefresh}>
              <Icon icon="lucide:refresh-cw" className={control.icon} />
            </Button>
          </div>
          <div className={order.dateOrder}>
            <Dropdown className={`${actionClass}`}>
              <DropdownTrigger>
                <Button
                  size="sm"
                  variant="flat"
                  className={`${control.dateBtnBase} ${actionClass}`}
                  endContent={
                    <Icon icon="lucide:chevron-down" className={control.icon} />
                  }
                  startContent={
                    <Icon icon="lucide:calendar" className={control.icon} />
                  }>
                  <span className={control.dateText}>
                    {showCalendar
                      ? `Date: ${dateValue ? formatter.format(dateValue.toDate(getLocalTimeZone())) : 'Select Date'}`
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
                <DropdownItem key="Custom Date">Custom Date</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
        <div>
          <Button
            size="sm"
            color="primary"
            className={control.downloadBtn}
            startContent={
              <Icon icon="lucide:download" className={control.downloadIcon} />
            }
            onPress={onDownload}>
            <span className="hidden sm:flex">Download</span>
          </Button>
        </div>
      </div>
      <div className="relative">
        {showCalendar && (
          <div className="bg-content1 rounded-medium shadow-medium calendar-container absolute right-0 left-0 z-50 mt-3">
            <DatePicker
              className={`${actionClass}`}
              label="Select Date"
              value={dateValue}
              onChange={handleDateChange}
              showMonthAndYearPickers={true}
              visibleMonths={1}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default ControlSection
