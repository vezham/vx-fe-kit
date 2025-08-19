import { Button } from '@heroui/react'
import { useTheme } from '../../common/context'
import Header from '../../components/header/index'
import AccountSetting from './settingTabs/account/account'
import CompanySetting from './settingTabs/company/company'
import IntegrationSetting from './settingTabs/integrations/index'
import NotificationSetting from './settingTabs/notification/index'
import TeamSetting from './settingTabs/team/index'

const Settings = () => {
  const { isDarkMode } = useTheme()

  const tabsData = [
    {
      key: 'company',
      title: 'Company',
      content: <CompanySetting isDarkmode={isDarkMode} />
    },

    {
      key: 'account',
      title: 'Account',
      content: <AccountSetting isDarkmode={isDarkMode} />
    },
    {
      key: 'team',
      title: 'Team',
      content: <TeamSetting isDarkMode={isDarkMode} />
    },
    {
      key: 'notifications',
      title: 'Notifications',
      content: <NotificationSetting isDarkMode={isDarkMode} />
    },
    {
      key: 'integrations',
      title: 'Integrations',
      content: <IntegrationSetting isDarkMode={isDarkMode} />
    }
  ]

  return (
    <div>
      <Header
        tabs={tabsData}
        mainTitle="Settings"
        mainDescription="Customize settings, email preferences, and web appearance."
        isDarkmode={isDarkMode}
        endContent={
          <Button size="sm" variant="solid" color="primary">
            Save
          </Button>
        }></Header>
    </div>
  )
}

export default Settings
