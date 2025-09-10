/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Button, Input, Select, SelectItem } from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import Header from '../../../../components/header'
import End from '../../actionbar/endContent'
import Start from '../../actionbar/headContent'
import { initialFolders } from './data'
import { FolderItem } from './types'
import { folderVariants, getFolderVariantProps } from './variant'

const Charts: React.FC = () => {
  const [folders, setFolders] = React.useState<FolderItem[]>(initialFolders)
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [selectedType, setSelectedType] = React.useState<string>('All')
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set(getAllIds(initialFolders))
  )

  const accountTypes = [
    'All',
    'Asset',
    'Liability',
    'Equity',
    'Revenue',
    'Expense'
  ]

  function getAllIds(items: FolderItem[]): string[] {
    let ids: string[] = []
    items.forEach(item => {
      ids.push(item.id)
      if (item.children) ids = ids.concat(getAllIds(item.children))
    })
    return ids
  }

  const handleDelete = (id: string) => {
    const deleteItem = (items: FolderItem[]): FolderItem[] => {
      return items
        .map(item => {
          if (item.id === id) return null
          if (item.children) {
            return { ...item, children: deleteItem(item.children) }
          }
          return item
        })
        .filter(Boolean) as FolderItem[]
    }
    setFolders(deleteItem(folders))
  }

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) {
        newSet.delete(id)
      } else {
        newSet.add(id)
      }
      return newSet
    })
  }

  const isExpanded = (id: string) => expandedItems.has(id)

  const filteredFolders = React.useMemo(() => {
    if (!searchQuery.trim() && selectedType === 'All') return folders

    const searchLower = searchQuery.toLowerCase()

    const filterItems = (items: FolderItem[]): FolderItem[] => {
      return items
        .map(item => {
          const codeMatchExact = item.code.toLowerCase() === searchLower
          const nameMatchExact = item.name.toLowerCase() === searchLower
          const typeMatchExact = item.type.toLowerCase() === searchLower

          const codeMatchPartial = item.code.toLowerCase().includes(searchLower)
          const nameMatchPartial = item.name.toLowerCase().includes(searchLower)
          const typeMatchPartial = item.type.toLowerCase().includes(searchLower)

          const matchesSearch =
            !searchQuery.trim() ||
            codeMatchExact ||
            nameMatchExact ||
            typeMatchExact ||
            codeMatchPartial ||
            nameMatchPartial ||
            typeMatchPartial

          const matchesType =
            selectedType === 'All' || item.type === selectedType

          let filteredChildren: FolderItem[] = []
          if (item.children && item.children.length > 0) {
            filteredChildren = filterItems(item.children)
          }

          const shouldInclude =
            (matchesSearch && matchesType) || filteredChildren.length > 0

          if (shouldInclude) {
            return {
              ...item,
              children:
                filteredChildren.length > 0 ? filteredChildren : item.children
            }
          }

          return null
        })
        .filter(Boolean) as FolderItem[]
    }

    return filterItems(folders)
  }, [folders, searchQuery, selectedType])

  const handleTypeChange = (value: string) => {
    setSelectedType(value)
  }

  const renderFolderItem = (item: FolderItem, level = 0, isChild = false) => {
    const hasChildren = item.children && item.children.length > 0
    const isItemExpanded = isExpanded(item.id)

    const folderProps = getFolderVariantProps(isChild)

    const getBadgeColor = (type: string) => {
      switch (type.toLowerCase()) {
        case 'asset':
          return 'bg-blue-100 text-blue-800'
        case 'liability':
          return 'bg-red-100 text-red-800'
        case 'equity':
          return 'bg-purple-100 text-purple-800'
        case 'revenue':
          return 'bg-green-100 text-green-800'
        case 'expense':
          return 'bg-orange-100 text-orange-800'
        default:
          return 'bg-gray-100 text-gray-800'
      }
    }

    const formatCurrency = (amount: number) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)
    }

    const getBalanceColor = (type: string, balance: number) => {
      if (type.toLowerCase() === 'expense') {
        return 'text-red-600'
      } else if (
        type.toLowerCase() === 'revenue' ||
        type.toLowerCase() === 'income'
      ) {
        return 'text-green-600'
      }
      return ''
    }

    return (
      <React.Fragment key={item.id}>
        <div className={folderVariants(folderProps).base()}>
          <div className="flex items-center gap-2">
            {hasChildren ? (
              <button
                onClick={e => toggleExpand(item.id, e)}
                className="flex items-center focus:outline-none">
                <Icon
                  icon={isItemExpanded ? 'lucide:folder-open' : 'lucide:folder'}
                  className="text-default-500"
                />
              </button>
            ) : (
              <Icon icon="lucide:file" className="text-default-500 ml-4" />
            )}
            <span className="ml-1">
              {item.code} {item.name}
            </span>
          </div>
          <div>
            <span
              className={`rounded-md px-2 py-1 text-xs ${getBadgeColor(item.type)}`}>
              {item.type}
            </span>
          </div>
          <div className={getBalanceColor(item.type, item.balance)}>
            {formatCurrency(item.balance)}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              isIconOnly
              size="sm"
              variant="light"
              onPress={() => console.log('Edit', item.id)}>
              <Icon icon="lucide:edit" className="text-default-500" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              onPress={() => handleDelete(item.id)}>
              <Icon icon="lucide:trash-2" className="text-danger" />
            </Button>
          </div>
        </div>

        {hasChildren && isItemExpanded && (
          <div>
            {item.children!.map(child =>
              renderFolderItem(child, level + 1, true)
            )}
          </div>
        )}
      </React.Fragment>
    )
  }

  return (
    <div className="rounded-medium w-full overflow-hidden">
      <div className="pb-4">
        <Header
          startContent={<Start />}
          mainTitle={'Chart of Accounts'}
          mainDescription={'View comprehensive chart reports and analytics'}
          endContent={<End />}
        />
      </div>

      {/* Search and filter - fixed section */}
      <div className="flex flex-wrap items-center justify-end gap-4 pb-4">
        <div className="flex items-center gap-3">
          <div>
            <Input
              placeholder="Search"
              value={searchQuery}
              onValueChange={setSearchQuery}
              startContent={
                <Icon
                  icon="lucide:search"
                  className="text-default-400 text-lg"
                />
              }
              size="sm"
            />
          </div>
          <Select
            placeholder="Filter"
            selectedKeys={selectedType ? [selectedType] : []}
            onSelectionChange={keys => {
              const selected = Array.from(keys)[0] as string
              handleTypeChange(selected)
            }}
            size="sm">
            {accountTypes.map(type => (
              <SelectItem key={type}>{type}</SelectItem>
            ))}
          </Select>
        </div>
      </div>

      {/* Scrollable table section (heading + rows) */}
      <div className="border-divider overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="bg-default-100 grid grid-cols-4 gap-4 rounded-lg px-4 py-3 font-semibold">
            <div>Account</div>
            <div>Type</div>
            <div>Balance</div>
            <div className="text-right">Actions</div>
          </div>

          <div className="divide-divider divide-y">
            {filteredFolders.length > 0 ? (
              filteredFolders.map(item => renderFolderItem(item))
            ) : (
              <div className="text-default-500 py-8 text-center">
                No accounts found matching your criteria
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Charts
