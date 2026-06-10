import { Icon } from '@iconify/react'

import {
  Button,
  DateField,
  DateRangePicker,
  Dropdown,
  RangeCalendar,
  Surface
} from '@vezham/react-v3'

import { dateOptions } from '../../../../../store/useAcademic/useClassRoutine'
import type { CustomDateRangeValue, DatePresetKey } from '../../types'
import { classNames } from '../../variants'

type DateRangeDropdownProps = {
  activeDateLabel: string
  datePreset: DatePresetKey
  isCustomDateRangeOpen: boolean
  isDateDropdownOpen: boolean
  onCustomDateRangeChange: (value: CustomDateRangeValue | null) => void
  onCustomDateRangeOpenChange: (isOpen: boolean) => void
  onDateDropdownOpenChange: (isOpen: boolean) => void
  onDatePresetChange: (key: DatePresetKey) => void
}

export function DateRangeDropdown({
  activeDateLabel,
  datePreset,
  isCustomDateRangeOpen,
  isDateDropdownOpen,
  onCustomDateRangeChange,
  onCustomDateRangeOpenChange,
  onDateDropdownOpenChange,
  onDatePresetChange
}: DateRangeDropdownProps) {
  return (
    <Dropdown
      isOpen={isDateDropdownOpen}
      onOpenChange={onDateDropdownOpenChange}>
      <Dropdown.Trigger>
        <Button variant="outline">
          <Icon icon="lucide:calendar-days" width={16} />
          {activeDateLabel}
          <Icon icon="lucide:chevron-down" width={16} />
        </Button>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Surface className={classNames.datePopover}>
          {isCustomDateRangeOpen ? (
            <div
              className={classNames.customDatePanel}
              onClick={event => event.stopPropagation()}>
              <Button
                variant="ghost"
                onPress={() => onCustomDateRangeOpenChange(false)}>
                <Icon icon="lucide:chevron-left" width={16} />
                Date presets
              </Button>
              <DateRangePicker
                defaultOpen
                aria-label="Schedule custom date range"
                className={classNames.fullWidth}
                endName="endDate"
                startName="startDate"
                onChange={onCustomDateRangeChange}>
                <DateField.Group fullWidth>
                  <DateField.Input slot="start">
                    {segment => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateRangePicker.RangeSeparator />
                  <DateField.Input slot="end">
                    {segment => <DateField.Segment segment={segment} />}
                  </DateField.Input>
                  <DateField.Suffix>
                    <DateRangePicker.Trigger>
                      <DateRangePicker.TriggerIndicator />
                    </DateRangePicker.Trigger>
                  </DateField.Suffix>
                </DateField.Group>
                <DateRangePicker.Popover>
                  <RangeCalendar aria-label="Schedule custom date range">
                    <RangeCalendar.Header>
                      <RangeCalendar.Heading />
                      <RangeCalendar.NavButton slot="previous" />
                      <RangeCalendar.NavButton slot="next" />
                    </RangeCalendar.Header>
                    <RangeCalendar.Grid>
                      <RangeCalendar.GridHeader>
                        {day => (
                          <RangeCalendar.HeaderCell>
                            {day}
                          </RangeCalendar.HeaderCell>
                        )}
                      </RangeCalendar.GridHeader>
                      <RangeCalendar.GridBody>
                        {date => <RangeCalendar.Cell date={date} />}
                      </RangeCalendar.GridBody>
                    </RangeCalendar.Grid>
                  </RangeCalendar>
                </DateRangePicker.Popover>
              </DateRangePicker>
            </div>
          ) : (
            <Dropdown.Menu aria-label="Date presets">
              {dateOptions.map(option => (
                <Dropdown.Item
                  key={option.key}
                  id={option.key}
                  textValue={option.label}
                  onPress={() => onDatePresetChange(option.key)}>
                  <span className={classNames.dateOptionLabel}>
                    {option.label}
                    {datePreset === option.key && (
                      <Icon icon="lucide:check" width={16} />
                    )}
                  </span>
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          )}
        </Surface>
      </Dropdown.Popover>
    </Dropdown>
  )
}
