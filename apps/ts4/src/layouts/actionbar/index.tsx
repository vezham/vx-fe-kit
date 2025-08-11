import {
  otherActions,
  searchAction,
  viewActions
} from '../../components/actionbar/data'
import { ActionToolbar } from '../../components/actionbar/index'
const MyPage = () => {
  return (
    <div className="relative h-screen">
      <div className="absolute top-4 right-4">
        <ActionToolbar
          showSearch={true}
          searchAction={searchAction}
          showViewActions={true}
          viewActions={viewActions}
          showOtherActions={true}
          otherActions={otherActions}
        />
      </div>
    </div>
  )
}

export default MyPage
