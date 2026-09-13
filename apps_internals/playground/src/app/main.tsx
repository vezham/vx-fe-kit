import { defineConfig } from '@vx/start/vite'

import { vxI18n } from '@generated/vx'

import { Shell } from './shell'

defineConfig({ lang: vxI18n.defaultLanguage, children: <Shell /> })
