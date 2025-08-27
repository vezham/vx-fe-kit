import { Role, RolesWithPermissions } from './utils'

export type Company = {
  id: string
}

export type Account = {
  id: string
}

export type Team = {
  id: string
}

export type Notification = {
  id: string
}

export type Integration = {
  id: string
}

export type Permissions = {
  company: {
    dataType: Company
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
  account: {
    dataType: Account
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
  team: {
    dataType: Team
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
  notifications: {
    dataType: Notification
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
  integrations: {
    dataType: Integration
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
}

export const ROLE_TAB_VISIBILITY: Record<Role, (keyof Permissions)[]> = {
  owner: ['company', 'account', 'team', 'notifications', 'integrations'],
  accountant: ['company', 'account', 'team', 'notifications', 'integrations'],
  admin: ['team', 'notifications', 'integrations'],
  member: ['notifications', 'integrations'],
  viewer: ['notifications', 'integrations']
}

export const ROLES = {
  owner: {
    company: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    account: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    team: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    notifications: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    integrations: {
      view: true,
      create: true,
      update: true,
      delete: true,
      invite: true
    }
  },
  accountant: {
    company: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    },
    account: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    team: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    },
    notifications: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    },
    integrations: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    }
  },
  admin: {
    team: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    notifications: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    },
    integrations: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    }
  },
  member: {
    notifications: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    integrations: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    }
  },
  viewer: {
    notifications: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    },
    integrations: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    }
  }
} as const satisfies RolesWithPermissions
