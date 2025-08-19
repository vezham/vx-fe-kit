'use client'

import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  Spacer,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow
} from '@heroui/react'
import { Icon } from '@iconify/react'

import React from 'react'
import { colors, icons, members, roles } from './data'
import { TeamProps } from './types'
import {
  actionButtonClasses,
  cardClasses,
  cardHeaderClasses,
  iconSizeClasses,
  roleCardHeader,
  roleChipClasses,
  statusChipClasses,
  tableHeaderClasses,
  tableRowClasses
} from './variant'

const TeamMembers = React.forwardRef<HTMLDivElement, TeamProps>(
  ({ isDarkMode }, ref) => {
    return (
      <>
        {/* Team Members Table */}
        <Card ref={ref} className={cardClasses(isDarkMode)}>
          <CardHeader className={cardHeaderClasses}>
            <div>
              <h4 className="text-lg font-semibold">Team Members</h4>
              <p className="text-default-500 text-sm">
                Manage user access and permissions
              </p>
            </div>
            <Button
              color="default"
              className="w-auto bg-black text-white hover:bg-gray-600"
              variant="solid"
              startContent={
                <Icon icon="solar:user-plus-bold" className={iconSizeClasses} />
              }>
              Invite User
            </Button>
          </CardHeader>

          <CardBody>
            <Table
              removeWrapper
              aria-label="Team members table"
              classNames={{
                thead: tableHeaderClasses(isDarkMode),
                th: tableHeaderClasses(isDarkMode),
                tr: tableRowClasses(isDarkMode)
              }}>
              <TableHeader>
                <TableColumn>User</TableColumn>
                <TableColumn>Role</TableColumn>
                <TableColumn>Status</TableColumn>
                <TableColumn>Last Login</TableColumn>
                <TableColumn align="end">Actions</TableColumn>
              </TableHeader>

              <TableBody>
                {members.map(m => (
                  <TableRow key={m.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar name={m.initials} size="sm" />
                        <div>
                          <p className="text-sm font-medium">{m.name}</p>
                          <p className="text-default-500 text-xs">{m.email}</p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell>
                      {/* Role Chip */}
                      <Chip
                        size="sm"
                        variant="flat"
                        className={roleChipClasses(isDarkMode)}>
                        {m.role}
                      </Chip>
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

                    <TableCell>{m.lastLogin}</TableCell>

                    <TableCell>
                      <div className={actionButtonClasses}>
                        <Button
                          isIconOnly
                          variant="light"
                          size="sm"
                          aria-label="Edit">
                          <Icon
                            icon="solar:pen-bold"
                            className={iconSizeClasses}
                          />
                        </Button>
                        <Button
                          isIconOnly
                          variant="light"
                          color="danger"
                          size="sm"
                          aria-label="Delete">
                          <Icon
                            icon="solar:trash-bin-trash-bold"
                            className={iconSizeClasses}
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardBody>
        </Card>

        <Spacer y={4} />

        {/* Role Permissions */}
        <Card className={cardClasses(isDarkMode)}>
          <CardHeader className={roleCardHeader}>
            <h4 className="text-lg font-semibold">Role Permissions</h4>
            <p className="text-default-500 text-sm">
              Configure what each role can access and modify
            </p>
          </CardHeader>

          <CardBody className="px-6 pb-6">
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
      </>
    )
  }
)

TeamMembers.displayName = 'TeamMembers'

export default TeamMembers
