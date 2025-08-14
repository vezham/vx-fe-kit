import {
  otherActions,
  searchAction,
  viewActions
} from '../../components/actionbar/data'
import { ActionToolbar } from '../../components/actionbar/index'
const MyPage = () => {
  return (
    <div className="relative">
      <ActionToolbar
        showSearch={true}
        searchAction={searchAction}
        showViewActions={true}
        viewActions={viewActions}
        showOtherActions={true}
        otherActions={otherActions}
      />
    </div>
  )
}

export default MyPage
