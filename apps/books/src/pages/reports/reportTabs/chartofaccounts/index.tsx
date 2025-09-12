/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  Alert,
  Button,
  Input,
  Select,
  SelectItem,
  Spinner
} from '@heroui/react'
import { Icon } from '@iconify/react'
import React from 'react'
import Header from '../../../../components/header'
import { useChartofAccounts } from '../../../../store/reports/useChartAccounts'
import { getTypesProps } from '../../../../store/reports/useChartAccounts/data'
import End from '../../actionbar/endContent'
import Start from '../../actionbar/headContent'
import { usePermit } from '../../utils'
import { FolderItem } from './types'
import { folderVariants, getFolderVariantProps } from './variant'

const Charts: React.FC = () => {
  const [searchQuery, setSearchQuery] = React.useState<string>('')
  const [selectedType, setSelectedType] = React.useState<string>('All')
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set()
  )

  const { readOnly: canUpdate } = usePermit('chartofaccounts', 'update')
  const { readOnly: canDelete } = usePermit('chartofaccounts', 'delete')

  const {
    data: folders = [],
    isLoading,
    isError,
    refetch
  } = useChartofAccounts.list({
    type: selectedType
  })

  // Add the remove hook
  const { mutate: removeAccount } = useChartofAccounts.remove()

  // expand all IDs when data loads
  React.useEffect(() => {
    if (folders.length > 0) {
      const getAllIds = (items: FolderItem[]): string[] => {
        let ids: string[] = []
        items.forEach(item => {
          ids.push(item.id)
          if (item.children) ids = ids.concat(getAllIds(item.children))
        })
        return ids
      }
      setExpandedItems(new Set(getAllIds(folders)))
    }
  }, [folders])

  const toggleExpand = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(id)) newSet.delete(id)
      else newSet.add(id)
      return newSet
    })
  }

  const isExpanded = (id: string) => expandedItems.has(id)

  const accountTypes = [
    'All',
    'Asset',
    'Liability',
    'Equity',
    'Revenue',
    'Expense'
  ]

  const handleTypeChange = (value: string) => setSelectedType(value)

  // Filtering + search applied here
  const filteredFolders = React.useMemo(() => {
    if (!searchQuery.trim() && selectedType === 'All') return folders

    const searchLower = searchQuery.toLowerCase()

    const filterItems = (items: FolderItem[]): FolderItem[] => {
      return items
        .map(item => {
          const typeLower = item.type.toLowerCase()
          const matchesType =
            selectedType === 'All' || typeLower === selectedType.toLowerCase()

          const matchesSearch =
            !searchQuery.trim() ||
            item.code.toLowerCase().includes(searchLower) ||
            item.name.toLowerCase().includes(searchLower) ||
            typeLower.includes(searchLower)

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

  // New function to handle deletion
  const handleDelete = (id: string) => {
    removeAccount(id)
  }

  // render logic
  const renderFolderItem = (item: FolderItem, level = 0, isChild = false) => {
    const hasChildren = item.children && item.children.length > 0
    const isItemExpanded = isExpanded(item.id)

    const folderProps = getFolderVariantProps(isChild)

    const typeProps =
      getTypesProps[item.type.toLowerCase() as keyof typeof getTypesProps]

    const formatCurrency = (amount: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount)

    const getBalanceColor = (type: string, balance: number) => {
      if (type.toLowerCase() === 'expense') return 'text-red-600'
      if (['revenue', 'income'].includes(type.toLowerCase()))
        return 'text-green-600'
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
              className={`rounded-md px-2 py-1 text-xs ${typeProps?.color ?? ''}`}>
              {typeProps?.label ?? item.type}
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
              isDisabled={canUpdate}
              onPress={() => console.log('Edit', item.id)}>
              <Icon icon="lucide:edit" className="text-default-500" />
            </Button>
            <Button
              isIconOnly
              size="sm"
              variant="light"
              color="danger"
              isDisabled={canDelete}
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

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center justify-end gap-4 pb-4">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Search"
            value={searchQuery}
            onValueChange={setSearchQuery}
            startContent={
              <Icon icon="lucide:search" className="text-default-400 text-lg" />
            }
            size="sm"
          />
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

      {/* Table */}
      <div className="border-divider overflow-x-auto">
        <div className="min-w-[600px]">
          <div className="bg-default-100 grid grid-cols-4 gap-4 rounded-lg px-4 py-3 font-semibold">
            <div>Account</div>
            <div>Type</div>
            <div>Balance</div>
            <div className="text-right">Actions</div>
          </div>

          <div className="divide-divider divide-y">
            {isLoading ? (
              <div className="flex h-100 items-center justify-center">
                <Spinner
                  size="lg"
                  classNames={{ label: 'text-foreground' }}
                  label="Loading"
                  variant="gradient"
                />
              </div>
            ) : isError ? (
              <div className="py-8 text-center text-red-500">
                <Alert
                  variant="faded"
                  color="default"
                  title="Error loading Accounts"
                  hideIcon
                  className="mt-6 flex flex-col items-center justify-center">
                  <Button
                    color="danger"
                    size="sm"
                    variant="light"
                    className="mx-auto mt-2"
                    onPress={() => {
                      refetch()
                    }}>
                    Try Again
                  </Button>
                </Alert>
              </div>
            ) : filteredFolders.length > 0 ? (
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
