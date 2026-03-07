// import {
//   Outlet,
//   createLazyFileRoute,
//   useNavigate,
//   useParams,
//   useRouterState
// } from '@tanstack/react-router'
// import { Surface } from '@vezham/react/v3'
// import AppContainerHeader from '../../../../layouts/app-container-header'
// export const Route = createLazyFileRoute('/bank/accounts/$accountsId')({
//   component: RouteComponent
// })
// function RouteComponent() {
//   const { accountsId } = useParams({
//     from: '/bank/accounts/$accountsId'
//   })
//   const navigate = useNavigate()
//   const { location } = useRouterState()
//   const tabs = [
//     {
//       key: 'overview',
//       title: 'Overview'
//     },
//     {
//       key: 'transactions',
//       title: 'Transactions'
//     },
//     {
//       key: 'reconcilation',
//       title: 'Reconcilation'
//     }
//   ]
//   const selected = location.pathname.split('/').pop() ?? 'overview'
//   const handleTabChange = (key: string) => {
//     navigate({
//       to: `/bank/accounts/$accountsId/${key}`,
//       params: { accountsId }
//     })
//   }
//   return (
//     <div className="flex w-full flex-col">
//       <Surface className="bg-content2 p-5">
//         <AppContainerHeader
//           tabs={tabs}
//           selectedKey={selected}
//           onTabChange={handleTabChange}
//         />
//       </Surface>
//       <Surface className="flex-1 overflow-auto">
//         <Outlet />
//       </Surface>
//     </div>
//   )
// }
import {
  Outlet,
  createLazyFileRoute,
  useNavigate
} from '@tanstack/react-router'

import { Surface } from '@vezham/react/v3'

export const Route = createLazyFileRoute('/bank/accounts/$accountsId')({
  component: RouteComponent
})

function RouteComponent() {
  return (
    <>
      <Surface className="flex h-full flex-col overflow-auto">
        <Outlet />
      </Surface>
    </>
  )
}
