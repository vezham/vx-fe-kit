import { defineLogger } from '@vezham/use-logger'

import { APP_NAME, __DEBUG__, __DEV__ } from '../../env/src'

defineLogger({ APP_NAME, __DEBUG__, __DEV__ })
