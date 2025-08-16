import { useTheme } from '../common/context'
import ControlSection from '../components/header/action'
import AvatarSection from '../components/header/avatar'
import Header from '../components/header/index'
import AccountSetting from '../pages/settings/account'
import AppearanceSetting from '../pages/settings/appearance'
import BillingSetting from '../pages/settings/billing'
import ProfileSetting from '../pages/settings/profile'
import TeamSetting from '../pages/settings/team'
const Settings = () => {
  const { isDarkMode } = useTheme()

  const tabsData = [
    { key: 'profile', title: 'Profile', content: <ProfileSetting /> },
    { key: 'appearance', title: 'Appearance', content: <AppearanceSetting /> },
    { key: 'account', title: 'Account', content: <AccountSetting /> },
    { key: 'billing', title: 'Billing', content: <BillingSetting /> },
    { key: 'team', title: 'Team', content: <TeamSetting /> }
  ]
  const initialAvatars = [
    { name: 'John', src: 'https://i.pravatar.cc/150?u=a042581f4e29026024d' },
    { name: 'Mark', src: 'https://i.pravatar.cc/150?u=a04258a2462d826712d' },
    { name: 'Jane', src: 'https://i.pravatar.cc/150?u=a042581f4e29026704d' }
  ]

  return (
    <div>
      <Header
        tabs={tabsData}
        mainTitle="Settings"
        mainDescription="Customize settings, email preferences, and web appearance."
        isDarkmode={isDarkMode}>
        {<AvatarSection avatars={initialAvatars} />}
        {<ControlSection />}
      </Header>
    </div>
  )
}

export default Settings
