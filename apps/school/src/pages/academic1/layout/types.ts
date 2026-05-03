import { useLocation, useNavigate } from '@tanstack/react-router'
import { Key } from 'react'
import { useEffect, useMemo, useState } from 'react'

import { ReactRef, useDOMRef } from '@vezham/react-utils'
import {
  HTMLHeroUIProps,
  PropGetter,
  mapPropsVariants
} from '@vezham/react-utils'
import { SlotsToClasses, cn } from '@vezham/react-utils'

import {
  createExcludedPageKeys,
  createLabelsByPageKey,
  defaultLeftActions,
  defaultRightActions,
  sidebarItems
} from './data'
import { tvProps, tvSlots, tva } from './variant'

type AcademicMenuItem = {
  key: string
  title: string
  href: string
  icon: string
  children?: AcademicMenuItem[]
}

type AcademicTab = {
  key: string
  title: string
  href: string
}

type ActionItem = {
  key: string
  label: string
  icon: string
  onAction?: () => void
  isVisible?: (pageKey: string) => boolean
  kind?: 'search' | 'refresh' | 'menu' | 'primary'
}

type HeaderActionsConfig = {
  leftActions?: ActionItem[]
  rightActions?: ActionItem[]
}

type SidebarViewItem = AcademicMenuItem & {
  isActive: boolean
}

type SidebarProps = {
  collapsed: boolean
  hideToggle: boolean
  items: SidebarViewItem[]
  selectedKeys: Set<string>
  toggleIcon: string
  toggleButtonProps: {
    variant: 'ghost'
    className: string
    'aria-label': string
    onPress: () => void
  }
  onAction: (key: Key) => void
}

interface Props extends tvProps, HTMLHeroUIProps<'div'> {
  ref?: ReactRef<HTMLDivElement | null>
  classNames?: SlotsToClasses<tvSlots>
  actions?: HeaderActionsConfig
}

const useProps = (originalProps: Props) => {
  const [props, variantProps] = mapPropsVariants(originalProps, tva.variantKeys)

  const { as, id, ref, className, classNames, actions, ...otherProps } = props

  const Component = as || 'div'
  const domRef = useDOMRef(ref)
  const slots = tva(variantProps)
  const location = useLocation()
  const navigate = useNavigate()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(true)

  const activeTabs = getActiveTabs(location.pathname)
  const activePageKey = getActivePageKey(location.pathname)
  const activeSidebarKey = getActiveSidebarKey(location.pathname)
  const selectedTabKey = activeTabs.find(
    tab =>
      location.pathname === tab.href ||
      location.pathname.startsWith(`${tab.href}/`)
  )?.key

  const rightActions = useMemo(
    () => getPageRightActions(activePageKey),
    [activePageKey]
  )
  const resolvedLeftActions = mergeActions(
    defaultLeftActions,
    actions?.leftActions
  )
  const resolvedRightActions = mergeActions(
    defaultRightActions,
    actions?.rightActions ?? rightActions
  )
  const visibleRightActions = resolvedRightActions.filter(
    action => !action.isVisible || action.isVisible(activePageKey)
  )
  const sidebarViewItems = sidebarItems.map(item => ({
    ...item,
    isActive:
      location.pathname === item.href ||
      location.pathname.startsWith(`${item.href}/`)
  }))

  const onToggleSidebar = () => {
    if (window.matchMedia('(min-width: 768px)').matches) {
      setCollapsed(isCollapsed => !isCollapsed)
    } else {
      setIsSidebarOpen(true)
    }
  }

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '\\' || (!event.metaKey && !event.ctrlKey)) {
        return
      }

      event.preventDefault()
      onToggleSidebar()
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const onSidebarAction = (key: Key, onNavigate?: () => void) => {
    const item = sidebarItems.find(sidebarItem => sidebarItem.key === key)

    if (item) {
      navigate({ to: item.href })
      onNavigate?.()
    }
  }

  const getBaseProps: PropGetter = () => ({
    id,
    ref: domRef,
    className: slots.base({ class: cn(classNames?.base, className) }),
    ...otherProps
  })

  const getHeaderProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.header({ class: classNames?.header })
  })

  const getSeparatorProps: PropGetter = () => ({
    className: slots.separator({ class: classNames?.separator })
  })

  const getHeaderInnerProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.header_inner({ class: classNames?.header_inner })
  })

  const getHeaderLeftProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.header_left({ class: classNames?.header_left })
  })

  const getHeaderTabsDesktopProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.header_tabs_desktop({
      class: classNames?.header_tabs_desktop
    })
  })

  const getHeaderRightProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.header_right({ class: classNames?.header_right })
  })

  const getHeaderTabsMobileProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.header_tabs_mobile({
      class: classNames?.header_tabs_mobile
    })
  })

  const getShellProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.shell({ class: classNames?.shell })
  })

  const getSidebarRailProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.sidebar_rail({
      class: cn(
        classNames?.sidebar_rail,
        collapsed && slots.sidebar_rail_closed()
      )
    })
  })

  const getContentProps: PropGetter = () => ({
    variant: 'transparent',
    className: slots.content({ class: classNames?.content })
  })

  const getContentSurfaceProps: PropGetter = () => ({
    className: slots.content_surface({ class: classNames?.content_surface })
  })

  const getDrawerHeaderProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.drawer_header({ class: classNames?.drawer_header })
  })

  const getDrawerTitleProps: PropGetter = () => ({
    className: slots.drawer_title({ class: classNames?.drawer_title })
  })

  const getDrawerBodyProps: PropGetter = () => ({
    className: slots.drawer_body({ class: classNames?.drawer_body })
  })

  const getIconButtonProps = (action: ActionItem, isPrimary = false) => ({
    variant: isPrimary ? ('primary' as const) : ('ghost' as const),
    isIconOnly: !isPrimary,
    className: isPrimary
      ? slots.primary_button({ class: classNames?.primary_button })
      : action.kind === 'search'
        ? slots.search_button({ class: classNames?.search_button })
        : slots.icon_button({ class: classNames?.icon_button }),
    'aria-label': action.label,
    onPress: action.onAction
  })

  const getButtonIconProps = (icon: string, isInline = false) => ({
    icon,
    width: isInline ? 16 : 18,
    className: isInline
      ? slots.inline_icon({ class: classNames?.inline_icon })
      : undefined
  })

  const getSearchFieldProps = (action: ActionItem) => ({
    'aria-label': action.label,
    className: slots.search_field({ class: classNames?.search_field })
  })

  const getSearchIconProps = (icon: string) => ({
    icon,
    className: slots.search_icon({ class: classNames?.search_icon })
  })

  const getPrimaryLabelProps: PropGetter = () => ({
    className: slots.primary_label({ class: classNames?.primary_label })
  })

  const getDropdownLabelProps: PropGetter = () => ({
    className: slots.dropdown_label({ class: classNames?.dropdown_label })
  })

  const getSidebarProps = (sidebar: SidebarProps) => ({
    variant: 'transparent' as const,
    className: sidebar.collapsed
      ? slots.sidebar_collapsed({ class: classNames?.sidebar_collapsed })
      : slots.sidebar({ class: classNames?.sidebar })
  })

  const getSidebarListProps = (sidebar: SidebarProps) => ({
    'aria-label': 'Academic navigation',
    selectionMode: 'single' as const,
    selectedKeys: sidebar.selectedKeys,
    onAction: sidebar.onAction,
    onSelectionChange: (keys: Set<Key> | 'all') => {
      if (keys === 'all') {
        return
      }

      const selectedKey = Array.from(keys)[0]

      if (selectedKey) {
        sidebar.onAction(selectedKey)
      }
    },
    className: slots.sidebar_list({ class: classNames?.sidebar_list })
  })

  const getSidebarItemProps = (
    item: SidebarViewItem,
    sidebar?: SidebarProps
  ) => ({
    id: item.key,
    textValue: item.title,
    onPress: () => sidebar?.onAction(item.key),
    className: item.isActive
      ? slots.sidebar_item_active({ class: classNames?.sidebar_item_active })
      : slots.sidebar_item({ class: classNames?.sidebar_item })
  })

  const getSidebarIconProps = (icon: string, isActive: boolean) => ({
    icon,
    width: 18,
    className: isActive
      ? slots.sidebar_icon_active({ class: classNames?.sidebar_icon_active })
      : slots.sidebar_icon({ class: classNames?.sidebar_icon })
  })

  const getSidebarLabelProps = (isActive: boolean) => ({
    className: isActive
      ? slots.sidebar_label_active({ class: classNames?.sidebar_label_active })
      : slots.sidebar_label({ class: classNames?.sidebar_label })
  })

  const getTabsScrollerProps: PropGetter = () => ({
    variant: 'transparent' as const,
    className: slots.tabs_scroller({ class: classNames?.tabs_scroller })
  })

  const getTabsListProps: PropGetter = () => ({
    'aria-label': 'Academic sub navigation',
    className: slots.tabs_list({ class: classNames?.tabs_list })
  })

  const getTabsTabProps = (tab: AcademicTab) => ({
    id: tab.key,
    className: slots.tabs_tab({ class: classNames?.tabs_tab })
  })

  const sidebarProps: SidebarProps = {
    collapsed,
    hideToggle: true,
    items: sidebarViewItems,
    selectedKeys: new Set([activeSidebarKey]),
    toggleIcon: collapsed ? 'lucide:chevron-right' : 'lucide:chevron-left',
    toggleButtonProps: {
      variant: 'ghost' as const,
      className: slots.sidebar_toggle({ class: classNames?.sidebar_toggle }),
      'aria-label': collapsed
        ? 'Expand academic navigation'
        : 'Collapse academic navigation',
      onPress: () => setCollapsed(isCollapsed => !isCollapsed)
    },
    onAction: key => onSidebarAction(key)
  }

  const drawerSidebarProps: SidebarProps = {
    ...sidebarProps,
    collapsed: false,
    hideToggle: true,
    onAction: key => onSidebarAction(key, () => setIsSidebarOpen(false))
  }

  return {
    Component,
    domRef,
    slots,
    classNames,
    activeTabs,
    headerProps: {
      leftActions: resolvedLeftActions,
      searchAction: visibleRightActions.find(
        action => action.kind === 'search'
      ),
      primaryAction: visibleRightActions.find(
        action => action.kind === 'primary'
      ),
      refreshAction: visibleRightActions.find(
        action => action.kind === 'refresh'
      ),
      menuActions: visibleRightActions.filter(action => action.kind === 'menu'),
      sidebarToggle: {
        key: 'sidebar-toggle',
        label: collapsed
          ? 'Expand academic navigation'
          : 'Collapse academic navigation',
        icon: collapsed ? 'lucide:panel-left-open' : 'lucide:panel-left-close',
        onAction: onToggleSidebar
      },
      selectedTabKey,
      onTabSelectionChange: (key: Key) => {
        const tab = activeTabs.find(item => item.key === String(key))

        if (tab) {
          navigate({ to: tab.href })
        }
      }
    },
    sidebarProps,
    drawerProps: {
      root: {
        isOpen: isSidebarOpen,
        onOpenChange: setIsSidebarOpen
      },
      dialog: {
        className: slots.drawer_dialog({ class: classNames?.drawer_dialog })
      },
      closeAction: {
        key: 'close-sidebar',
        label: 'Close academic navigation',
        icon: 'lucide:x',
        onAction: () => setIsSidebarOpen(false)
      },
      sidebar: drawerSidebarProps
    },
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
    getSeparatorProps,
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
    getTabsListProps,
    getTabsTabProps
  }
}

function getPageRightActions(activePageKey: string): ActionItem[] {
  if (createExcludedPageKeys.has(activePageKey)) {
    return [
      {
        key: 'create',
        label: 'Create',
        icon: 'lucide:plus',
        kind: 'primary',
        isVisible: () => false
      }
    ]
  }

  const label = createLabelsByPageKey[activePageKey]

  return label
    ? [
        {
          key: 'create',
          label,
          icon: 'lucide:plus',
          kind: 'primary',
          onAction: () => dispatchCreateAction(activePageKey)
        }
      ]
    : []
}

function dispatchCreateAction(pageKey: string) {
  const eventByPageKey: Record<string, string> = {
    allclasses: 'academic:class:open',
    schedule: 'academic:schedule:open'
  }
  const eventName = eventByPageKey[pageKey]

  if (eventName) {
    window.dispatchEvent(new CustomEvent(eventName))
  }
}

function mergeActions(
  defaultActions: ActionItem[],
  pageActions?: ActionItem[]
) {
  if (!pageActions?.length) {
    return defaultActions
  }

  const actionMap = new Map(defaultActions.map(action => [action.key, action]))

  pageActions.forEach(action => {
    actionMap.set(action.key, {
      ...actionMap.get(action.key),
      ...action
    })
  })

  return Array.from(actionMap.values())
}

function getActiveTabs(pathname: string) {
  const activeItem = sidebarItems.find(
    item => pathname === item.href || pathname.startsWith(`${item.href}/`)
  )

  return (
    activeItem?.children?.map(child => ({
      key: child.key,
      title: child.title,
      href: child.href
    })) ?? []
  )
}

function getActivePageKey(pathname: string) {
  const allItems = sidebarItems.flatMap(item => [
    item,
    ...(item.children ?? [])
  ])
  const activeItem = allItems
    .filter(
      item => pathname === item.href || pathname.startsWith(`${item.href}/`)
    )
    .sort((a, b) => b.href.length - a.href.length)[0]

  return activeItem?.key ?? 'academic1'
}

function getActiveSidebarKey(pathname: string) {
  const activeItem = sidebarItems
    .filter(
      item => pathname === item.href || pathname.startsWith(`${item.href}/`)
    )
    .sort((a, b) => b.href.length - a.href.length)[0]

  return activeItem?.key ?? ''
}

export { useProps }
export type {
  ActionItem,
  AcademicMenuItem,
  AcademicTab,
  HeaderActionsConfig,
  Props,
  SidebarProps,
  SidebarViewItem
}
