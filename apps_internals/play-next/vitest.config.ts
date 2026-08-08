/// <reference types='vitest' />
import react from '@vitejs/plugin-react-swc'

import { defineVitestConfig } from '@vx/config/vite'

export default defineVitestConfig({
  root: __dirname,
  plugins: [react()]
})
