import { Permissions, ROLES } from './rebac'

export type Role = 'owner' | 'accountant' | 'admin' | 'member' | 'viewer'
export type User = { blockedBy: string[]; roles: Role[]; id: string }

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

export function hasPermission<Resource extends keyof Permissions>(
  user: User,
  resource: Resource,
  action: Permissions[Resource]['action'],
  data?: Permissions[Resource]['dataType']
) {
  return user.roles.some(role => {
    const permission = (ROLES as RolesWithPermissions)[role][resource]?.[action]
    if (permission == null) return false

    if (typeof permission === 'boolean') return permission
    return data != null && permission(user, data)
  })
}
