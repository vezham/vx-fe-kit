import { defineLogger } from '@vezham/use-logger'
import { __DEBUG__, __DEV__, APP_NAME } from '../../env/src'

defineLogger({ APP_NAME, __DEBUG__, __DEV__ })
