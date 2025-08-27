// import { ROLE_TAB_PERMISSIONS } from "./permissions"

// export type Role = 'owner' | 'accountant' | 'admin' | 'member' | 'viewer'

// export type User = {
//   id: string
//   roles: Role[]
//   blockedBy: string[]
// }

// export type Resource = {
//   id:string
// }

// type PermissionCheck<Data> = boolean | ((user: User, data: Data) => boolean)

// type PermissionSet<Action extends string, Data> = {
//   [K in Action]?: PermissionCheck<Data>

// }

// export type TabPermissions = {
//   company: PermissionSet<'view' | 'get' | 'create' | 'update' | 'delete', Resource>
//   account: PermissionSet<'view' | 'get' | 'create' | 'update' | 'delete', Resource>
//   team: PermissionSet<'view' | 'get' | 'create' | 'update' | 'delete', Resource>
//   notifications: PermissionSet<
//     'view' | 'get' | 'create' | 'update' | 'delete',
//     Resource
//   >
//   integration: PermissionSet<
//     'view' | 'get' | 'create' | 'update' | 'delete',
//     Resource
//   >
// }

// export function hasPermission<
//   Tab extends keyof TabPermissions,
//   Action extends keyof TabPermissions[Tab]
// >(
//   user: User,
//   tab: Tab,
//   action: Action,
//   data?: TabPermissions[Tab][Action] extends (u: User, d: infer D) => boolean
//     ? D
//     : never
// ) {
//   return user.roles.some(role => {
//     const permission = ROLE_TAB_PERMISSIONS[role][tab]?.[action]
//     if (!permission) return false

//     if (typeof permission === 'boolean') return permission
//     return data != null && permission(user, data)
//   })
// }
