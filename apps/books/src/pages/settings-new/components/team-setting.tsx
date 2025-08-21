'use client'

import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  cn,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@heroui/react'
import { Icon } from '@iconify/react'
import * as React from 'react'

import {
  actionButtonClasses,
  iconSizeClasses,
  statusChipClasses
} from './variant'

interface TeamSettingCardProps {
  className?: string
}

const members = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john@company.com',
    role: 'Admin',
    status: 'Active',
    lastLogin: '2024-01-29',
    initials: 'JD',
    statusColor: 'success'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane@company.com',
    role: 'Accountant',
    status: 'Active',
    lastLogin: '2024-01-28',
    initials: 'JS',
    statusColor: 'success'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    email: 'mike@company.com',
    role: 'Viewer',
    status: 'Pending',
    lastLogin: 'Never',
    initials: 'MJ',
    statusColor: 'secondary'
  }
]

const roles = [
  {
    name: 'Admin',
    permissions: [
      { label: 'Full system access', type: 'success' },
      { label: 'Manage users', type: 'success' },
      { label: 'Financial data access', type: 'success' },
      { label: 'System configuration', type: 'success' }
    ]
  },
  {
    name: 'Accountant',
    permissions: [
      { label: 'Financial data access', type: 'success' },
      { label: 'Create/edit transactions', type: 'success' },
      { label: 'Generate reports', type: 'success' },
      { label: 'No user management', type: 'danger' }
    ]
  },
  {
    name: 'Viewer',
    permissions: [
      { label: 'View financial data', type: 'success' },
      { label: 'View reports', type: 'success' },
      { label: 'No edit permissions', type: 'danger' },
      { label: 'No user management', type: 'danger' }
    ]
  }
]

const icons = {
  success: 'lucide:check-circle',
  danger: 'lucide:alert-circle'
}

const colors = {
  success: 'text-green-600',
  danger: 'text-red-600'
}

const TeamSetting = React.forwardRef<HTMLDivElement, TeamSettingCardProps>(
  ({ className, ...rest }, ref) => (
    <div {...rest} ref={ref} className={cn('p-2', className)}>
      {/* Title */}

      {/* Invite */}
      <Card className="border-default-200 border bg-transparent" shadow="none">
        <CardBody className="px-4">
          <div className="flex items-center justify-between pb-3">
            <div>
              <p className="text-default-700 text-base font-medium">Team</p>
              <p className="text-default-400 mt-1 text-sm font-normal">
                Manage and invite Team Members.
              </p>
            </div>
            <div>
              <Button
                color="default"
                className="w-auto text-white hover:bg-gray-600"
                variant="solid"
                startContent={
                  <Icon
                    icon="solar:user-plus-bold"
                    className={iconSizeClasses}
                  />
                }>
                Invite User
              </Button>
            </div>
          </div>

          <Spacer y={3} />
          <div className="py-2">
            {/* Email Address */}
            <div className="">
              <Table
                removeWrapper
                aria-label="Team members table"
                classNames={{
                  th: 'bg-transparent',
                  tr: 'border-b border-default'
                }}>
                <TableHeader>
                  <TableColumn>USER</TableColumn>
                  <TableColumn>ROLE</TableColumn>
                  <TableColumn>STATUS</TableColumn>
                  <TableColumn>LAST LOGIN</TableColumn>
                  <TableColumn align="end">ACTIONS</TableColumn>
                </TableHeader>

                <TableBody>
                  {members.map(m => (
                    <TableRow key={m.id} className="border-default border-b">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar name={m.initials} size="md" />
                          <div>
                            <p className="text-sm font-medium">{m.name}</p>
                            <p className="text-default-500 text-xs">
                              {m.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>

                      <TableCell>
                        {/* Role Chip */}
                        <Button size="sm" variant="bordered">
                          {m.role}
                        </Button>
                      </TableCell>

                      <TableCell>
                        {/* Status Chip */}
                        <Chip
                          size="sm"
                          variant="flat"
                          className={
                            m.status === 'Active'
                              ? statusChipClasses.active
                              : m.status === 'Pending'
                                ? statusChipClasses.pending
                                : statusChipClasses.inactive
                          }>
                          {m.status}
                        </Chip>
                      </TableCell>

                      <TableCell>
                        {' '}
                        <p className="text-default-500 text-sm">
                          {m.lastLogin}
                        </p>
                      </TableCell>

                      <TableCell>
                        <div className={actionButtonClasses}>
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            aria-label="Edit">
                            <Icon
                              icon="lucide:square-pen"
                              className={iconSizeClasses}
                            />
                          </Button>
                          <Button
                            isIconOnly
                            variant="light"
                            size="sm"
                            aria-label="Delete">
                            <Icon
                              icon="lucide:trash-2"
                              className={iconSizeClasses}
                            />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
          <Spacer y={3} />
        </CardBody>
      </Card>
      <Spacer y={4} />
      {/* Team management table */}
      <Card className="border-default-200 border bg-transparent" shadow="none">
        <CardBody className="px-4">
          <div className="pb-3">
            <p className="text-default-700 text-base font-medium">
              Role Permissions
            </p>
            <p className="text-default-400 mt-1 text-sm font-normal">
              Configure what each role can access and modify
            </p>
          </div>
          <Spacer y={3} />
          <div className="grid gap-6 md:grid-cols-3">
            {roles.map(role => (
              <div key={role.name} className="space-y-3">
                <h4 className="font-medium">{role.name}</h4>
                <div className="space-y-2 text-sm">
                  {role.permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Icon
                        icon={icons[perm.type]}
                        className={`${iconSizeClasses} ${colors[perm.type]}`}
                      />
                      <span>{perm.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>
    </div>
  )
)

TeamSetting.displayName = 'TeamSetting'

export default TeamSetting
