import { Permissions, ROLES } from './rebac'

export type Role = 'owner' | 'accountant' | 'admin' | 'member' | 'viewer'
export type User = { blockedBy: string[]; roles: Role[]; id: string }

// 👇 Centralized user object
export const currentUser: User = {
  id: '1',
  roles: ['owner'],
  blockedBy: []
}

type PermissionCheck<Key extends keyof Permissions> =
  | boolean
  | ((user: User, data: Permissions[Key]['dataType']) => boolean)

export type RolesWithPermissions = {
  [R in Role]: Partial<{
    [Key in keyof Permissions]: Partial<{
      [Action in Permissions[Key]['action']]: PermissionCheck<Key>
    }>
  }>
}

export function checkPermit<Resource extends keyof Permissions>(
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType']
) {
  return currentUser.roles.some(role => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action]
    if (permission == null) return false

    if (typeof permission === 'boolean') return permission
    return data != null && permission(currentUser, data)
  })
}
