'use client'

import {
  Button,
  Card,
  CardBody,
  cn,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Spacer,
  useDisclosure
} from '@heroui/react'
import { Icon } from '@iconify/react'
import * as React from 'react'
import { role, roleOptions } from './data'
import TableUI from './table'

import { iconSizeClasses, teamSettingStyles } from './variant'

import { TeamSettingCardProps } from './types'

const icons = {
  success: 'lucide:check-circle',
  danger: 'lucide:alert-circle'
}

const colors = {
  success: 'text-green-600',
  danger: 'text-red-600'
}

const TeamSetting = React.forwardRef<HTMLDivElement, TeamSettingCardProps>(
  ({ className, endContent, ...rest }, ref) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [isAddMoreOpen, setIsAddMoreOpen] = React.useState(false)
    return (
      <>
        <div
          {...rest}
          ref={ref}
          className={cn(teamSettingStyles.wrapper, className)}>
          {/* Title */}
          <div className={teamSettingStyles.titleContainer}>
            <div className={teamSettingStyles.titleTab}>
              <p className={teamSettingStyles.titleText}>Team</p>
              <p className={teamSettingStyles.descriptionText}>
                Manage and invite Team Members.
              </p>
            </div>
            <div className={teamSettingStyles.endContent}>
              {endContent && endContent(onOpen)}
              <Modal isOpen={isOpen} onClose={onClose}>
                <ModalContent>
                  {onClose => (
                    <>
                      <ModalHeader
                        className={teamSettingStyles.modalHeader}></ModalHeader>
                      <ModalBody>
                        <div
                          className={teamSettingStyles.modalBodyTopContainer}>
                          <p className={teamSettingStyles.modalBodyTitleText}>
                            Invite new members by email address
                          </p>
                          <Button
                            className={teamSettingStyles.inviteButton}
                            endContent={
                              <Icon
                                className={teamSettingStyles.inviteButtonIcon}
                                icon="solar:link-linear"
                              />
                            }
                            radius="md"
                            size="sm">
                            Invite Link
                          </Button>
                        </div>
                        <Divider />

                        <div>
                          {/* Email Address */}
                          <div
                            className={teamSettingStyles.emailAndRoleContainer}>
                            <div className={teamSettingStyles.inputGroup}>
                              <p className={teamSettingStyles.inputLabelText}>
                                Email Address
                              </p>
                              <Input
                                className={teamSettingStyles.inputField}
                                classNames={{
                                  inputWrapper: teamSettingStyles.inputWrapper
                                }}
                                placeholder="e.g kate.moore@acme.com"
                              />
                            </div>
                            <div className={teamSettingStyles.inputGroup}>
                              <p className={teamSettingStyles.inputLabelText}>
                                Role
                              </p>
                              <Select
                                className={teamSettingStyles.inputField}
                                classNames={{
                                  trigger: teamSettingStyles.inputWrapper
                                }}
                                defaultSelectedKeys={['member']}>
                                {roleOptions.map(roleOption => (
                                  <SelectItem key={roleOption.value}>
                                    {roleOption.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </div>
                          <Button
                            className={teamSettingStyles.addMoreButton}
                            onPress={() => setIsAddMoreOpen(true)}
                            endContent={
                              <Icon
                                className={teamSettingStyles.addMoreButtonIcon}
                                icon="solar:add-circle-linear"
                              />
                            }
                            radius="md"
                            size="sm">
                            Add more
                          </Button>
                        </div>

                        <Divider />
                        <div>
                          <div className={teamSettingStyles.modalFooter}>
                            <p className={teamSettingStyles.learnMoreText}>
                              Learn more about{' '}
                              <span className={teamSettingStyles.learnMoreLink}>
                                Team Members
                              </span>
                              <Icon
                                className={teamSettingStyles.learnMoreIcon}
                                icon="material-symbols-light:arrow-outward-rounded"
                              />
                            </p>
                            <Button
                              className={teamSettingStyles.sendInviteButton}
                              radius="md"
                              size="sm">
                              Send Invite
                            </Button>
                          </div>
                        </div>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
              <Modal
                isOpen={isAddMoreOpen}
                onClose={() => setIsAddMoreOpen(false)}>
                <ModalContent>
                  {onClose => (
                    <>
                      <ModalHeader>Add More Members</ModalHeader>
                      <ModalBody>
                        <div>
                          {/* Email Address */}
                          <div
                            className={teamSettingStyles.emailAndRoleContainer}>
                            <div className={teamSettingStyles.inputGroup}>
                              <p className={teamSettingStyles.inputLabelText}>
                                Email Address
                              </p>
                              <Input
                                className={teamSettingStyles.inputField}
                                classNames={{
                                  inputWrapper: teamSettingStyles.inputWrapper
                                }}
                                placeholder="e.g kate.moore@acme.com"
                              />
                            </div>
                            <div className={teamSettingStyles.inputGroup}>
                              <p className={teamSettingStyles.inputLabelText}>
                                Role
                              </p>
                              <Select
                                className={teamSettingStyles.inputField}
                                classNames={{
                                  trigger: teamSettingStyles.inputWrapper
                                }}
                                defaultSelectedKeys={['member']}>
                                {roleOptions.map(roleOption => (
                                  <SelectItem key={roleOption.value}>
                                    {roleOption.label}
                                  </SelectItem>
                                ))}
                              </Select>
                            </div>
                          </div>
                        </div>
                        <Divider />
                        <Button
                          className={teamSettingStyles.doneButton}
                          size="sm"
                          onPress={() => setIsAddMoreOpen(false)}>
                          Add
                        </Button>
                      </ModalBody>
                    </>
                  )}
                </ModalContent>
              </Modal>
            </div>
          </div>
        </div>
        <div className={teamSettingStyles.tableSectionContainer}>
          <div className={teamSettingStyles.tableWrapper}>
            <Card className={teamSettingStyles.tableCard} shadow="none">
              <CardBody>
                <div>
                  {/* <Button onPress={onOpen} color="default" className="w-auto  text-white hover:bg-gray-600" variant="solid" startContent={<Icon icon="solar:user-plus-bold" className={iconSizeClasses} />}> Invite User </Button> */}
                </div>
                <TableUI />
              </CardBody>
            </Card>
          </div>
        </div>
        <Spacer y={4} />
        {/* Team management table */}
        <Card className={teamSettingStyles.roleCard} shadow="none">
          <CardBody className={teamSettingStyles.roleCardBody}>
            <div className={teamSettingStyles.roleCardHeader}>
              <p className={teamSettingStyles.roleCardTitle}>
                Role Permissions
              </p>
              <p className={teamSettingStyles.roleCardDescription}>
                Configure what each role can access and modify
              </p>
            </div>
            <Spacer y={3} />
            <div className={teamSettingStyles.rolePermissionsGrid}>
              {role.map(role => (
                <div
                  key={role.name}
                  className={teamSettingStyles.rolePermissionsItem}>
                  <h4 className={teamSettingStyles.rolePermissionsTitle}>
                    {role.name}
                  </h4>
                  <div className={teamSettingStyles.rolePermissionsList}>
                    {role.permissions.map((perm, idx) => (
                      <div
                        key={idx}
                        className={teamSettingStyles.rolePermission}>
                        <Icon
                          icon={icons[perm.type as keyof typeof icons]}
                          className={cn(
                            iconSizeClasses,
                            colors[perm.type as keyof typeof colors]
                          )}
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
TeamSetting.displayName = 'TeamSetting'

export default TeamSetting
