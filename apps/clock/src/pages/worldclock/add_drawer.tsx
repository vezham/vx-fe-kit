import { useEffect, useState } from 'react'

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input
} from '@vezham/react/v2'

import { DrawerProps } from './types'

export const AddDrawer = ({
  isOpen,
  onOpenChange,
  initialData,
  onSave
}: DrawerProps) => {
  const [city, setCity] = useState('')
  const [timezone, setTimezone] = useState('')

  useEffect(() => {
    if (!isOpen) return

    setCity(initialData ? initialData.city : '')
    setTimezone(initialData ? initialData.timezone : '')
  }, [isOpen, initialData])

  const canSave = city.trim() && timezone.trim()

  return (
    <Drawer
      placement="right"
      size="xs"
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <DrawerContent>
        {onClose => (
          <>
            <DrawerHeader>
              {initialData ? 'Edit World Clock' : 'Add World Clock'}
            </DrawerHeader>

            <DrawerBody className="space-y-4">
              <Input
                label="City"
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
              />

              <Input
                label="Time"
                placeholder="10:30 AM"
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
              />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>

              <Button
                color="primary"
                isDisabled={!canSave}
                onPress={() => {
                  onSave({ city, timezone })
                  onClose()
                }}>
                Save
              </Button>
            </DrawerFooter>
          </>
        )}
      </DrawerContent>
    </Drawer>
  )
}
