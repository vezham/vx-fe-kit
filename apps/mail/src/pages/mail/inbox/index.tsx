import { Icon } from '@iconify/react'
import React from 'react'

import {
  Button,
  Checkbox,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger
} from '@vezham/react/v2'

import { useInboxQuery } from '../../../utils/queryOptions'
import {
  Email,
  EmailListProps,
  EmailListSectionProps,
  FilterOption
} from './types'

export function MailListSection({
  title,
  emails,
  onEmailClick,
  selectedEmails,
  onEmailSelect
}: EmailListSectionProps) {
  return (
    <div className="mb-4">
      <h3 className="text-tiny text-default-600 border-default-100 mb-1 h-8 border-b px-2 font-medium">
        {title}
      </h3>

      <div>
        {emails.map(email => (
          <div
            key={email.id}
            className={`border-default-100 hover:bg-default-50 flex items-center border-b ${
              selectedEmails.has(email.id) ? 'bg-default-100' : ''
            }`}>
            <div className="flex items-center py-2 pl-2">
              <Checkbox
                isSelected={selectedEmails.has(email.id)}
                onValueChange={isSelected =>
                  onEmailSelect(email.id, isSelected)
                }
                size="sm"
                onClick={e => e.stopPropagation()}
              />
            </div>

            <div
              className="flex min-w-0 flex-1 cursor-pointer items-center px-2 py-2"
              onClick={() => onEmailClick(email)}>
              <div className="flex w-full items-center">
                {email.isUnread && (
                  <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
                )}

                <span
                  className={`text-default-800 mr-2 w-[150px] truncate text-sm font-medium ${
                    email.isUnread ? 'font-semibold' : ''
                  }`}>
                  {email.sender}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-default-500 truncate text-xs">
                    {email.subject}
                    {email.preview && (
                      <span className="text-default-400 ml-1">
                        {email.preview}
                      </span>
                    )}
                  </p>
                </div>

                <div className="ml-4 flex items-center">
                  {email.hasAttachment && (
                    <Icon
                      icon="lucide:paperclip"
                      className="text-default-400 mr-1"
                      width={14}
                    />
                  )}
                  <span className="text-default-400 text-xs whitespace-nowrap">
                    {email.formattedDate}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export function MailList({ emails, onEmailClick }: EmailListProps) {
  const [selectedEmails, setSelectedEmails] = React.useState<Set<string>>(
    new Set()
  )

  const { view, setView } = useInboxQuery()
  const filterOption: FilterOption = view

  const allEmails = React.useMemo(() => {
    return [
      ...emails.lastWeek,
      ...emails.lastMonth,
      ...emails.january,
      ...emails.december,
      ...emails.november
    ]
  }, [emails])

  const handleEmailSelect = (emailId: string, isSelected: boolean) => {
    const newSelected = new Set(selectedEmails)

    if (isSelected) {
      newSelected.add(emailId)
    } else {
      newSelected.delete(emailId)
    }

    setSelectedEmails(newSelected)
  }

  const handleSelectAll = () => {
    if (selectedEmails.size === allEmails.length) {
      setSelectedEmails(new Set())
    } else {
      const newSelected = new Set<string>()
      allEmails.forEach(email => newSelected.add(email.id))
      setSelectedEmails(newSelected)
    }
  }

  const filteredEmails = React.useMemo(() => {
    if (filterOption === 'all') return emails

    const filterFn = (email: Email) => {
      if (filterOption === 'read') return !email.isUnread
      if (filterOption === 'unread') return email.isUnread
      return false
    }

    return {
      lastWeek: emails.lastWeek.filter(filterFn),
      lastMonth: emails.lastMonth.filter(filterFn),
      january: emails.january.filter(filterFn),
      december: emails.december.filter(filterFn),
      november: emails.november.filter(filterFn)
    }
  }, [emails, filterOption])

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      {selectedEmails.size > 0 ? (
        <div className="bg-default-50 flex items-center gap-2 px-5 py-2">
          <Checkbox
            isSelected={
              selectedEmails.size === allEmails.length && allEmails.length > 0
            }
            isIndeterminate={
              selectedEmails.size > 0 && selectedEmails.size < allEmails.length
            }
            onValueChange={handleSelectAll}
            size="sm"
          />

          <Button isIconOnly variant="light" size="sm">
            <Icon icon="lucide:archive" width={18} />
          </Button>

          <Button isIconOnly variant="light" size="sm">
            <Icon icon="lucide:trash" width={18} />
          </Button>

          <Button isIconOnly variant="light" size="sm">
            <Icon icon="lucide:mail-open" width={18} />
          </Button>

          <Button isIconOnly variant="light" size="sm">
            <Icon icon="lucide:clock" width={18} />
          </Button>

          <Button isIconOnly variant="light" size="sm">
            <Icon icon="lucide:tag" width={18} />
          </Button>

          <Button isIconOnly variant="light" size="sm">
            <Icon icon="lucide:more-horizontal" width={18} />
          </Button>

          <span className="text-default-600 ml-auto text-sm">
            {selectedEmails.size} selected
          </span>
        </div>
      ) : (
        <div className="flex items-center px-5 py-2">
          <Checkbox
            isSelected={
              selectedEmails.size === allEmails.length && allEmails.length > 0
            }
            onValueChange={handleSelectAll}
            size="sm"
          />

          <Dropdown>
            <DropdownTrigger>
              <Button
                variant="light"
                size="sm"
                className="ml-2"
                endContent={<Icon icon="lucide:chevron-down" width={16} />}>
                {filterOption === 'all'
                  ? 'All'
                  : filterOption === 'read'
                    ? 'Read'
                    : filterOption === 'unread'
                      ? 'Unread'
                      : 'None'}
              </Button>
            </DropdownTrigger>

            <DropdownMenu
              aria-label="Filter options"
              selectedKeys={[filterOption]}
              selectionMode="single"
              onAction={key => setView(key as FilterOption)}>
              <DropdownItem key="all">All</DropdownItem>
              <DropdownItem key="read">Read</DropdownItem>
              <DropdownItem key="unread">Unread</DropdownItem>
              <DropdownItem key="none">None</DropdownItem>
            </DropdownMenu>
          </Dropdown>

          <div className="ml-auto">
            <Button isIconOnly variant="light" size="sm">
              <Icon icon="lucide:tag" width={18} />
            </Button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-y-2 overflow-auto px-3 py-2">
        {filteredEmails.lastWeek.length > 0 && (
          <MailListSection
            title="Last 7 days"
            emails={filteredEmails.lastWeek}
            onEmailClick={onEmailClick}
            selectedEmails={selectedEmails}
            onEmailSelect={handleEmailSelect}
          />
        )}

        {filteredEmails.lastMonth.length > 0 && (
          <MailListSection
            title="Last 30 days"
            emails={filteredEmails.lastMonth}
            onEmailClick={onEmailClick}
            selectedEmails={selectedEmails}
            onEmailSelect={handleEmailSelect}
          />
        )}

        {filteredEmails.january.length > 0 && (
          <MailListSection
            title="January"
            emails={filteredEmails.january}
            onEmailClick={onEmailClick}
            selectedEmails={selectedEmails}
            onEmailSelect={handleEmailSelect}
          />
        )}

        {filteredEmails.december.length > 0 && (
          <MailListSection
            title="December"
            emails={filteredEmails.december}
            onEmailClick={onEmailClick}
            selectedEmails={selectedEmails}
            onEmailSelect={handleEmailSelect}
          />
        )}

        {filteredEmails.november.length > 0 && (
          <MailListSection
            title="November"
            emails={filteredEmails.november}
            onEmailClick={onEmailClick}
            selectedEmails={selectedEmails}
            onEmailSelect={handleEmailSelect}
          />
        )}
      </div>
    </div>
  )
}
