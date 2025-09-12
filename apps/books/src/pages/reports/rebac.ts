import { Role, RolesWithPermissions } from './utils'

export type Overview = {
  id: string
}

export type ChartOfAccounts = {
  id: string
}

export type Profit_Loss = {
  id: string
}

export type BalanceSheet = {
  id: string
}

export type CashFlow = {
  id: string
}

export type Permissions = {
  overview: {
    dataType: Overview
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
  chartofaccounts: {
    dataType: ChartOfAccounts
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
  profit_loss: {
    dataType: Profit_Loss
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
  balance_sheet: {
    dataType: BalanceSheet
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
  cashflow: {
    dataType: CashFlow
    action: 'view' | 'create' | 'update' | 'delete' | 'get' | 'invite'
  }
}

export const ROLE_TAB_VISIBILITY: Record<Role, (keyof Permissions)[]> = {
  owner: [
    'overview',
    'chartofaccounts',
    'profit_loss',
    'balance_sheet',
    'cashflow'
  ],
  accountant: [
    'overview',
    'chartofaccounts',
    'profit_loss',
    'balance_sheet',
    'cashflow'
  ],
  admin: [
    'overview',
    'chartofaccounts',
    'profit_loss',
    'balance_sheet',
    'cashflow'
  ],
  member: [
    'overview',
    'chartofaccounts',
    'profit_loss',
    'balance_sheet',
    'cashflow'
  ],
  viewer: [
    'overview',
    'chartofaccounts',
    'profit_loss',
    'balance_sheet',
    'cashflow'
  ]
}

export const ROLES = {
  owner: {
    overview: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    chartofaccounts: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    profit_loss: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    balance_sheet: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    cashflow: {
      view: true,
      create: true,
      update: true,
      delete: true,
      invite: true
    }
  },
  accountant: {
    overview: {
      view: true,
      create: false,
      update: true,
      delete: false,
      get: false,
      invite: false
    },
    chartofaccounts: {
      view: true,
      create: true,
      update: true,
      delete: false,
      get: true,
      invite: true
    },
    profit_loss: {
      view: true,
      create: false,
      update: true,
      delete: false,
      get: false,
      invite: false
    },
    balance_sheet: {
      view: true,
      create: false,
      update: true,
      delete: false,
      get: false,
      invite: false
    },
    cashflow: {
      view: true,
      create: false,
      update: true,
      delete: false,
      get: false,
      invite: false
    }
  },
  admin: {
    overview: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    chartofaccounts: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    profit_loss: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    balance_sheet: {
      view: true,
      create: true,
      update: true,
      delete: true,
      get: true,
      invite: true
    },
    cashflow: {
      view: true,
      create: true,
      update: true,
      delete: true,
      invite: true
    }
  },
  member: {
    overview: {
      view: true,
      create: false,
      update: true,
      delete: false,
      get: false,
      invite: false
    },
    chartofaccounts: {
      view: true,
      create: false,
      update: true,
      delete: false,
      get: false,
      invite: false
    },
    profit_loss: {
      view: true,
      create: false,
      update: true,
      delete: false,
      get: false,
      invite: false
    },
    balance_sheet: {
      view: true,
      create: false,
      update: true,
      delete: false,
      get: false,
      invite: false
    },
    cashflow: {
      view: true,
      create: false,
      get: false,
      update: true,
      delete: false,
      invite: false
    }
  },
  viewer: {
    overview: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    },
    chartofaccounts: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    },
    profit_loss: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    },
    balance_sheet: {
      view: true,
      create: false,
      update: false,
      delete: false,
      get: false,
      invite: false
    },
    cashflow: {
      view: true,
      create: false,
      update: false,
      delete: false,
      invite: false,
      get: false
    }
  }
} as const satisfies RolesWithPermissions
