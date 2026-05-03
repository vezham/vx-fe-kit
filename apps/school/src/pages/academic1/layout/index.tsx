import { Icon } from '@iconify/react'
import { Outlet } from '@tanstack/react-router'
import { ReactNode } from 'react'

import { forwardRef } from '@vezham/react-utils'
import {
  Button,
  Drawer,
  Dropdown,
  InputGroup,
  Label,
  ListBox,
  Separator,
  Surface,
  Tabs,
  TextField,
  Tooltip
} from '@vezham/react/v3'

import { Props, useProps } from './types'

const AcademicLayoutPage = forwardRef<'div', Props>((props, ref) => {
  const {
    Component,
    activeTabs,
    headerProps,
    sidebarProps,
    drawerProps,
    getBaseProps,
    getHeaderProps,
    getHeaderInnerProps,
    getHeaderLeftProps,
    getHeaderTabsDesktopProps,
    getHeaderRightProps,
    getHeaderTabsMobileProps,
    getShellProps,
    getSidebarRailProps,
    getContentProps,
    getContentSurfaceProps,
    getDrawerHeaderProps,
    getDrawerTitleProps,
    getDrawerBodyProps,
    getIconButtonProps,
    getButtonIconProps,
    getSearchFieldProps,
    getSearchIconProps,
    getPrimaryLabelProps,
    getDropdownLabelProps,
    getSidebarProps,
    getSidebarListProps,
    getSidebarItemProps,
    getSidebarIconProps,
    getSidebarLabelProps,
    getTabsScrollerProps,
    getSeparatorProps,
    getTabsListProps,
    getTabsTabProps
  } = useProps({
    ...props,
    ref
  })

  return (
    <Component {...getBaseProps()}>
      <Surface {...getHeaderProps()}>
        <Surface {...getHeaderInnerProps()}>
          <Surface {...getHeaderLeftProps()}>
            <HeaderIconTooltip label={headerProps.sidebarToggle.label}>
              <Button {...getIconButtonProps(headerProps.sidebarToggle)}>
                <Icon {...getButtonIconProps(headerProps.sidebarToggle.icon)} />
              </Button>
            </HeaderIconTooltip>

            {headerProps.leftActions.map(action => (
              <HeaderIconTooltip key={action.key} label={action.label}>
                <Button {...getIconButtonProps(action)}>
                  <Icon {...getButtonIconProps(action.icon)} />
                </Button>
              </HeaderIconTooltip>
            ))}

            {activeTabs.length ? (
              <Surface {...getHeaderTabsDesktopProps()}>
                <HeaderTabs
                  tabs={activeTabs}
                  selectedKey={headerProps.selectedTabKey}
                  onSelectionChange={headerProps.onTabSelectionChange}
                  getTabsScrollerProps={getTabsScrollerProps}
                  getTabsListProps={getTabsListProps}
                  getTabsTabProps={getTabsTabProps}
                />
              </Surface>
            ) : null}
          </Surface>

          <Surface {...getHeaderRightProps()}>
            {headerProps.searchAction ? (
              <>
                <TextField {...getSearchFieldProps(headerProps.searchAction)}>
                  <InputGroup>
                    <InputGroup.Prefix>
                      <Icon
                        {...getSearchIconProps(headerProps.searchAction.icon)}
                      />
                    </InputGroup.Prefix>
                    <InputGroup.Input
                      placeholder={headerProps.searchAction.label}
                    />
                  </InputGroup>
                </TextField>
                <Button {...getIconButtonProps(headerProps.searchAction)}>
                  <Icon
                    {...getButtonIconProps(headerProps.searchAction.icon)}
                  />
                </Button>
              </>
            ) : null}

            {headerProps.refreshAction ? (
              <HeaderIconTooltip label={headerProps.refreshAction.label}>
                <Button {...getIconButtonProps(headerProps.refreshAction)}>
                  <Icon
                    {...getButtonIconProps(headerProps.refreshAction.icon)}
                  />
                </Button>
              </HeaderIconTooltip>
            ) : null}

            {headerProps.menuActions.length ? (
              <MoreActions
                actions={headerProps.menuActions}
                getIconButtonProps={getIconButtonProps}
                getButtonIconProps={getButtonIconProps}
                getDropdownLabelProps={getDropdownLabelProps}
              />
            ) : null}

            {headerProps.primaryAction ? (
              <Button {...getIconButtonProps(headerProps.primaryAction, true)}>
                <Icon {...getButtonIconProps(headerProps.primaryAction.icon)} />
                <Label {...getPrimaryLabelProps()}>
                  {headerProps.primaryAction.label}
                </Label>
              </Button>
            ) : null}
          </Surface>
        </Surface>

        {activeTabs.length ? (
          <Surface {...getHeaderTabsMobileProps()}>
            <HeaderTabs
              tabs={activeTabs}
              selectedKey={headerProps.selectedTabKey}
              onSelectionChange={headerProps.onTabSelectionChange}
              getTabsScrollerProps={getTabsScrollerProps}
              getTabsListProps={getTabsListProps}
              getTabsTabProps={getTabsTabProps}
            />
          </Surface>
        ) : null}
      </Surface>

      <Surface {...getShellProps()}>
        <Surface {...getSidebarRailProps()}>
          <AcademicSidebar
            sidebarProps={sidebarProps}
            getSidebarProps={getSidebarProps}
            getSidebarListProps={getSidebarListProps}
            getSidebarItemProps={getSidebarItemProps}
            getSidebarIconProps={getSidebarIconProps}
            getSidebarLabelProps={getSidebarLabelProps}
          />
        </Surface>

        <Surface {...getContentProps()}>
          <Surface {...getContentSurfaceProps()}>
            <Outlet />
          </Surface>
        </Surface>
      </Surface>

      <Drawer {...drawerProps.root}>
        <Drawer.Content placement="left">
          <Drawer.Dialog {...drawerProps.dialog}>
            <Surface {...getDrawerHeaderProps()}>
              <Drawer.Header {...getDrawerTitleProps()}>Academic</Drawer.Header>

              <Button {...getIconButtonProps(drawerProps.closeAction)}>
                <Icon {...getButtonIconProps(drawerProps.closeAction.icon)} />
              </Button>
            </Surface>
            <Separator {...getSeparatorProps()} />
            <Drawer.Body {...getDrawerBodyProps()}>
              <AcademicSidebar
                sidebarProps={drawerProps.sidebar}
                getSidebarProps={getSidebarProps}
                getSidebarListProps={getSidebarListProps}
                getSidebarItemProps={getSidebarItemProps}
                getSidebarIconProps={getSidebarIconProps}
                getSidebarLabelProps={getSidebarLabelProps}
              />
            </Drawer.Body>
          </Drawer.Dialog>
        </Drawer.Content>
      </Drawer>
    </Component>
  )
})

function MoreActions({
  actions,
  getIconButtonProps,
  getButtonIconProps,
  getDropdownLabelProps
}: Pick<
  ReturnType<typeof useProps>,
  'getIconButtonProps' | 'getButtonIconProps' | 'getDropdownLabelProps'
> & {
  actions: ReturnType<typeof useProps>['headerProps']['menuActions']
}) {
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <HeaderIconTooltip label="More">
          <Button
            {...getIconButtonProps({
              key: 'more',
              label: 'More',
              icon: 'lucide:more-vertical'
            })}>
            <Icon {...getButtonIconProps('lucide:more-vertical')} />
          </Button>
        </HeaderIconTooltip>
      </Dropdown.Trigger>
      <Dropdown.Popover>
        <Dropdown.Menu>
          {actions.map(action =>
            action.key === 'export' ? (
              <Dropdown.SubmenuTrigger key={action.key}>
                <Dropdown.Item id={action.key} textValue={action.label}>
                  <Label {...getDropdownLabelProps()}>
                    <Icon {...getButtonIconProps(action.icon, true)} />
                    {action.label}
                  </Label>
                  <Dropdown.SubmenuIndicator />
                </Dropdown.Item>
                <Dropdown.Popover>
                  <Dropdown.Menu>
                    <Dropdown.Item
                      id="export-pdf"
                      textValue="Export as PDF"
                      onPress={action.onAction}>
                      <Label {...getDropdownLabelProps()}>
                        <Icon
                          {...getButtonIconProps('lucide:file-text', true)}
                        />
                        Export as PDF
                      </Label>
                    </Dropdown.Item>
                    <Dropdown.Item
                      id="export-excel"
                      textValue="Export as Excel"
                      onPress={action.onAction}>
                      <Label {...getDropdownLabelProps()}>
                        <Icon
                          {...getButtonIconProps(
                            'lucide:file-spreadsheet',
                            true
                          )}
                        />
                        Export as Excel
                      </Label>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown.Popover>
              </Dropdown.SubmenuTrigger>
            ) : (
              <Dropdown.Item
                key={action.key}
                id={action.key}
                textValue={action.label}
                onPress={action.onAction}>
                <Label {...getDropdownLabelProps()}>
                  <Icon {...getButtonIconProps(action.icon, true)} />
                  {action.label}
                </Label>
              </Dropdown.Item>
            )
          )}
        </Dropdown.Menu>
      </Dropdown.Popover>
    </Dropdown>
  )
}

function HeaderIconTooltip({
  children,
  label
}: {
  children: ReactNode
  label: string
}) {
  return (
    <Tooltip delay={0}>
      <Tooltip.Trigger>{children}</Tooltip.Trigger>
      <Tooltip.Content>{label}</Tooltip.Content>
    </Tooltip>
  )
}

function AcademicSidebar({
  sidebarProps,
  getSidebarProps,
  getSidebarListProps,
  getSidebarItemProps,
  getSidebarIconProps,
  getSidebarLabelProps
}: Pick<
  ReturnType<typeof useProps>,
  | 'sidebarProps'
  | 'getSidebarProps'
  | 'getSidebarListProps'
  | 'getSidebarItemProps'
  | 'getSidebarIconProps'
  | 'getSidebarLabelProps'
>) {
  return (
    <Surface {...getSidebarProps(sidebarProps)}>
      {!sidebarProps.hideToggle ? (
        <Button {...sidebarProps.toggleButtonProps}>
          <Icon {...getSidebarIconProps(sidebarProps.toggleIcon, false)} />
        </Button>
      ) : null}

      {sidebarProps.collapsed ? null : (
        <ListBox {...getSidebarListProps(sidebarProps)}>
          {sidebarProps.items.map(item => (
            <ListBox.Item
              key={item.key}
              {...getSidebarItemProps(item, sidebarProps)}>
              <Icon {...getSidebarIconProps(item.icon, item.isActive)} />
              <Label {...getSidebarLabelProps(item.isActive)}>
                {item.title}
              </Label>
            </ListBox.Item>
          ))}
        </ListBox>
      )}
    </Surface>
  )
}

function HeaderTabs({
  tabs,
  selectedKey,
  onSelectionChange,
  getTabsScrollerProps,
  getTabsListProps,
  getTabsTabProps
}: Pick<
  ReturnType<typeof useProps>,
  'getTabsScrollerProps' | 'getTabsListProps' | 'getTabsTabProps'
> & {
  tabs: ReturnType<typeof useProps>['activeTabs']
  selectedKey?: string
  onSelectionChange: ReturnType<
    typeof useProps
  >['headerProps']['onTabSelectionChange']
}) {
  return (
    <Surface {...getTabsScrollerProps()}>
      <Tabs selectedKey={selectedKey} onSelectionChange={onSelectionChange}>
        <Tabs.ListContainer>
          <Tabs.List {...getTabsListProps()}>
            {tabs.map((tab, index) => (
              <Tabs.Tab key={tab.key} {...getTabsTabProps(tab)}>
                {index > 0 ? <Tabs.Separator /> : null}
                {tab.title}
                <Tabs.Indicator />
              </Tabs.Tab>
            ))}
          </Tabs.List>
        </Tabs.ListContainer>
      </Tabs>
    </Surface>
  )
}

AcademicLayoutPage.displayName = 'AcademicLayoutPage'

export default AcademicLayoutPage
