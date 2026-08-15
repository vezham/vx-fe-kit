import tailwindcss from '@tailwindcss/vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import react from '@vitejs/plugin-react-swc'
import { nitro } from 'nitro/vite'

import { defineAppConfig } from '@vx/config/vite'

export default defineAppConfig({
  root: __dirname,
  plugins: [
    nitro({ rollupConfig: { external: [/^@sentry\//] } }),
    tailwindcss(),
    tanstackStart(),
    react()
  ]
})
