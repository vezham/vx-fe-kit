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

import { WorldClockItem } from '.'

type Props = {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  initialData: WorldClockItem | null
  onSave: (data: { city: string; timezone: string }) => void
}

export const WorldClockDrawer = ({
  isOpen,
  onOpenChange,
  initialData,
  onSave
}: Props) => {
  const [city, setCity] = useState('')
  const [timezone, setTimezone] = useState('')

  useEffect(() => {
    setCity(initialData?.city ?? '')
    setTimezone(initialData?.timezone ?? '')
  }, [initialData, isOpen])

  const isFormValid = city.trim() !== '' && timezone.trim() !== ''

  return (
    <Drawer
      placement="right"
      size="xs"
      isOpen={isOpen}
      onOpenChange={onOpenChange}>
      <DrawerContent>
        {onClose => (
          <>
            <DrawerHeader className="flex flex-col gap-1">
              {initialData ? 'Edit World Clock' : 'Add World Clock'}
            </DrawerHeader>

            <DrawerBody className="space-y-4">
              <Input
                label="City"
                placeholder="City"
                value={city}
                onChange={e => setCity(e.target.value)}
                required
              />

              <Input
                label="Time"
                placeholder="10:30 AM"
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                required
              />
            </DrawerBody>

            <DrawerFooter>
              <Button variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button
                color="primary"
                isDisabled={!isFormValid}
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
