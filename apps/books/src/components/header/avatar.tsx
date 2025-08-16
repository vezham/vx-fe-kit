import { Avatar, AvatarGroup, Button, Divider, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'
import React, { useState } from 'react'
import { useTheme } from '../../common/context'
import { AvatarData } from './types'
import { getAvatarSectionClasses } from './variant'

interface AvatarSectionProps {
  avatars: AvatarData[]
}

const AvatarSection: React.FC<AvatarSectionProps> = ({ avatars }) => {
  const { isDarkMode } = useTheme()

  const [avatarList, setAvatarList] = useState(avatars)
  const avatar = getAvatarSectionClasses(isDarkMode)

  const handleAddAvatar = () => {
    const newAvatar = {
      name: `User ${avatarList.length + 1}`,
      src: `https://i.pravatar.cc/150?u=new-user-${avatarList.length + 1}`
    }
    setAvatarList(prev => [...prev, newAvatar])
  }

  return (
    <div className={avatar.wrapper}>
      <AvatarGroup size="sm" total={avatarList.length}>
        {avatarList.map((av, i) => (
          <Tooltip key={i} content={av.name} placement="bottom">
            <Avatar className={avatar.avatar} src={av.src} />
          </Tooltip>
        ))}
      </AvatarGroup>

      <Divider className={avatar.divider} orientation="vertical" />

      <Tooltip content="Add new avatar" placement="bottom">
        <Button
          isIconOnly
          radius="full"
          size="sm"
          variant="faded"
          onPress={handleAddAvatar}>
          <Icon className={avatar.addButtonIcon} icon="lucide:plus" />
        </Button>
      </Tooltip>
    </div>
  )
}

export default AvatarSection
