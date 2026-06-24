import type { CurrentUserResponse, RQCurrentUserUpdate } from './types'

export const CURRENT_USER: CurrentUserResponse = {
  id: 'current-user',
  avatar:
    'https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/avatars/blue-light.jpg',
  email: 'you@heroui.dev',
  name: 'You'
}

export function getCurrentUserSnapshot() {
  return { ...CURRENT_USER }
}

export function updateCurrentUserSnapshot(
  next: RQCurrentUserUpdate
): CurrentUserResponse {
  Object.assign(CURRENT_USER, next)

  return CURRENT_USER
}
