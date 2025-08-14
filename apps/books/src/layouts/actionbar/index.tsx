import { useTheme } from '../../common/context'
import {
  otherActions,
  searchAction,
  viewActions
} from '../../components/actionbar/data'
import { ActionToolbar } from '../../components/actionbar/index'

const MyPage = () => {
  const { isDarkMode } = useTheme() // ✅ gets the same value as sidebar

  return (
    <div className="relative">
      <ActionToolbar
        showSearch={true}
        searchAction={searchAction}
        showViewActions={true}
        viewActions={viewActions}
        showOtherActions={true}
        otherActions={otherActions}
        isDarkMode={isDarkMode} // synced
      />
    </div>
  )
}

export default MyPage
